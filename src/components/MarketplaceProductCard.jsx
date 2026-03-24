import { MapPin, ShoppingCart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const MarketplaceProductCard = ({ product, discountPercent = 0 }) => {
  const { t } = useTranslation()
  const discountedPrice = Math.round(product.price * (1 - discountPercent / 100))

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <img src={product.image} alt={product.title} className="h-40 w-full object-cover" loading="lazy" />
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{product.title}</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{product.category}</p>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            {discountPercent > 0 ? (
              <>
                <p className="text-xs text-slate-400 line-through">Rs. {product.price}</p>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Rs. {discountedPrice}</p>
              </>
            ) : (
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Rs. {product.price}</p>
            )}
          </div>
          <button className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
            <ShoppingCart size={13} />
            {t('community.buy')}
          </button>
        </div>
        <p className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <MapPin size={12} />
          {product.seller} - {product.location}
        </p>
      </div>
    </article>
  )
}

export default MarketplaceProductCard
