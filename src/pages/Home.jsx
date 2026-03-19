import React, { useState, useRef } from 'react';
import { Camera, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const fileInputRef = useRef(null);
  
  const { t } = useLanguage();

  const categories = [
    { id: 1, label: t('chappal'), image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80' },
    { id: 2, label: t('bartan'), image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&q=80' },
    { id: 3, label: t('kapde'), image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80' }
  ];

  const handleCaptureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoPreview(imageUrl);
    }
  };

  return (
    <>
      <section className="split-hero">
        
        {/* Left Side: Elaborate visually-styled text that mimics the provided image */}
        <div className="hero-left">
          <div className="promo-content">
            <h1 className="hindi-title-main">{t('mainHeadline')}</h1>
            <div className="hindi-title-sub">{t('subHeadline')}</div>
            <div className="ribbon">
              <h2 className="hindi-title-gift">{t('ribbonText')}</h2>
            </div>
            
            <h3 className="english-title" style={{ whiteSpace: 'pre-line' }}>{t('englishSubHeadline')}</h3>
          </div>

          <div className="hero-buttons">
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            
            <button className="btn-pill btn-yellow" onClick={handleCaptureClick}>
              <Camera size={15} />
              {t('capturePhoto')}
            </button>
            <button className="btn-pill btn-white" onClick={() => setShowYoutubeModal(true)}>
              <Youtube size={15} color="#D97706" />
              <span style={{ color: '#D97706' }}>{t('watchVideo')}</span>
            </button>
          </div>

          {photoPreview && (
            <div className="photo-preview" style={{ margin: '0 auto', zIndex: 3 }}>
              <img src={photoPreview} alt="Captured Scrap" style={{ borderRadius: '1px', width: '200px' }}/>
              <p style={{ background: 'rgba(0,0,0,0.6)', color: 'white', textAlign: 'center' }}>{t('uploadedPhoto')}</p>
            </div>
          )}
        </div>

        {/* Right Side: Video Container */}
        <div className="hero-video-container" style={{ position: 'relative', width: '90%', height: '60%', minHeight: '300px', borderRadius: '0 0 0 0px', overflow: 'hidden', boxShadow: '-10px 0 20px rgba(0,0,0,0.2)', marginTop: '10px'  }}>
          <video 
            className="hero-video" 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            poster="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1000&q=80"
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <div className="play-button-overlay">
            <Youtube size={40} />
          </div> */}
        </div>
      </section>

      {/* Yellow Poster Section */}
      <section className="poster-section">
        <h2 className="poster-title">{t('whatWeAccept')}</h2>
        <div className="category-grid">
          {categories.map(cat => (
            <div key={cat.id} className="category-card">
              <div className="card-img-wrapper">
                <img src={cat.image} alt={cat.label} />
                <div className="card-overlay"></div>
                <h3 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{cat.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube Modal */}
      {showYoutubeModal && (
        <div className="modal-overlay" onClick={() => setShowYoutubeModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-close" onClick={() => setShowYoutubeModal(false)}>X</div>
            <div className="video-wrapper">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
