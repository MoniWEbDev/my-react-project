import { useMemo, useState } from 'react'
import { learningActivities, learningQuizzes, learningVideos } from '../data/learningData'
import { skillCourses } from '../data/skillCourses'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { LearningContext } from './learning-context'

export const LearningProvider = ({ children }) => {
  const [bookmarkedVideoIds, setBookmarkedVideoIds] = useLocalStorage('learning_bookmarks', [])
  const [watchedVideoIds, setWatchedVideoIds] = useLocalStorage('learning_watched_videos', [])
  const [quizResults, setQuizResults] = useLocalStorage('learning_quiz_results', {})
  const [completedActivityIds, setCompletedActivityIds] = useLocalStorage('learning_completed_activities', [])
  const [skillCourseProgress, setSkillCourseProgress] = useLocalStorage('learning_skill_course_progress', {})
  const [continueCourseId, setContinueCourseId] = useLocalStorage(
    'learning_continue_course_id',
    skillCourses[0]?.id ?? null,
  )
  const [notifications, setNotifications] = useState([])

  const addNotification = (message) => {
    const notification = {
      id: crypto.randomUUID(),
      message,
      createdAt: Date.now(),
    }
    setNotifications((prev) => [notification, ...prev].slice(0, 4))
  }

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleBookmark = (videoId) => {
    setBookmarkedVideoIds((prev) =>
      prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId],
    )
  }

  const markVideoWatched = (videoId) => {
    setWatchedVideoIds((prev) => (prev.includes(videoId) ? prev : [...prev, videoId]))
  }

  const submitQuizResult = (quizId, score, total) => {
    setQuizResults((prev) => ({
      ...prev,
      [quizId]: { score, total, completedAt: new Date().toISOString() },
    }))
    addNotification(`Quiz completed: ${score}/${total} correct`)
  }

  const completeActivity = (activityId) => {
    if (completedActivityIds.includes(activityId)) return

    const activity = learningActivities.find((item) => item.id === activityId)
    setCompletedActivityIds((prev) => [...prev, activityId])
    if (activity) {
      addNotification(`Activity complete: +${activity.points} points`)
    }
  }

  const markCourseVideoCompleted = (courseId, videoId) => {
    setSkillCourseProgress((prev) => {
      const courseRecord = prev[courseId] ?? {
        completedVideoIds: [],
        quiz: null,
        assignment: { completed: false, imageUrl: '' },
      }

      if (courseRecord.completedVideoIds.includes(videoId)) return prev

      return {
        ...prev,
        [courseId]: {
          ...courseRecord,
          completedVideoIds: [...courseRecord.completedVideoIds, videoId],
        },
      }
    })

    setContinueCourseId(courseId)
  }

  const submitCourseQuiz = (courseId, score, total) => {
    setSkillCourseProgress((prev) => {
      const courseRecord = prev[courseId] ?? {
        completedVideoIds: [],
        quiz: null,
        assignment: { completed: false, imageUrl: '' },
      }

      return {
        ...prev,
        [courseId]: {
          ...courseRecord,
          quiz: {
            score,
            total,
            completedAt: new Date().toISOString(),
          },
        },
      }
    })

    addNotification(`Assessment complete: ${score}/${total}`)
    setContinueCourseId(courseId)
  }

  const completeCourseAssignment = (courseId, imageUrl) => {
    setSkillCourseProgress((prev) => {
      const courseRecord = prev[courseId] ?? {
        completedVideoIds: [],
        quiz: null,
        assignment: { completed: false, imageUrl: '' },
      }

      return {
        ...prev,
        [courseId]: {
          ...courseRecord,
          assignment: {
            completed: true,
            imageUrl: imageUrl || courseRecord.assignment?.imageUrl || '',
            completedAt: new Date().toISOString(),
          },
        },
      }
    })

    addNotification('Practical assignment completed. Certificate unlocked.')
    setContinueCourseId(courseId)
  }

  const setCourseAssignmentImage = (courseId, imageUrl) => {
    setSkillCourseProgress((prev) => {
      const courseRecord = prev[courseId] ?? {
        completedVideoIds: [],
        quiz: null,
        assignment: { completed: false, imageUrl: '' },
      }

      return {
        ...prev,
        [courseId]: {
          ...courseRecord,
          assignment: {
            completed: courseRecord.assignment?.completed ?? false,
            imageUrl,
            completedAt: courseRecord.assignment?.completedAt,
          },
        },
      }
    })
  }

  const learningProgress = useMemo(() => {
    const totalUnits = learningVideos.length + learningQuizzes.length + learningActivities.length
    const completedUnits =
      watchedVideoIds.length + Object.keys(quizResults).length + completedActivityIds.length

    return Math.round((completedUnits / totalUnits) * 100)
  }, [watchedVideoIds, quizResults, completedActivityIds])

  const activityFeed = useMemo(() => {
    const watchedFeed = watchedVideoIds.map((id, index) => {
      const video = learningVideos.find((item) => item.id === id)
      return {
        id: `watched-${id}`,
        label: `Watched video: ${video?.title ?? id}`,
        createdAt: index + 1,
      }
    })

    const quizFeed = Object.entries(quizResults).map(([id, result]) => ({
      id: `quiz-${id}`,
      label: `Completed quiz (${result.score}/${result.total})`,
      createdAt: new Date(result.completedAt).getTime(),
    }))

    const completedFeed = completedActivityIds.map((id, index) => {
      const activity = learningActivities.find((item) => item.id === id)
      return {
        id: `activity-${id}`,
        label: `Completed activity: ${activity?.title ?? id}`,
        createdAt: index + 1,
      }
    })

    return [...quizFeed, ...completedFeed, ...watchedFeed]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 8)
  }, [watchedVideoIds, quizResults, completedActivityIds])

  const earnedLearningPoints = useMemo(() => {
    const activityPoints = learningActivities
      .filter((activity) => completedActivityIds.includes(activity.id))
      .reduce((sum, item) => sum + item.points, 0)

    const quizPoints = Object.values(quizResults).reduce((sum, result) => sum + result.score * 10, 0)

    return activityPoints + quizPoints
  }, [completedActivityIds, quizResults])

  const courseCompletionMap = useMemo(() => {
    return skillCourses.reduce((acc, course) => {
      const record = skillCourseProgress[course.id] ?? {
        completedVideoIds: [],
        quiz: null,
        assignment: { completed: false, imageUrl: '' },
      }

      const totalUnits = course.videos.length + 2
      const completedUnits =
        record.completedVideoIds.length +
        (record.quiz ? 1 : 0) +
        (record.assignment?.completed ? 1 : 0)

      acc[course.id] = {
        ...record,
        progress: Math.round((completedUnits / totalUnits) * 100),
        isCompleted: completedUnits === totalUnits,
      }

      return acc
    }, {})
  }, [skillCourseProgress])

  const overallSkillProgress = useMemo(() => {
    if (!skillCourses.length) return 0
    const total = skillCourses.reduce((sum, course) => sum + (courseCompletionMap[course.id]?.progress ?? 0), 0)
    return Math.round(total / skillCourses.length)
  }, [courseCompletionMap])

  const completedSkillsCount = useMemo(
    () => skillCourses.filter((course) => courseCompletionMap[course.id]?.isCompleted).length,
    [courseCompletionMap],
  )

  const completedCourseVideosCount = useMemo(
    () =>
      Object.values(courseCompletionMap).reduce(
        (sum, courseRecord) => sum + (courseRecord.completedVideoIds?.length ?? 0),
        0,
      ),
    [courseCompletionMap],
  )

  const completedAssignmentsCount = useMemo(
    () =>
      Object.values(courseCompletionMap).reduce(
        (sum, courseRecord) => sum + (courseRecord.assignment?.completed ? 1 : 0),
        0,
      ),
    [courseCompletionMap],
  )

  const value = {
    bookmarkedVideoIds,
    watchedVideoIds,
    quizResults,
    completedActivityIds,
    notifications,
    learningProgress,
    overallSkillProgress,
    completedSkillsCount,
    completedCourseVideosCount,
    completedAssignmentsCount,
    earnedLearningPoints,
    activityFeed,
    skillCourseProgress,
    courseCompletionMap,
    continueCourseId,
    setContinueCourseId,
    toggleBookmark,
    markVideoWatched,
    submitQuizResult,
    completeActivity,
    markCourseVideoCompleted,
    submitCourseQuiz,
    setCourseAssignmentImage,
    completeCourseAssignment,
    dismissNotification,
  }

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
}
