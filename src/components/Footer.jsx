import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Company Info */}
        <div className="footer-col footer-logo-col">
          <h3 className="footer-company-name">KachraBeche</h3>
          <p className="footer-tagline">
            {t('footerTagline')}
          </p>
          
          <h4 className="footer-subheading">{t('headOffice')}</h4>
          <p className="footer-address">123 Green City, Eco Valley, NG 10001</p>
          
          <h4 className="footer-subheading">{t('followUs')}</h4>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" className="social-icon" aria-label="YouTube"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Company Column */}
        <div className="footer-col">
          <h3 className="footer-heading">{t('companyLabel')}</h3>
          <ul className="footer-links">
            <li><a href="/about">{t('aboutUs')}</a></li>
            <li><a href="#careers">{t('careers')}</a></li>
            <li><a href="#faqs">{t('faqs')}</a></li>
            <li><a href="#learn">{t('learnMore')}</a></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="footer-col">
          <h3 className="footer-heading">{t('servicesLabel')}</h3>
          <ul className="footer-links">
            <li><a href="/gift">{t('rewardsGifts')}</a></li>
            <li><a href="#price">{t('priceList')}</a></li>
            <li><a href="#scrap">{t('scrapCategories')}</a></li>
            <li><a href="#pickup">{t('schedulePickup')}</a></li>
            <li><a href="#track">{t('trackOrders')}</a></li>
          </ul>
        </div>

        {/* Locations Column */}
        <div className="footer-col">
          <h3 className="footer-heading">{t('locationsLabel')}</h3>
          <ul className="footer-links">
            <li><a href="#delhi">📍 Delhi</a></li>
            <li><a href="#mumbai">📍 Mumbai</a></li>
            <li><a href="#bangalore">📍 Bangalore</a></li>
          </ul>
        </div>

        {/* Get Started Column */}
        <div className="footer-col footer-cta">
          <h3 className="footer-heading">{t('getStartedLabel')}</h3>
          <ul className="footer-links">
            <li><a href="#privacy">{t('privacyPolicy')}</a></li>
            <li><a href="#terms">{t('termsConditions')}</a></li>
          </ul>
          <button className="btn-primary">{t('contactUsBtn')}</button>
          <button className="btn-secondary">{t('signUpBtn')}</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {t('allRightsReserved')}</p>
      </div>
    </footer>
  );
};

export default Footer;