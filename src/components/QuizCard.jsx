import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const QuizCard = ({ quiz, previousResult, onSubmit }) => {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [answers, setAnswers] = useState([])
  const [feedback, setFeedback] = useState('')
  const [finished, setFinished] = useState(false)

  const currentQuestion = quiz.questions[currentIndex]

  const progress = useMemo(
    () => Math.round(((currentIndex + 1) / quiz.questions.length) * 100),
    [currentIndex, quiz.questions.length],
  )

  const submitCurrentAnswer = () => {
    if (!selectedOption) return

    const isCorrect = selectedOption === currentQuestion.answer
    setFeedback(
      isCorrect
        ? t('quiz.correct')
        : t('quiz.incorrect', { answer: currentQuestion.answer }),
    )

    const nextAnswers = [...answers, { questionId: currentQuestion.id, isCorrect }]
    setAnswers(nextAnswers)

    const isLast = currentIndex === quiz.questions.length - 1

    if (isLast) {
      const score = nextAnswers.filter((entry) => entry.isCorrect).length
      onSubmit(quiz.id, score, quiz.questions.length)
      setFinished(true)
      return
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOption('')
      setFeedback('')
    }, 700)
  }

  const score = answers.filter((entry) => entry.isCorrect).length

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{quiz.title}</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {previousResult
              ? t('quiz.lastScore', { score: previousResult.score, total: previousResult.total })
              : t('quiz.questionCount', { count: quiz.questions.length })}
          </p>
        </div>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          {progress}%
        </span>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full bg-linear-to-r from-emerald-400 to-teal-500" style={{ width: `${progress}%` }} />
      </div>

      {!finished ? (
        <>
          <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-200">{currentQuestion.question}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedOption(option)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                  selectedOption === option
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">{feedback}</p>}

          <button
            type="button"
            onClick={submitCurrentAnswer}
            disabled={!selectedOption}
            className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {t('quiz.submit')}
          </button>
        </>
      ) : (
        <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
          {t('quiz.complete', { score, total: quiz.questions.length })}
        </div>
      )}
    </article>
  )
}

export default QuizCard
