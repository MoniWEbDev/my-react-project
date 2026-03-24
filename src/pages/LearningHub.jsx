import { useMemo, useState } from 'react'
import { ArrowLeft, Award, Globe2, Lock, Mic, Search, Share2, Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AssignmentCard from '../components/AssignmentCard'
import AdaptiveTestPanel from '../components/AdaptiveTestPanel'
import CourseVideoCard from '../components/CourseVideoCard'
import ExploreSkillCard from '../components/ExploreSkillCard'
import LearningMaterialsPanel from '../components/LearningMaterialsPanel'
import { difficultyFilters, leaderboardMock, skillCategories, skills101 } from '../data/skillsCatalog'
import { useApp } from '../hooks/useApp'
import { useLocalStorage } from '../hooks/useLocalStorage'

const emptyProgress = {
  completedVideos: [],
  testResult: null,
  assignmentCompleted: false,
  assignmentFile: null,
  points: 0,
  badges: [],
}

const getSkillRecord = (progressMap, skillId) => progressMap[skillId] ?? emptyProgress

const getLocalizedValue = (value, language) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] ?? value.en ?? Object.values(value)[0]
  }

  return value
}

const LearningHub = () => {
  const { t } = useTranslation()
  const { currentUser, language } = useApp()
  const [selectedSkillId, setSelectedSkillId] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [progressMap, setProgressMap] = useLocalStorage('learning_101_progress', {})

  const selectedSkill = useMemo(() => skills101.find((skill) => skill.id === selectedSkillId), [selectedSkillId])

  const filteredSkills = useMemo(() => {
    return skills101.filter((skill) => {
      const localizedName = getLocalizedValue(skill.name, language)?.toLowerCase() ?? ''
      const localizedDescription = getLocalizedValue(skill.description, language)?.toLowerCase() ?? ''
      const normalizedSearch = searchText.toLowerCase()

      const textMatch =
        localizedName.includes(normalizedSearch) || localizedDescription.includes(normalizedSearch)
      const categoryMatch = categoryFilter === 'All' || skill.category === categoryFilter
      const difficultyMatch = difficultyFilter === 'All' || skill.difficulty === difficultyFilter

      return textMatch && categoryMatch && difficultyMatch
    })
  }, [searchText, categoryFilter, difficultyFilter, language])

  const totals = useMemo(() => {
    return skills101.reduce(
      (acc, skill) => {
        const record = getSkillRecord(progressMap, skill.id)
        const totalUnits = skill.videos.length + 2
        const completedUnits =
          record.completedVideos.length +
          (record.testResult ? 1 : 0) +
          (record.assignmentCompleted ? 1 : 0)

        acc.progress += (completedUnits / totalUnits) * 100
        acc.points += record.points
        if (record.assignmentCompleted && record.testResult) acc.certificates += 1
        if (completedUnits === totalUnits) acc.completedSkills += 1
        return acc
      },
      { progress: 0, points: 0, certificates: 0, completedSkills: 0 },
    )
  }, [progressMap])

  const overallProgress = Math.round(totals.progress / skills101.length)

  const continueLearningSkill = useMemo(() => {
    return skills101.find((skill) => {
      const record = getSkillRecord(progressMap, skill.id)
      const totalUnits = skill.videos.length + 2
      const completedUnits =
        record.completedVideos.length +
        (record.testResult ? 1 : 0) +
        (record.assignmentCompleted ? 1 : 0)
      return completedUnits < totalUnits
    })
  }, [progressMap])

  const startVoiceSearch = () => {
    const speechApi = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!speechApi) return

    const recognition = new speechApi()
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN'
    recognition.onresult = (event) => {
      const spoken = event.results?.[0]?.[0]?.transcript
      if (spoken) setSearchText(spoken)
    }
    recognition.start()
  }

  const markVideoComplete = (skillId, videoId) => {
    setProgressMap((prev) => {
      const record = getSkillRecord(prev, skillId)
      if (record.completedVideos.includes(videoId)) return prev

      return {
        ...prev,
        [skillId]: {
          ...record,
          completedVideos: [...record.completedVideos, videoId],
          points: record.points + 20,
        },
      }
    })
  }

  const saveTestResult = (skillId, score, total) => {
    setProgressMap((prev) => {
      const record = getSkillRecord(prev, skillId)
      const passed = score >= Math.ceil(total * 0.6)
      const nextBadges =
        passed && !record.badges.includes('Assessment Passed')
          ? [...record.badges, 'Assessment Passed']
          : record.badges

      return {
        ...prev,
        [skillId]: {
          ...record,
          testResult: { score, total, passed },
          points: record.points + (passed ? 100 : 40),
          badges: nextBadges,
        },
      }
    })
  }

  const uploadAssignmentFile = (skillId, file) => {
    setProgressMap((prev) => {
      const record = getSkillRecord(prev, skillId)
      return {
        ...prev,
        [skillId]: {
          ...record,
          assignmentFile: { name: file.name, type: file.type },
        },
      }
    })
  }

  const completeAssignment = (skillId) => {
    setProgressMap((prev) => {
      const record = getSkillRecord(prev, skillId)
      if (record.assignmentCompleted) return prev

      const nextBadges = [...record.badges]
      if (!nextBadges.includes('Practical Expert')) nextBadges.push('Practical Expert')
      if (record.testResult?.passed && !nextBadges.includes('Skill Certified')) {
        nextBadges.push('Skill Certified')
      }

      return {
        ...prev,
        [skillId]: {
          ...record,
          assignmentCompleted: true,
          points: record.points + 150,
          badges: nextBadges,
        },
      }
    })
  }

  const shareOnWhatsApp = (skill) => {
    const record = getSkillRecord(progressMap, skill.id)
    const text = encodeURIComponent(
      `I am learning ${getLocalizedValue(skill.name, language)} on 101 Skills Hub. Progress: ${record.completedVideos.length}/${skill.videos.length} videos completed.`,
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  if (!selectedSkill) {
    return (
      <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <header className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('learning.title')}</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('learning.subtitle')}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">
                {t('learning.overallProgress')}: <span className="font-semibold">{overallProgress}%</span>
              </div>
              <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">
                {t('learning.skillsCompleted')}: <span className="font-semibold">{totals.completedSkills}</span>
              </div>
              <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">
                {t('learning.certificates')}: <span className="font-semibold">{totals.certificates}</span>
              </div>
              <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">
                {t('learning.points')}: <span className="font-semibold">{totals.points}</span>
              </div>
            </div>
            {continueLearningSkill && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                {t('learning.continueLearning')}: {getLocalizedValue(continueLearningSkill.name, language)}
              </div>
            )}
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('learning.exploreSkills')}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
              <div className="relative">
                <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder={t('learning.searchPlaceholder')}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs outline-none dark:border-slate-700 dark:bg-slate-950"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-950"
              >
                {skillCategories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'All' ? t('learning.all') : t(`categories.${category}`, category)}
                  </option>
                ))}
              </select>

              <select
                value={difficultyFilter}
                onChange={(event) => setDifficultyFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-950"
              >
                {difficultyFilters.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff === 'All' ? t('learning.all') : t(`difficulty.${diff}`, diff)}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={startVoiceSearch}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                <Mic size={13} />
                {t('common.voiceSearch')}
              </button>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredSkills.map((skill) => (
              <ExploreSkillCard
                key={skill.id}
                skill={skill}
                progress={getSkillRecord(progressMap, skill.id)}
                language={language}
                onOpen={() => setSelectedSkillId(skill.id)}
              />
            ))}
          </div>

          <section className="grid gap-4 xl:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Trophy size={14} />
                {t('learning.leaderboard')}
              </h3>
              <div className="mt-3 space-y-2 text-xs">
                {[{ name: currentUser.name, points: totals.points }, ...leaderboardMock]
                  .sort((a, b) => b.points - a.points)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800"
                    >
                      <span>{index + 1}. {item.name}</span>
                      <span className="font-semibold">{item.points} pts</span>
                    </div>
                  ))}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70">
              <h3 className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Globe2 size={14} />
                {t('learning.accessibility')}
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li>• {t('learning.off1')}</li>
                <li>• {t('learning.off2')}</li>
                <li>• {t('learning.off3')}</li>
                <li>• {t('learning.off4')}</li>
              </ul>
            </article>
          </section>
        </div>
      </section>
    )
  }

  const record = getSkillRecord(progressMap, selectedSkill.id)
  const videosCompleted = record.completedVideos.length
  const allVideosDone = videosCompleted === selectedSkill.videos.length
  const assessmentUnlocked = allVideosDone
  const assignmentUnlocked = Boolean(record.testResult)
  const progressPercent = Math.round(
    ((videosCompleted + (record.testResult ? 1 : 0) + (record.assignmentCompleted ? 1 : 0)) /
      (selectedSkill.videos.length + 2)) *
      100,
  )

  return (
    <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setSelectedSkillId(null)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
          >
            <ArrowLeft size={14} />
            {t('common.backToExplore')}
          </button>

          <button
            type="button"
            onClick={() => shareOnWhatsApp(selectedSkill)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
          >
            <Share2 size={14} />
            {t('common.shareWhatsApp')}
          </button>
        </div>

        <header className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{getLocalizedValue(selectedSkill.name, language)}</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {t(`categories.${selectedSkill.category}`, selectedSkill.category)} • {t(`difficulty.${selectedSkill.difficulty}`, selectedSkill.difficulty)}
          </p>
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{videosCompleted}/{selectedSkill.videos.length} {t('learning.videosCompleted')}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full bg-linear-to-r from-emerald-400 to-teal-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {record.badges.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {record.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                >
                  <Award size={12} />
                  {badge}
                </span>
              ))}
            </div>
          )}
        </header>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('learning.videosHeading')}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {selectedSkill.videos.map((video, index) => {
              const isCompleted = record.completedVideos.includes(video.id)
              const previousVideo = index > 0 ? selectedSkill.videos[index - 1] : null
              const isLocked = Boolean(previousVideo) && !record.completedVideos.includes(previousVideo.id)

              return (
                <CourseVideoCard
                  key={video.id}
                  video={video}
                  language={language}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                  onComplete={() => markVideoComplete(selectedSkill.id, video.id)}
                />
              )
            })}
          </div>
        </section>

        <LearningMaterialsPanel materials={selectedSkill.materials} language={language} />

        {assessmentUnlocked ? (
          <AdaptiveTestPanel
            skill={selectedSkill}
            language={language}
            unlocked={assessmentUnlocked}
            result={record.testResult}
            onFinish={(score, total) => saveTestResult(selectedSkill.id, score, total)}
          />
        ) : (
          <article className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-4 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Lock size={12} />
              {t('learning.assessmentHidden')}
            </span>
          </article>
        )}

        <AssignmentCard
          assignment={selectedSkill.assignment}
          language={language}
          assignmentUnlocked={assignmentUnlocked}
          assignmentFile={record.assignmentFile}
          completed={record.assignmentCompleted}
          onAssignmentUpload={(event) => {
            const file = event.target.files?.[0]
            if (file) uploadAssignmentFile(selectedSkill.id, file)
          }}
          onAssignmentComplete={() => completeAssignment(selectedSkill.id)}
        />
      </div>
    </section>
  )
}

export default LearningHub
