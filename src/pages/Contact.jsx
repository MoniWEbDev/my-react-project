import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="placeholder-page fade-in">
      <h1>Contact Us</h1>
      <p style={{ marginBottom: '40px' }}>
        Have questions about the scrap prices, gift criteria, or bulk pickup requests? 
        Feel free to reach out to us at any time. Our environment experts are ready to assist you.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start', textAlign: 'left', background: 'var(--white)', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', maxWidth: '500px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <MapPin size={24} color="var(--primary-dark)" />
          <span style={{ fontSize: '1.2rem' }}>123 Green City, Eco Valley, NG 10001</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Phone size={24} color="var(--primary-dark)" />
          <span style={{ fontSize: '1.2rem' }}>+91 98765 43210</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Mail size={24} color="var(--primary-dark)" />
          <span style={{ fontSize: '1.2rem' }}>support@kachrabeche.com</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
