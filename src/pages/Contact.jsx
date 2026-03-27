import React, { useState } from 'react';
import { Mail, Phone, MapPin, Star, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Contact.css';

const Contact = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('contact');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Contact Form State
  const [contactData, setContactData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Feedback Form State
  const [feedbackData, setFeedbackData] = useState({
    fullName: '',
    email: '',
    feedbackType: 'general',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState('');

  // Contact Form Handlers
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (!contactData.fullName || !contactData.email || !contactData.phone || !contactData.subject || !contactData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    console.log('Contact Form Data:', contactData);
    setSubmitStatus('success');
    setContactData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    setTimeout(() => setSubmitStatus(''), 4000);
  };

  // Feedback Form Handlers
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    if (!feedbackData.fullName || !feedbackData.email || !feedbackData.message || rating === 0) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    console.log('Feedback Form Data:', {
      ...feedbackData,
      rating,
    });
    setSubmitStatus('success');
    setFeedbackData({
      fullName: '',
      email: '',
      feedbackType: 'general',
      message: '',
    });
    setRating(0);

    setTimeout(() => setSubmitStatus(''), 4000);
  };

  return (
    <section className="contact-page">
      {/* Header Info */}
      <div className="contact-header">
        <h1>{t('contactTitle')}</h1>
        <p>
          {t('contactIntro')}
        </p>

        {/* Quick Contact Info */}
        <div className="quick-contact">
          <div className="contact-item">
            <MapPin size={24} />
            <div>
              <span className="contact-label">{t('contactAddress')}</span>
              <span className="contact-value">123 Green City, Eco Valley, NG 10001</span>
            </div>
          </div>

          <div className="contact-item">
            <Phone size={24} />
            <div>
              <span className="contact-label">{t('contactPhone')}</span>
              <span className="contact-value">+91 98765 43210</span>
            </div>
          </div>

          <div className="contact-item">
            <Mail size={24} />
            <div>
              <span className="contact-label">{t('contactEmail')}</span>
              <span className="contact-value">support@kachrabeche.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="form-tabs">
        <button 
          className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <Mail size={18} />
          {t('contactSendMessage')}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          <Send size={18} />
          {t('feedbackTitle')}
        </button>
      </div>

      {/* Forms Section */}
      <div className="contact-form-section">
        {/* Contact Form */}
        {activeTab === 'contact' && (
          <div className="form-container">
            <h2>{t('contactSendMessage')}</h2>
            <p className="form-subtitle">{t('contactFormSubtitle')}</p>

            <form onSubmit={handleContactSubmit} className="contact-form">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">{t('contactFullName')} *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={contactData.fullName}
                  onChange={handleContactChange}
                  placeholder={t('contactPlaceholderName')}
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">{t('contactFormEmail')} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleContactChange}
                  placeholder={t('contactPlaceholderEmail')}
                  className="form-input"
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone">{t('contactPhone')} *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={contactData.phone}
                  onChange={handleContactChange}
                  placeholder={t('contactPlaceholderPhone')}
                  className="form-input"
                />
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject">{t('contactMessageSubject')} *</label>
                <select
                  id="subject"
                  name="subject"
                  value={contactData.subject}
                  onChange={handleContactChange}
                  className="form-input"
                >
                  <option value="">{t('contactSubjectSelect')}</option>
                  <option value="Scrap Prices">{t('contactSubjectScrapPrices')}</option>
                  <option value="Gift Inquiry">{t('contactSubjectGiftInquiry')}</option>
                  <option value="Bulk Pickup">{t('contactSubjectBulkPickup')}</option>
                  <option value="Account Issue">{t('contactSubjectAccountIssue')}</option>
                  <option value="General Inquiry">{t('contactSubjectGeneralInquiry')}</option>
                </select>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">{t('contactYourMessage')} *</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  placeholder={t('contactPlaceholderMessage')}
                  className="form-textarea"
                  rows="5"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                {t('contactSubmitBtn')}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="status-message success">
                  ✓ {t('contactSuccessMessage')}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="status-message error">
                  ✕ {t('contactErrorMessage')}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Feedback Form */}
        {activeTab === 'feedback' && (
          <div className="form-container">
            <h2>{t('feedbackFormTitle')}</h2>
            <p className="form-subtitle">{t('feedbackFormSubtitle')}</p>

            <form onSubmit={handleFeedbackSubmit} className="contact-form">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="feedbackName">{t('feedbackName')} *</label>
                <input
                  type="text"
                  id="feedbackName"
                  name="fullName"
                  value={feedbackData.fullName}
                  onChange={handleFeedbackChange}
                  placeholder={t('feedbackNamePlaceholder')}
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="feedbackEmail">{t('feedbackEmail')} *</label>
                <input
                  type="email"
                  id="feedbackEmail"
                  name="email"
                  value={feedbackData.email}
                  onChange={handleFeedbackChange}
                  placeholder={t('feedbackEmailPlaceholder')}
                  className="form-input"
                />
              </div>

              {/* Feedback Type */}
              <div className="form-group">
                <label htmlFor="feedbackType">{t('feedbackType')} *</label>
                <select
                  id="feedbackType"
                  name="feedbackType"
                  value={feedbackData.feedbackType}
                  onChange={handleFeedbackChange}
                  className="form-input"
                >
                  <option value="general">{t('feedbackTypeGeneral')}</option>
                  <option value="bug">{t('feedbackTypeBug')}</option>
                  <option value="feature">{t('feedbackTypeFeature')}</option>
                  <option value="improvement">{t('feedbackTypeImprovement')}</option>
                  <option value="complaint">{t('feedbackTypeComplaint')}</option>
                </select>
              </div>

              {/* Star Rating */}
              <div className="form-group">
                <label>{t('feedbackRating')} *</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star
                        size={24}
                        fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <span className="rating-text">
                    {rating === 1 && t('feedbackRatingPoor')}
                    {rating === 2 && t('feedbackRatingAverage')}
                    {rating === 3 && t('feedbackRatingGood')}
                    {rating === 4 && t('feedbackRatingVeryGood')}
                    {rating === 5 && t('feedbackRatingExcellent')}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="feedbackMessage">{t('feedbackMessage')} *</label>
                <textarea
                  id="feedbackMessage"
                  name="message"
                  value={feedbackData.message}
                  onChange={handleFeedbackChange}
                  placeholder={t('feedbackMessagePlaceholder')}
                  className="form-textarea"
                  rows="5"
                ></textarea>
                <span className="char-count">
                  {feedbackData.message.length}/500
                </span>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                {t('feedbackSubmitBtn')}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="status-message success">
                  ✓ {t('feedbackSuccessMessage')}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="status-message error">
                  ✕ {t('feedbackErrorMessage')}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Form Image/Illustration (Optional) */}
        <div className="form-side-visual">
          <div className="visual-card">
            <h3>{t('contactWhyTitle')}</h3>
            <ul className="benefits-list">
              <li>{t('contactBenefit1')}</li>
              <li>{t('contactBenefit2')}</li>
              <li>{t('contactBenefit3')}</li>
              <li>{t('contactBenefit4')}</li>
              <li>{t('contactBenefit5')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
