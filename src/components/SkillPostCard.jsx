import { Heart, MessageCircle, Send, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const SkillPostCard = ({ post, onLike, onShare }) => {
  const { t } = useTranslation()

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <img src={post.media} alt={post.caption} className="h-52 w-full object-cover" loading="lazy" />
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{post.user}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{post.location}</p>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{post.caption}</p>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <button onClick={onLike} type="button" className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">
            <Heart size={13} />
            {post.likes}
          </button>
          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">
            <MessageCircle size={13} />
            {post.comments}
          </span>
          <button onClick={onShare} type="button" className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">
            <Share2 size={13} />
            {t('community.share')}
          </button>
          <button type="button" className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">
            <Send size={13} />
            {t('community.comment')}
          </button>
        </div>
      </div>
    </article>
  )
}

export default SkillPostCard
