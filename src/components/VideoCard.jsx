import { Bookmark, CheckCircle2, PlayCircle } from 'lucide-react'

const VideoCard = ({ video, isBookmarked, isWatched, onToggleBookmark, onPlay }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm shadow-slate-900/5 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
      <div className="relative h-44 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          type="button"
          onClick={onPlay}
          className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm"
        >
          <PlayCircle size={14} />
          Play
        </button>
        {isWatched && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-xs font-semibold text-white">
            <CheckCircle2 size={12} />
            Watched
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{video.title}</h3>
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`rounded-lg p-1.5 transition ${
              isBookmarked
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300'
            }`}
            aria-label="Toggle bookmark"
          >
            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{video.duration}</span>
          <span className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-slate-700">{video.difficulty}</span>
        </div>
      </div>
    </article>
  )
}

export default VideoCard
