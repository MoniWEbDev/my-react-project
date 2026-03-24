import { useMemo, useState } from 'react'
import { Link2, Mic, Search, Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import QuizCard from '../components/QuizCard'
import ActivityCard from '../components/ActivityCard'
import MarketplaceProductCard from '../components/MarketplaceProductCard'
import SellerEarningsCard from '../components/SellerEarningsCard'
import SkillPostCard from '../components/SkillPostCard'
import UserAuthCard from '../components/UserAuthCard'
import { useApp } from '../hooks/useApp'
import { useLearning } from '../hooks/useLearning'
import { useRecycling } from '../hooks/useRecycling'
import {
  categoryLessons,
  learningCategories,
  marketplaceProducts,
  sampleQuiz,
  skillPosts,
} from '../data/communityData'

const speechApi =
  typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)

const CommunityHub = () => {
  const { t } = useTranslation()
  const { currentUser, isAuthenticated, login, logout } = useApp()
  const { totalWeight, points } = useRecycling()
  const { learningProgress, completedActivityIds, completeActivity, submitQuizResult, quizResults } = useLearning()

  const [products, setProducts] = useState(marketplaceProducts)
  const [posts, setPosts] = useState(skillPosts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(500)
  const [searchTerm, setSearchTerm] = useState('')
  const [uploadForm, setUploadForm] = useState({ title: '', price: '', description: '', category: learningCategories[0], image: '' })

  const discountPercent = points >= 500 ? 20 : points >= 250 ? 10 : 0

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory
      const priceMatch = product.price <= maxPrice
      const searchMatch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase())

      return categoryMatch && priceMatch && searchMatch
    })
  }, [products, selectedCategory, maxPrice, searchTerm])

  const soldCount = Math.max(3, Math.floor(filteredProducts.length * 1.7))
  const earnings = soldCount * 260

  const addProduct = (event) => {
    event.preventDefault()
    if (!uploadForm.title || !uploadForm.price || !uploadForm.description) return

    setProducts((prev) => [
      {
        id: crypto.randomUUID(),
        title: uploadForm.title,
        price: Number(uploadForm.price),
        category: uploadForm.category,
        seller: currentUser.name,
        location: currentUser.location,
        image:
          uploadForm.image ||
          'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=80',
        description: uploadForm.description,
      },
      ...prev,
    ])

    setUploadForm({ title: '', price: '', description: '', category: learningCategories[0], image: '' })
  }

  const handleLike = (postId) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const sharePost = (post) => {
    const text = encodeURIComponent(`${post.caption} - ${post.user} (${post.location})`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const useVoiceForSearch = () => {
    if (!speechApi) return

    const recognition = new speechApi()
    recognition.lang = 'en-IN'
    recognition.onresult = (event) => {
      const spoken = event.results?.[0]?.[0]?.transcript
      if (spoken) setSearchTerm(spoken)
    }
    recognition.start()
  }

  return (
    <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <UserAuthCard isAuthenticated={isAuthenticated} currentUser={currentUser} onLogin={login} onLogout={logout} />

            <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center gap-3">
                <img src={currentUser.photo} alt={currentUser.name} className="h-12 w-12 rounded-xl object-cover" />
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{currentUser.name}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{currentUser.location}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">{currentUser.bio}</p>
              <div className="mt-3 grid gap-2">
                <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">{t('community.learningProgress', { value: learningProgress })}</div>
                <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">{t('community.wasteContributed', { total: totalWeight.toFixed(1) })}</div>
                <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">{t('community.skills')}: {currentUser.skills?.join(', ')}</div>
              </div>
            </article>
          </div>

          <div className="space-y-6">
            <header className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('community.title')}</h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {t('community.subtitle')}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  {t('community.rewardPoints', { points })}
                </span>
                <span className="rounded-full bg-cyan-100 px-3 py-1 font-semibold text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300">
                  {t('community.discount', { discount: discountPercent })}
                </span>
                <span className="rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                  {t('community.completedActivities', { count: completedActivityIds.length })}
                </span>
              </div>
            </header>

            <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('community.learningCategories')}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {learningCategories.map((category) => (
                  <span key={category} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {category}
                  </span>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {categoryLessons.map((lesson) => (
                  <article key={lesson.id} className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                    <img src={lesson.thumbnail} alt={lesson.title} className="h-28 w-full object-cover" loading="lazy" />
                    <div className="space-y-1 p-3">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{lesson.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{lesson.category}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{lesson.level} - {lesson.duration}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className="grid gap-4 xl:grid-cols-2">
              <QuizCard quiz={sampleQuiz} previousResult={quizResults[sampleQuiz.id]} onSubmit={submitQuizResult} />
              <ActivityCard
                activity={{
                  id: 'activity-rural',
                  title: t('community.taskTitle'),
                  instructions: t('community.taskInstructions'),
                  points: 90,
                }}
                completed={completedActivityIds.includes('activity-rural')}
                onComplete={() => completeActivity('activity-rural')}
              />
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('community.marketplace')}</h2>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder={t('community.searchProducts')}
                      className="rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs outline-none dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>
                  <button onClick={useVoiceForSearch} type="button" className="rounded-xl border border-slate-200 p-2 text-slate-500 dark:border-slate-700 dark:text-slate-300" aria-label={t('community.voiceInput')}>
                    <Mic size={14} />
                  </button>
                  <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-950">
                    <option value="All">{t('community.allCategories')}</option>
                    {learningCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs text-slate-500 dark:text-slate-400">{t('community.maxPrice', { price: maxPrice })}</label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="10"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="mt-2 w-full"
                />
              </div>

              <form onSubmit={addProduct} className="mb-5 grid gap-2 rounded-xl bg-slate-100 p-3 dark:bg-slate-800 sm:grid-cols-2">
                <input value={uploadForm.title} onChange={(event) => setUploadForm((prev) => ({ ...prev, title: event.target.value }))} placeholder={t('community.productTitle')} className="rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-950" />
                <input type="number" value={uploadForm.price} onChange={(event) => setUploadForm((prev) => ({ ...prev, price: event.target.value }))} placeholder={t('community.price')} className="rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-950" />
                <input value={uploadForm.image} onChange={(event) => setUploadForm((prev) => ({ ...prev, image: event.target.value }))} placeholder={t('community.imageUrl')} className="rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-950" />
                <select value={uploadForm.category} onChange={(event) => setUploadForm((prev) => ({ ...prev, category: event.target.value }))} className="rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-950">
                  {learningCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <textarea value={uploadForm.description} onChange={(event) => setUploadForm((prev) => ({ ...prev, description: event.target.value }))} placeholder={t('community.description')} className="rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-950 sm:col-span-2" />
                <button className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900">{t('community.uploadProduct')}</button>
              </form>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <MarketplaceProductCard key={product.id} product={product} discountPercent={discountPercent} />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('community.skillFeed')}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {posts.map((post) => (
                  <SkillPostCard
                    key={post.id}
                    post={post}
                    onLike={() => handleLike(post.id)}
                    onShare={() => sharePost(post)}
                  />
                ))}
              </div>
            </section>

            <div className="grid gap-4 xl:grid-cols-2">
              <SellerEarningsCard soldCount={soldCount} earnings={earnings} />
              <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('community.rewardsUnlocks')}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
                    <Wallet size={14} />
                    {t('community.discountTier', { discount: discountPercent })}
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
                    <Link2 size={14} />
                    {points >= 300 ? t('community.learningAccessUnlocked') : t('community.learningAccessLocked')}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunityHub
