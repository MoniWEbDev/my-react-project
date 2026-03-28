import React from 'react';
import { ArrowRight, Leaf, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import WhatWeAcceptCarousel from '../components/WhatWeAcceptCarousel';
import bannerBg from '../assets/recycling_banner.png'; // Assuming I move it to assets
import './Home.css';

export default function Home() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const homeCopyByLanguage = {
    en: {
      recyclingCategoriesAria: 'Recycling categories',
      bannerLine1: 'Recycle Smartly,',
      bannerLine2: 'Live Green.',
      bannerLine3: 'Sell Your Scrap Online!',
      joinNow: 'Join Now',
      wasteJourneyTitle: 'Waste Transformation Journey',
      wasteJourneyDesc:
        'Explore separate streams for plastic, paper, metal, and organic waste to understand how each material becomes useful again.',
    },
    hi: {
      recyclingCategoriesAria: 'रीसाइक्लिंग श्रेणियां',
      bannerLine1: 'स्मार्ट रीसाइक्लिंग,',
      bannerLine2: 'हरित जीवन।',
      bannerLine3: 'अपना स्क्रैप ऑनलाइन बेचें!',
      joinNow: 'अभी जुड़ें',
      wasteJourneyTitle: 'कचरा रूपांतरण यात्रा',
      wasteJourneyDesc:
        'प्लास्टिक, कागज, धातु और जैविक कचरे की अलग धाराओं को समझें और देखें कि हर सामग्री कैसे उपयोगी बनती है।',
    },
    ur: {
      recyclingCategoriesAria: 'ری سائیکلنگ کی اقسام',
      bannerLine1: 'سمارٹ ری سائیکلنگ،',
      bannerLine2: 'سبز زندگی۔',
      bannerLine3: 'اپنا اسکریپ آن لائن بیچیں!',
      joinNow: 'ابھی شامل ہوں',
      wasteJourneyTitle: 'کچرے کی تبدیلی کا سفر',
      wasteJourneyDesc:
        'پلاسٹک، کاغذ، دھات اور نامیاتی کچرے کی الگ دھاراؤں کو دیکھیں اور سمجھیں کہ ہر مواد دوبارہ کیسے کارآمد بنتا ہے۔',
    },
    mr: {
      recyclingCategoriesAria: 'रीसायकलिंग श्रेणी',
      bannerLine1: 'स्मार्ट रीसायकलिंग,',
      bannerLine2: 'हरित जीवन.',
      bannerLine3: 'आपला स्क्रॅप ऑनलाइन विक्री करा!',
      joinNow: 'आत्ताच सामील व्हा',
      wasteJourneyTitle: 'कचरा रूपांतरण प्रवास',
      wasteJourneyDesc:
        'प्लास्टिक, कागद, धातू आणि सेंद्रिय कचऱ्याच्या वेगवेगळ्या प्रवाहांना समजून घ्या आणि प्रत्येक साहित्य पुन्हा कसे उपयोगी होते ते पहा.',
    },
    bn: {
      recyclingCategoriesAria: 'রিসাইক্লিং বিভাগ',
      bannerLine1: 'স্মার্ট রিসাইক্লিং,',
      bannerLine2: 'সবুজ জীবন।',
      bannerLine3: 'আপনার স্ক্র্যাপ অনলাইনে বিক্রি করুন!',
      joinNow: 'এখনই যোগ দিন',
      wasteJourneyTitle: 'বর্জ্য রূপান্তর যাত্রা',
      wasteJourneyDesc:
        'প্লাস্টিক, কাগজ, ধাতু এবং জৈব বর্জ্যের আলাদা ধারা দেখে বুঝুন কীভাবে প্রতিটি উপাদান আবার কাজে লাগে।',
    },
  };
  const homeCopy = homeCopyByLanguage[language] || homeCopyByLanguage.en;
  const wasteJourneyCards = [
    {
      id: 'plastic',
      title: t('plasticWaste'),
      short: t('plasticShort'),
      beforeLabel: t('beforePlastic'),
      beforeImage: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=900&q=80',
      afterLabel: t('afterPlastic'),
      afterImage: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'paper',
      title: t('paperWaste'),
      short: t('paperShort'),
      beforeLabel: t('beforePaper'),
      beforeImage: 'https://images.pexels.com/photos/3740387/pexels-photo-3740387.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop',
      afterLabel: t('afterPaper'),
      afterImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'metal',
      title: t('metalWaste'),
      short: t('metalShort'),
      beforeLabel: t('beforeMetal'),
      beforeImage: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=80',
      afterLabel: t('afterMetal'),
      afterImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'organic',
      title: t('organicWaste'),
      short: t('organicShort'),
      beforeLabel: t('beforeOrganic'),
      beforeImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
      afterLabel: t('afterOrganic'),
      afterImage: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=900&q=80',
    },
  ];

  return (
    <div className="home-container">
      <section className="home-hero-video-section">
        <video
          className="home-hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/home-hero.mp4?v=20260328-1007" type="video/mp4" />
        </video>

        <div className="home-hero-overlay" aria-hidden="true" />

        <div className="home-hero-content">
          <p className="home-hero-kicker">{t('cinematicStoryKicker')}</p>
          <h1 className="home-hero-title">{t('turnWasteHeading')}</h1>
          <p className="home-hero-description">
            {t('fullRecyclingJourney')}
          </p>
          <p className="home-hero-quote">{t('recycleReuseReimagine')}</p>
          <div className="home-hero-tags" aria-label={homeCopy.recyclingCategoriesAria}>
            <span>{t('plasticWaste')}</span>
            <span>{t('paperWaste')}</span>
            <span>{t('metalWaste')}</span>
            <span>{t('organicWaste')}</span>
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
              {t('recycleSmarterTitle')}
            </h2>

            <p className="welcome-text">
              {t('description1')}
            </p>

            <p className="welcome-text">
              {t('description2')}
            </p>

            <div className="welcome-actions">
              <button className="btn-primary-hero" onClick={() => navigate('/income-source')}>
                {t('startRecycling')} <ArrowRight size={16} />
              </button>
              <button className="btn-secondary-hero">{t('viewDashboard')}</button>

              <div className="welcome-topline welcome-topline-inline">
                <span className="welcome-badge">{t('smartScrapRewards')}</span>
                <span className="welcome-rating">
                  <Star size={14} />
                  4.9 {t('userRating')}
                </span>
              </div>
            </div>
          </div>

          <div className="welcome-extra">
            <h3 className="welcome-subheading">{t('whyUsersLoveIt')}</h3>
            <ul className="welcome-points">
              <li>{t('trackWaste')}</li>
              <li>{t('earnRewards')}</li>
              <li>{t('unlockLevels')}</li>
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

      {/* ── NEW BANNER SECTION ── */}
      <section className="home-banner-section">
        <div className="banner-card" style={{ backgroundImage: `url(${bannerBg})` }}>
          <div className="banner-content-wrapper">
            <div className="banner-right-content">
              <h2 className="banner-slogan">
                {homeCopy.bannerLine1}<br/>
                {homeCopy.bannerLine2}<br/>
                <span>{homeCopy.bannerLine3}</span>
              </h2>
            </div>

            <div className="yellow-info-box">
              <div className="info-icon-wrapper">
                <Leaf size={28} color="#1a202c" />
              </div>
              <h2 className="banner-title">{t('bannerTitle')}</h2>
              <p className="banner-text">{t('bannerDesc')}</p>
              <button className="btn-banner-action" onClick={() => navigate('/contact')}>
                {homeCopy.joinNow}
              </button>
            </div>
          </div>
        </div>
      </section>

      <WhatWeAcceptCarousel />

      <section className="waste-journey-section">
        <div className="waste-journey-header">
          <h2>{homeCopy.wasteJourneyTitle}</h2>
          <p>
            {homeCopy.wasteJourneyDesc}
          </p>
        </div>

        <div className="waste-journey-grid">
          {wasteJourneyCards.map((item) => (
            <article key={item.id} className="waste-journey-card">
              <h3>{item.title}</h3>
              <p>{item.short}</p>

              <div className="waste-transform-visual">
                <div className="transform-layer before-layer">
                  <img src={item.beforeImage} alt={item.beforeLabel} loading="lazy" />
                  <span>{item.beforeLabel}</span>
                </div>

                <div className="transform-layer after-layer">
                  <img src={item.afterImage} alt={item.afterLabel} loading="lazy" />
                  <span>{item.afterLabel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
