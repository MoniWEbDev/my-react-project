import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <h3>KachraBeche</h3>
          <p>
            Transforming waste management with smart solutions. 
            Sell your scrap items easily and get amazing gifts and rewards in return.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" className="social-icon" aria-label="YouTube"><Youtube size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <p><a href="/">Home</a></p>
          <p><a href="/about">About Us</a></p>
          <p><a href="/contact">Contact</a></p>
          <p><a href="/gift">Rewards</a></p>
        </div>

        <div className="footer-col">
          <h3>Contact Info</h3>
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <MapPin size={18} color="var(--primary)" />
            123 Green City, Eco Valley, NG 10001
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Phone size={18} color="var(--primary)" />
            +91 98765 43210
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={18} color="var(--primary)" />
            support@kachrabeche.com
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} KachraBeche Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
