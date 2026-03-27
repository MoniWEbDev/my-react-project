import React, { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { wasteImagesData } from '../data/wasteImages';
import { useLanguage } from '../contexts/LanguageContext';
import './CategoryDetail.css';

export default function CategoryDetail() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Decode category name
  const decodedCategory = decodeURIComponent(categoryName);

  // Get images for the category
  const categoryImages = useMemo(() => {
    return wasteImagesData[decodedCategory] || [];
  }, [decodedCategory]);

  const localizedCategoryName = useMemo(() => {
    const categoryMap = {
      'Waste Collection': t('categoryNameWasteCollection'),
      'Old Juta': t('categoryNameOldJuta'),
      Loha: t('categoryNameLoha'),
      'Old cloths': t('categoryNameOldCloths'),
      'Cosmetic Containers': t('categoryNameCosmeticContainers'),
    };

    return categoryMap[decodedCategory] || decodedCategory;
  }, [decodedCategory, t]);

  const handleImageError = (e) => {
    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Waste+Image';
  };

  // Create cards data
  const cardsData = categoryImages.slice(0, 3).map((image, idx) => ({
    id: idx,
    image,
    title: `${localizedCategoryName} ${t('categoryItemLabel')} ${idx + 1}`,
    description: `${t('categoryItemDescriptionPrefix')} ${localizedCategoryName.toLowerCase()} ${t('categoryItemDescriptionSuffix')}`,
    cuisine: localizedCategoryName,
    type: t('categoryTypeValue'),
    enquiry: '+91 9876543210',
  }));

  const openDiscoverForm = (card) => {
    setSelectedCard(card);
    setIsFormOpen(true);
  };

  const closeDiscoverForm = () => {
    setIsFormOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="category-detail-container">
      {/* Header */}
      <div className="category-detail-header">
        <button 
          className="category-detail-back-btn" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} />
          {t('backBtn')}
        </button>
        <h1 className="category-detail-title">{localizedCategoryName}</h1>
        <div className="category-detail-spacer" />
      </div>

      {/* Cards Grid */}
      <section className="category-cards-section">
        <h2 className="category-section-title">{t('categoryAvailableLabel')} {localizedCategoryName}</h2>
        <div className="category-cards-grid">
          {cardsData.map((card) => (
            <div key={card.id} className="category-item-card">
              <div className="card-image-wrapper">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="card-image"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>

              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>

                <div className="card-details">
                  <div className="detail-row">
                    <span className="detail-label">{t('categoryLabel')}</span>
                    <span className="detail-value">{card.cuisine}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">{t('enquiryLabel')}</span>
                    <span className="detail-value">{card.enquiry}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">{t('typeLabel')}</span>
                    <span className="detail-value">{card.type}</span>
                  </div>
                </div>

                <button className="card-discover-btn" onClick={() => openDiscoverForm(card)}>
                  {t('discoverBtn')} <span>›</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isFormOpen && (
        <div className="discover-form-overlay" onClick={closeDiscoverForm}>
          <div className="discover-form-modal" onClick={(event) => event.stopPropagation()}>
            <h3 className="discover-form-title">{selectedCard?.title} {t('formLabel')}</h3>
            <p className="discover-form-subtitle">{t('categoryFormSubtitle')}</p>

            <div className="discover-form-images-row">
              {cardsData.slice(0, 3).map((item) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  className="discover-form-image"
                  onError={handleImageError}
                />
              ))}
            </div>

            <form className="discover-form-fields">
              <label htmlFor="pickup-name">{t('contactFullName')}</label>
              <input id="pickup-name" type="text" placeholder={t('contactPlaceholderName')} />

              <label htmlFor="pickup-phone">{t('contactPhone')}</label>
              <input id="pickup-phone" type="text" placeholder={t('contactPlaceholderPhone')} />
            </form>

            <button className="discover-form-close" type="button" onClick={closeDiscoverForm}>
              {t('closeBtn')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
