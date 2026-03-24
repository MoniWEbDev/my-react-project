import { useMemo, useState } from 'react'

const CourseQuizCard = ({ quiz, unlocked, result, onSubmit }) => {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    return quiz.questions.reduce((sum, question) => {
      if (answers[question.id] === question.answer) return sum + 1
      return sum
    }, 0)
  }, [answers, quiz.questions])

  const submitQuiz = () => {
    if (!unlocked) return
    const allAnswered = quiz.questions.every((question) => answers[question.id])
    if (!allAnswered) return

    onSubmit(score, quiz.questions.length)
    setSubmitted(true)
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Quiz / Assessment</h3>
      {!unlocked && (
        <p className="mt-2 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Locked. Complete all videos to unlock this quiz.
        </p>
      )}

      <div className={`mt-4 space-y-4 ${!unlocked ? 'pointer-events-none opacity-50' : ''}`}>
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {index + 1}. {question.question}
            </p>
            <div className="grid gap-2">
              {question.options.map((option) => {
                const chosen = answers[question.id] === option
                const isCorrect = submitted && option === question.answer
                const isWrong = submitted && chosen && option !== question.answer

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                    className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                      isCorrect
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200'
                        : isWrong
                          ? 'border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-200'
                          : chosen
                            ? 'border-sky-400 bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-200'
                            : 'border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={submitQuiz}
          disabled={!unlocked}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Submit Quiz
        </button>
        {(submitted || result) && (
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Score: {(result?.score ?? score)}/{result?.total ?? quiz.questions.length}
          </p>
        )}
      </div>
    </article>
  )
}

export default CourseQuizCard
