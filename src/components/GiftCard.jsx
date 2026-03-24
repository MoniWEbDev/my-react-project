import { motion as Motion } from 'framer-motion'

const GiftCard = ({ gift, delay = 0 }) => {
  return (
    <Motion.article
      className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white/70 shadow-lg shadow-emerald-900/10 backdrop-blur-sm dark:border-emerald-900/70 dark:bg-slate-900/70"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -6 }}
    >
      <div className="h-44 overflow-hidden">
        <img
          src={gift.image}
          alt={gift.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{gift.title}</h3>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200">
            Rs. {gift.price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{gift.ecoBenefit}</p>
      </div>
    </Motion.article>
  )
}

export default GiftCard
