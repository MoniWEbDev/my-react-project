import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Truck, Wallet, Leaf, Users, ShieldCheck } from 'lucide-react';
import './About.css';

const About = () => {
  const highlights = [
    {
      title: 'Smart Segregation',
      text: 'We help households separate dry waste categories quickly so recyclable material can be recovered with less contamination.',
      Icon: Recycle,
    },
    {
      title: 'Doorstep Pickup',
      text: 'Users can request convenient pickups and avoid local dumping points while keeping neighborhoods cleaner and safer.',
      Icon: Truck,
    },
    {
      title: 'Instant Value Back',
      text: 'From scrap payouts to gift rewards, KachraBeche turns everyday waste into measurable financial value.',
      Icon: Wallet,
    },
  ];

  const impactStats = [
    { label: 'Active Households', value: '10L+' },
    { label: 'Cities Connected', value: '500+' },
    { label: 'Waste Diverted', value: '2.4M kg+' },
    { label: 'Rewards Delivered', value: '75K+' },
  ];

  const aboutImages = [
    {
      title: 'Doorstep Scrap Pickup',
      image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Sorted Recyclable Waste',
      image: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Community Recycling Impact',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <section className="about-page">
      <div className="about-hero">
        <p className="about-tag">About KachraBeche</p>
        <h1>From Scrap to Value, From Habit to Impact</h1>
        <p className="about-lead">
          KachraBeche is built to make responsible recycling simple, rewarding, and scalable for Indian households.
          Our platform connects users, verified collectors, and recyclers in one transparent flow so every kilogram of
          waste has a better destination than landfill.
        </p>

        <div className="about-hero-badges">
          <span><Leaf size={16} /> Cleaner Streets</span>
          <span><Users size={16} /> Stronger Communities</span>
          <span><ShieldCheck size={16} /> Trusted Process</span>
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
        <h3>How KachraBeche Works on Ground</h3>
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
        <h3>Our Impact Snapshot</h3>
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
        <h3>Ready to Start Responsible Recycling?</h3>
        <p>Track your waste, request pickup, and unlock rewards through one simple flow.</p>
        <div className="about-cta-actions">
          <Link to="/income-source" className="about-btn about-btn-primary">Start Waste Input</Link>
          <Link to="/contact" className="about-btn about-btn-secondary">Talk to Our Team</Link>
        </div>
      </div>
    </section>
  );
};

export default About;
