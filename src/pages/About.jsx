import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Truck, Wallet, Leaf, Users, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const About = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      title: t('aboutSmartSegregation'),
      text: t('aboutSmartSegDesc'),
      Icon: Recycle,
    },
    {
      title: t('aboutDoorstepPickup'),
      text: t('aboutDoorstepDesc'),
      Icon: Truck,
    },
    {
      title: t('aboutInstantValue'),
      text: t('aboutInstantValueDesc'),
      Icon: Wallet,
    },
  ];

  const impactStats = [
    { label: t('aboutActiveHouseholds'), value: '10L+' },
    { label: t('aboutCitiesConnected'), value: '500+' },
    { label: t('aboutWasteDiverted'), value: '2.4M kg+' },
    { label: t('aboutRewardsDelivered'), value: '75K+' },
  ];

  const aboutImages = [
    {
      title: t('aboutDoorstepScrapPickup'),
      image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: t('aboutSortedRecyclableWaste'),
      image: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: t('aboutCommunityRecyclingImpact'),
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <section className="about-page">
      <div className="about-hero">
        <p className="about-tag">{t('aboutPageTitle')}</p>
        <h1>{t('aboutHeroSubtitle')}</h1>
        <p className="about-lead">
          {t('aboutHeroDesc')}
        </p>

        <div className="about-hero-badges">
          <span><Leaf size={16} /> {t('aboutBadge1')}</span>
          <span><Users size={16} /> {t('aboutBadge2')}</span>
          <span><ShieldCheck size={16} /> {t('aboutBadge3')}</span>
        </div>
      </div>

      <div className="about-highlights">
        {highlights.map((highlight) => {
          const CardIcon = highlight.Icon;

          return (
            <article key={highlight.title} className="about-highlight-card">
              <div className="about-highlight-icon"><CardIcon size={18} /></div>
              <h2>{highlight.title}</h2>
              <p>{highlight.text}</p>
            </article>
          );
        })}
      </div>

      <div className="about-visuals">
        <h3>{t('aboutVisualsTitle')}</h3>
        <div className="about-visual-grid">
          {aboutImages.map((item) => (
            <figure key={item.title} className="about-visual-card">
              <img src={item.image} alt={item.title} loading="lazy" />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="about-impact">
        <h3>{t('aboutImpactTitle')}</h3>
        <div className="about-impact-grid">
          {impactStats.map((item) => (
            <div key={item.label} className="about-impact-item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="about-cta">
        <h3>{t('aboutCtaTitle')}</h3>
        <p>{t('aboutCtaDesc')}</p>
        <div className="about-cta-actions">
          <Link to="/income-source" className="about-btn about-btn-primary">{t('aboutCtaBtn1')}</Link>
          <Link to="/contact" className="about-btn about-btn-secondary">{t('aboutCtaBtn2')}</Link>
        </div>
      </div>
    </section>
  );
};

export default About;
