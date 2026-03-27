import React, { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import cardFallbackImage from '../assets/hero.jpg';
import './Home.css';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const heroVideos = [
    {
      title: t('heroVideoStep1Title'),
      subtitle: t('heroVideoStep1Subtitle'),
      src: '/home-hero-video.mp4',
    },
    {
      title: t('heroVideoStep2Title'),
      subtitle: t('heroVideoStep2Subtitle'),
      src: 'https://cdn.pixabay.com/video/2022/11/15/139214-771263162_large.mp4',
    },
  ];

  const currentHeroVideo = heroVideos[activeVideoIndex];

  const handleHeroVideoEnd = () => {
    setActiveVideoIndex((prev) => (prev + 1) % heroVideos.length);
  };

  const handleHeroVideoError = () => {
    setActiveVideoIndex(0);
  };

  const handleReadMore = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  const categoryFallbacks = {
    'Old Juta': 'https://5.imimg.com/data5/ANDROID/Default/2024/4/412093384/NE/US/XC/204967852/product-jpeg-500x500.jpg',
    Loha: 'https://tiimg.tistatic.com/fp/1/008/350/7-13-gram-per-cubic-meter-6-mm-thick-old-cast-iron-ferrous-scrap-947.jpg',
    'Cosmetic Containers': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  };
  const homeImageCards = [
    {
      key: 'Waste Collection',
      name: t('categoryNameWasteCollection'),
      image: 'https://5.imimg.com/data5/QQ/SW/GLADMIN-36192092/waste-collection-service-500x500.png',
      text: t('categoryTextWasteCollection'),
      details: 'With proper segregation of dry and wet waste, recycling efficiency improves significantly. Regular pickup and scientific disposal reduce foul smell, blocked drains, and health risks in local areas.',
    },
    {
      key: 'Old Juta',
      name: t('categoryNameOldJuta'),
      image: 'https://5.imimg.com/data5/ANDROID/Default/2024/4/412093384/NE/US/XC/204967852/product-jpeg-500x500.jpg',
      text: t('categoryTextOldJuta'),
      details: 'Used slippers and shoes can be separated by sole, fabric, and rubber components. This helps recovery centers recycle material better and reduces long-term landfill burden.',
    },
    {
      key: 'Loha',
      name: t('categoryNameLoha'),
      image: 'https://tiimg.tistatic.com/fp/1/008/350/7-13-gram-per-cubic-meter-6-mm-thick-old-cast-iron-ferrous-scrap-947.jpg',
      text: t('categoryTextLoha'),
      details: 'Rusted metal items like bolts, rods, sheets, and machine parts can be collected in bulk for processing. Proper metal recycling reduces mining demand and supports energy-efficient production.',
    },
    {
      key: 'Old cloths',
      name: t('categoryNameOldCloths'),
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRpHK6mGN5Xn8YpU07LcfZ_Djh5Oz0Np0BTsD3rEwhh1CRp5hTYzefMCe2o4arEAbGh6f2V7Gq41Abg-XyPXzcYmecqvKaatSd6UILp4RTBpijB9SaSHzdu',
      text: t('categoryTextOldCloths'),
      details: 'Reusable garments can be donated, while damaged cloth can be reused in industrial cleaning, cushioning, or fiber recovery. This ensures better utilization of textile waste.',
    },
    {
      key: 'Cosmetic Containers',
      name: t('categoryNameCosmeticContainers'),
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      text: t('categoryTextCosmeticContainers'),
      details: 'Separate plastic, glass, and metal cosmetic packaging before handing it to recyclers. Clean and dry containers improve sorting quality and lower contamination in recycling plants.',
    },
  ];

  return (
    <div className="home-container">
      <section className="home-hero-video-section">
        <video
          className="home-hero-video"
          autoPlay
          muted
          playsInline
          key={currentHeroVideo.src}
          src={currentHeroVideo.src}
          onEnded={handleHeroVideoEnd}
          onError={handleHeroVideoError}
        />

        <div className="hero-video-caption">
          <p className="hero-video-step">{currentHeroVideo.title}</p>
          <p className="hero-video-subtext">{currentHeroVideo.subtitle}</p>
          <div className="hero-video-dots" aria-label="Hero video steps">
            {heroVideos.map((video, index) => (
              <button
                key={video.title}
                type="button"
                className={`hero-video-dot ${index === activeVideoIndex ? 'active' : ''}`}
                onClick={() => setActiveVideoIndex(index)}
                aria-label={video.title}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="home-page">
        <section className="welcome-hero-card">
          <div className="welcome-main">
            <h1 className="welcome-heading">
              {t('welcomeTitle')} <span>{t('brandName')}</span>
            </h1>

            <h2 className="welcome-highlight">
              {t('homeHeroLine1')}<br />
              {t('homeHeroLine2')}
            </h2>

            <p className="welcome-text">
              {t('description1')}
            </p>

            <p className="welcome-text">
              {t('description2')}
            </p>

            <div className="welcome-actions">
              <button className="btn-primary-hero" onClick={() => navigate('/income-source')}>
                {t('homeStartRecycling')} <ArrowRight size={16} />
              </button>
              <button className="btn-secondary-hero">{t('homeViewDashboard')}</button>

              <div className="welcome-topline welcome-topline-inline">
                <span className="welcome-badge">{t('homeBadgeText')}</span>
                <span className="welcome-rating">
                  <Star size={14} />
                  {t('homeUserRating')}
                </span>
              </div>
            </div>
          </div>

          <div className="welcome-extra">
            <h3 className="welcome-subheading">{t('homeWhyLoveTitle')}</h3>
            <ul className="welcome-points">
              <li>{t('homeWhyLovePoint1')}</li>
              <li>{t('homeWhyLovePoint2')}</li>
              <li>{t('homeWhyLovePoint3')}</li>
            </ul>
          </div>

        </section>

        <div className="home-stats">
          <div className="stat-box">
            <h3>10L+</h3>
            <p>{t('statUsers')}</p>
          </div>
          <div className="stat-box">
            <h3>500+</h3>
            <p>{t('statCities')}</p>
          </div>
          <div className="stat-box">
            <h3>₹50Cr+</h3>
            <p>{t('statPaid')}</p>
          </div>
          <div className="stat-box">
            <h3>99%</h3>
            <p>{t('statHappy')}</p>
          </div>
        </div>
      </div>

      <section className="home-image-info-section">
        <div className="home-image-info-header">
          <h2 className="home-image-info-title">
            <span className="home-image-info-title-typing">{t('homeSmartCategoriesTitle')}</span>
          </h2>
          <p className="home-image-info-subtitle">
            {t('homeSmartCategoriesSubtitle')}
          </p>
        </div>

        <div className="home-image-info-grid">
          {homeImageCards.slice(0, 3).map((card) => {
            return (
            <article key={card.name} className="home-image-info-card">
              <h3 className="home-image-card-name">{card.name}</h3>
              <img
                src={card.image}
                alt={card.name}
                className="home-image-info-photo"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = categoryFallbacks[card.key] || cardFallbackImage;
                }}
              />
              <div className="home-image-info-content">
                <p className="home-image-card-text">{card.text}</p>
                <button type="button" className="home-read-more-btn" onClick={() => handleReadMore(card.key)}>
                  {t('readMoreBtn')}
                </button>
              </div>
            </article>
          );})}
        </div>
      </section>
    </div>
  );
}
