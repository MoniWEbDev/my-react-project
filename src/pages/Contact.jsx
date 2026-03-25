import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    // Success simulation
    console.log('Form Data:', formData);
    setSubmitStatus('success');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    setTimeout(() => setSubmitStatus(''), 4000);
  };

  return (
    <section className="contact-page">
      {/* Header Info */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Have questions about the scrap prices, gift criteria, or bulk pickup requests? 
          Feel free to reach out to us at any time. Our environment experts are ready to assist you.
        </p>

        {/* Quick Contact Info */}
        <div className="quick-contact">
          <div className="contact-item">
            <MapPin size={24} />
            <div>
              <span className="contact-label">Address</span>
              <span className="contact-value">123 Green City, Eco Valley, NG 10001</span>
            </div>
          </div>

          <div className="contact-item">
            <Phone size={24} />
            <div>
              <span className="contact-label">Phone</span>
              <span className="contact-value">+91 98765 43210</span>
            </div>
          </div>

          <div className="contact-item">
            <Mail size={24} />
            <div>
              <span className="contact-label">Email</span>
              <span className="contact-value">support@kachrabeche.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form-section">
        <div className="form-container">
          <h2>Send Us a Message</h2>
          <p className="form-subtitle">Fill in the details below and we'll get back to you soon.</p>

          <form onSubmit={handleSubmit} className="contact-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="form-input"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="form-input"
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="form-input"
              />
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select a subject</option>
                <option value="Scrap Prices">Scrap Prices Question</option>
                <option value="Gift Inquiry">Gift Inquiry</option>
                <option value="Bulk Pickup">Bulk Pickup Request</option>
                <option value="Account Issue">Account Issue</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please tell us more about your inquiry..."
                className="form-textarea"
                rows="5"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Submit
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="status-message success">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="status-message error">
                ✕ Please fill in all required fields.
              </div>
            )}
          </form>
        </div>

        {/* Form Image/Illustration (Optional) */}
        <div className="form-side-visual">
          <div className="visual-card">
            <h3>Why Contact Us?</h3>
            <ul className="benefits-list">
              <li>💰 Get instant prices for your scrap</li>
              <li>🎁 Know which gifts you can unlock</li>
              <li>🚚 Schedule bulk pickups</li>
              <li>🤝 Expert guidance on recycling</li>
              <li>🌍 Contribute to a sustainable future</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
