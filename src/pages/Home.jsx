import React, { useState } from 'react';
import { ArrowRight, Leaf, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import bannerBg from '../assets/recycling_banner.png'; // Assuming I move it to assets
import cardFallbackImage from '../assets/hero.jpg';
import './Home.css';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCardName, setSelectedCardName] = useState('');
  const [cardFormData, setCardFormData] = useState({
    name: '',
    image: '',
    text: '',
    details: '',
  });

  const openReadForm = (card) => {
    setSelectedCardName(card.name);
    setCardFormData({
      name: card.name,
      image: card.image,
      text: card.text,
      details: card.details,
    });
    setIsFormOpen(true);
  };

  const closeReadForm = () => {
    setIsFormOpen(false);
    setSelectedCardName('');
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setCardFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const categoryFallbacks = {
    'Old Juta': 'https://5.imimg.com/data5/ANDROID/Default/2024/4/412093384/NE/US/XC/204967852/product-jpeg-500x500.jpg',
    Loha: 'https://tiimg.tistatic.com/fp/1/008/350/7-13-gram-per-cubic-meter-6-mm-thick-old-cast-iron-ferrous-scrap-947.jpg',
    'Cosmetic Containers': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  };
  const homeImageCards = [
    {
      name: 'Waste Collection',
      image: 'https://5.imimg.com/data5/QQ/SW/GLADMIN-36192092/waste-collection-service-500x500.png',
      text: 'Daily mixed waste can be separated at source for better recycling results. Proper collection helps reduce landfill pressure and keeps surroundings cleaner.',
      details: 'With proper segregation of dry and wet waste, recycling efficiency improves significantly. Regular pickup and scientific disposal reduce foul smell, blocked drains, and health risks in local areas.',
    },
    {
      name: 'Old Juta',
      image: 'https://5.imimg.com/data5/ANDROID/Default/2024/4/412093384/NE/US/XC/204967852/product-jpeg-500x500.jpg',
      text: 'Old shoes and footwear parts can be reused or recycled with proper sorting. This prevents non-biodegradable material from being dumped openly.',
      details: 'Used slippers and shoes can be separated by sole, fabric, and rubber components. This helps recovery centers recycle material better and reduces long-term landfill burden.',
    },
    {
      name: 'Loha',
      image: 'https://tiimg.tistatic.com/fp/1/008/350/7-13-gram-per-cubic-meter-6-mm-thick-old-cast-iron-ferrous-scrap-947.jpg',
      text: 'Iron and metal scrap can be melted and used again without quality loss. Selling loha scrap gives good returns and saves natural resources.',
      details: 'Rusted metal items like bolts, rods, sheets, and machine parts can be collected in bulk for processing. Proper metal recycling reduces mining demand and supports energy-efficient production.',
    },
    {
      name: 'Old cloths',
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRpHK6mGN5Xn8YpU07LcfZ_Djh5Oz0Np0BTsD3rEwhh1CRp5hTYzefMCe2o4arEAbGh6f2V7Gq41Abg-XyPXzcYmecqvKaatSd6UILp4RTBpijB9SaSHzdu',
      text: 'Old clothes and fabric waste can be sorted for reuse and textile recycling. This reduces mixed garbage and helps recover useful material.',
      details: 'Reusable garments can be donated, while damaged cloth can be reused in industrial cleaning, cushioning, or fiber recovery. This ensures better utilization of textile waste.',
    },
    {
      name: 'Cosmetic Containers',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      text: 'Empty cosmetic bottles, tubes, and jars should be cleaned before disposal. These containers can enter specialized recycling streams safely.',
      details: 'Separate plastic, glass, and metal cosmetic packaging before handing it to recyclers. Clean and dry containers improve sorting quality and lower contamination in recycling plants.',
    },
  ];

  return (
    <div className="home-container">
      <div className="home-page">
        <section className="welcome-hero-card">
          <div className="welcome-main">
            <h1 className="welcome-heading">
              {t('welcomeTitle')} <span>{t('brandName')}</span>
            </h1>

            <h2 className="welcome-highlight">
              Recycle Smarter.<br />
              Earn Better Rewards.
            </h2>

            <p className="welcome-text">
              {t('description1')}
            </p>

            <p className="welcome-text">
              {t('description2')}
            </p>

            <div className="welcome-actions">
              <button className="btn-primary-hero" onClick={() => navigate('/income-source')}>
                Start Recycling <ArrowRight size={16} />
              </button>
              <button className="btn-secondary-hero">View Dashboard</button>

              <div className="welcome-topline welcome-topline-inline">
                <span className="welcome-badge">Smart Scrap Rewards Platform</span>
                <span className="welcome-rating">
                  <Star size={14} />
                  4.9 User Rating
                </span>
              </div>
            </div>
          </div>

          <div className="welcome-extra">
            <h3 className="welcome-subheading">Why users love it</h3>
            <ul className="welcome-points">
              <li>Track household waste in seconds</li>
              <li>Earn dynamic rewards by kg recycled</li>
              <li>Unlock levels, eco points, and gift tiers</li>
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
                Recycle Smartly,<br/>
                Live Green.<br/>
                <span>Sell Your Scrap Online!</span>
              </h2>
            </div>

            <div className="yellow-info-box">
              <div className="info-icon-wrapper">
                <Leaf size={28} color="#1a202c" />
              </div>
              <h2 className="banner-title">{t('bannerTitle')}</h2>
              <p className="banner-text">{t('bannerDesc')}</p>
              <button className="btn-banner-action" onClick={() => navigate('/contact')}>
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-image-info-section">
        <div className="home-image-info-header">
          <h2 className="home-image-info-title">
            <span className="home-image-info-title-typing">Smart Scrap Categories</span>
          </h2>
          <p className="home-image-info-subtitle">
            Har category ka naam diya gaya hai, aur uske niche matching image add ki gayi hai.
          </p>
        </div>

        <div className="home-image-info-grid">
          {homeImageCards.map((card) => {
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
                  event.currentTarget.src = categoryFallbacks[card.name] || cardFallbackImage;
                }}
              />
              <div className="home-image-info-content">
                <p className="home-image-card-text">{card.text}</p>
                <button type="button" className="home-read-more-btn" onClick={() => openReadForm(card)}>
                  Read More
                </button>
              </div>
            </article>
          );})}
        </div>
      </section>

      {isFormOpen && (
        <div className="card-form-overlay" onClick={closeReadForm}>
          <div className="card-form-modal" onClick={(event) => event.stopPropagation()}>
            <h3>{selectedCardName} Details Form</h3>

            <form className="card-detail-form">
              <label htmlFor="card-name">Name</label>
              <input
                id="card-name"
                name="name"
                type="text"
                value={cardFormData.name}
                onChange={handleFormChange}
              />

              <label htmlFor="card-image">Image</label>
              <input
                id="card-image"
                name="image"
                type="text"
                value={cardFormData.image}
                onChange={handleFormChange}
              />

              <label htmlFor="card-text">Text</label>
              <textarea
                id="card-text"
                name="text"
                rows="3"
                value={cardFormData.text}
                onChange={handleFormChange}
              />

              <label htmlFor="card-details">Details</label>
              <textarea
                id="card-details"
                name="details"
                rows="4"
                value={cardFormData.details}
                onChange={handleFormChange}
              />
            </form>

            <pre className="card-json-preview">{`{\n  name: '${cardFormData.name}',\n  image: '${cardFormData.image}',\n  text: '${cardFormData.text}',\n  details: '${cardFormData.details}',\n}`}</pre>

            <button type="button" className="card-form-close-btn" onClick={closeReadForm}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
