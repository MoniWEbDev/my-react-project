import { useMemo, useState } from 'react'
import { Mic, MoveVertical, PlayCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SmartImage from './SmartImage'

const diffOrder = { easy: 0, medium: 1, hard: 2 }
const diffByScore = ['easy', 'medium', 'hard']

const reorder = (list, fromIndex, toIndex) => {
  const next = [...list]
  const [item] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, item)
  return next
}

const getLocalizedValue = (value, language) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] ?? value.en ?? Object.values(value)[0]
  }

  return value
}

const AdaptiveTestPanel = ({ skill, unlocked, result, onFinish, language }) => {
  const { t } = useTranslation()
  const [started, setStarted] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [currentDifficulty, setCurrentDifficulty] = useState('medium')
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [scenarioText, setScenarioText] = useState('')
  const [dragItems, setDragItems] = useState(getLocalizedValue(skill.test.dragDrop.items, language))
  const [dragFrom, setDragFrom] = useState(null)
  const [feedback, setFeedback] = useState('')

  const questionSet = useMemo(() => {
    return [...skill.test.adaptiveQuestions].sort(
      (a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty],
    )
  }, [skill])

  const currentQuestion = questionSet[questionIndex]
  const isLastQuestion = questionIndex === questionSet.length - 1

  const launchVoiceInput = () => {
    const speechApi = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!speechApi) return

    const recognition = new speechApi()
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN'
    recognition.onresult = (event) => {
      const spoken = event.results?.[0]?.[0]?.transcript
      if (spoken) setScenarioText(spoken)
    }
    recognition.start()
  }

  const gradeCurrentQuestion = () => {
    if (!currentQuestion) return false

    if (currentQuestion.type === 'scenario') {
      const lower = scenarioText.toLowerCase()
      return currentQuestion.keywords.some((keyword) => lower.includes(keyword.toLowerCase()))
    }

    return selectedOption === currentQuestion.answerByLanguage?.[language]
  }

  const gradeDragDrop = () => {
    return (
      JSON.stringify(dragItems) ===
      JSON.stringify(getLocalizedValue(skill.test.dragDrop.items, language))
    )
  }

  const nextQuestion = () => {
    const correct = gradeCurrentQuestion()
    setFeedback(correct ? t('learning.correct') : t('learning.incorrect'))
    if (correct) setScore((prev) => prev + 1)

    const nextDiffIndex = Math.max(
      0,
      Math.min(2, diffByScore.indexOf(currentDifficulty) + (correct ? 1 : -1)),
    )
    setCurrentDifficulty(diffByScore[nextDiffIndex])

    if (isLastQuestion) {
      const dragCorrect = gradeDragDrop()
      const finalScore = score + (correct ? 1 : 0) + (dragCorrect ? 1 : 0)
      const total = questionSet.length + 1
      onFinish(finalScore, total)
      return
    }

    setTimeout(() => {
      setQuestionIndex((prev) => prev + 1)
      setSelectedOption('')
      setScenarioText('')
      setFeedback('')
    }, 350)
  }

  const finalResult = result || null

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('learning.adaptiveTitle')}</h3>

      {!unlocked && (
        <p className="mt-3 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {t('learning.assessmentLocked')}
        </p>
      )}

      {unlocked && !started && !finalResult && (
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-3 inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500"
        >
          <PlayCircle size={14} />
          {t('common.startTest')}
        </button>
      )}

      {started && !finalResult && currentQuestion && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('learning.difficulty')}: {currentDifficulty}
          </p>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {getLocalizedValue(currentQuestion.prompt, language)}
          </p>

          {(currentQuestion.type === 'mcq' || currentQuestion.type === 'image') && (
            <div className="space-y-2">
              {currentQuestion.type === 'image' && (
                <SmartImage
                  src={currentQuestion.image}
                  alt={t('learning.fallbackAlt')}
                  className="h-36 w-full rounded-xl object-cover"
                />
              )}
              {(getLocalizedValue(currentQuestion.options, language) ?? []).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedOption(option)}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-xs ${
                    selectedOption === option
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'
                      : 'border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'scenario' && (
            <div className="space-y-2">
              <textarea
                value={scenarioText}
                onChange={(event) => setScenarioText(event.target.value)}
                placeholder={t('learning.scenarioPlaceholder')}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-950"
              />
              <button
                type="button"
                onClick={launchVoiceInput}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                <Mic size={13} />
                {t('learning.voiceAnswer')}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={nextQuestion}
            disabled={
              (currentQuestion.type !== 'scenario' && !selectedOption) ||
              (currentQuestion.type === 'scenario' && !scenarioText.trim())
            }
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900"
          >
            {isLastQuestion ? t('common.submitTest') : t('common.nextQuestion')}
          </button>

          {feedback && <p className="text-xs text-slate-500 dark:text-slate-400">{feedback}</p>}

          {isLastQuestion && (
            <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {getLocalizedValue(skill.test.dragDrop.prompt, language)}
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <MoveVertical size={12} />
                {t('learning.dragHint')}
              </p>
              <div className="mt-3 space-y-2">
                {dragItems.map((item, index) => (
                  <div
                    key={item}
                    draggable
                    onDragStart={() => setDragFrom(index)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (dragFrom === null || dragFrom === index) return
                      setDragItems((prev) => reorder(prev, dragFrom, index))
                      setDragFrom(null)
                    }}
                    className="cursor-move rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {finalResult && (
        <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
          {t('learning.assessmentDone', { score: finalResult.score, total: finalResult.total })}
        </div>
      )}
    </article>
  )
}

export default AdaptiveTestPanel
