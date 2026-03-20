
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Company Info */}
        <div className="footer-col footer-logo-col">
          <h3 className="footer-company-name">KachraBeche</h3>
          <p className="footer-tagline">
            Transforming waste management with smart solutions. Sell your scrap items easily and get amazing gifts and rewards in return.
          </p>
          
          <h4 className="footer-subheading">Head Office</h4>
          <p className="footer-address">123 Green City, Eco Valley, NG 10001</p>
          
          <h4 className="footer-subheading">Follow Us</h4>
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
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#faqs">FAQs</a></li>
            <li><a href="#learn">Learn More</a></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-links">
            <li><a href="/gift">Rewards & Gifts</a></li>
            <li><a href="#price">Price List</a></li>
            <li><a href="#scrap">Scrap Categories</a></li>
            <li><a href="#pickup">Schedule Pickup</a></li>
            <li><a href="#track">Track Orders</a></li>
          </ul>
        </div>

        {/* Locations Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Locations</h3>
          <ul className="footer-links">
            <li><a href="#delhi">📍 Delhi</a></li>
            <li><a href="#mumbai">📍 Mumbai</a></li>
            <li><a href="#bangalore">📍 Bangalore</a></li>
          </ul>
        </div>

        {/* Get Started Column */}
        <div className="footer-col footer-cta">
          <h3 className="footer-heading">Get Started</h3>
          <ul className="footer-links">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
          </ul>
          <button className="btn-primary">Contact Us</button>
          <button className="btn-secondary">Sign Up</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} KachraBeche Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;