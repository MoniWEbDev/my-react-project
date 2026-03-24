import { useMemo, useState } from 'react'

const SortingGame = ({ items }) => {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState('')

  const currentItem = items[index]
  const completed = index >= items.length

  const progress = useMemo(() => Math.round((index / items.length) * 100), [index, items.length])

  const pick = (userChoice) => {
    if (!currentItem) return

    const isCorrect = userChoice === currentItem.recyclable
    setResult(isCorrect ? 'Correct' : 'Wrong')
    if (isCorrect) setScore((prev) => prev + 1)

    setTimeout(() => {
      setIndex((prev) => prev + 1)
      setResult('')
    }, 500)
  }

  const reset = () => {
    setIndex(0)
    setScore(0)
    setResult('')
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Mini Game: Sort It Right</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Identify whether each item is recyclable.</p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full bg-linear-to-r from-cyan-400 to-blue-500" style={{ width: `${progress}%` }} />
      </div>

      {!completed ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {currentItem.label}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => pick(true)}
              className="flex-1 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Recyclable
            </button>
            <button
              type="button"
              onClick={() => pick(false)}
              className="flex-1 rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              Non-Recyclable
            </button>
          </div>
          {result && <p className="text-xs text-slate-500 dark:text-slate-400">{result}</p>}
        </div>
      ) : (
        <div className="mt-4 rounded-xl bg-cyan-50 p-4 text-sm text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-200">
          Game complete. Score: {score}/{items.length}
        </div>
      )}

      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        Retry
      </button>
    </article>
  )
}

export default SortingGame
