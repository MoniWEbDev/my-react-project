import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Contact.css';

const Contact = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const COPY = {
    en: {
      title: 'Contact Us',
      intro: 'Have questions about scrap prices, gift criteria, or bulk pickup requests? Reach out anytime. Our team is ready to assist you.',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      sendMessage: 'Send Us a Message',
      formSubtitle: "Fill in the details below and we'll get back to you soon.",
      fullName: 'Full Name *',
      emailAddress: 'Email Address *',
      phoneNumber: 'Phone Number *',
      subject: 'Subject *',
      message: 'Message *',
      namePlaceholder: 'Your full name',
      messagePlaceholder: 'Please tell us more about your inquiry...',
      selectSubject: 'Select a subject',
      submit: 'Submit',
      success: "Message sent successfully! We'll get back to you soon.",
      error: 'Please fill in all required fields.',
      whyTitle: 'Why Contact Us?',
    },
    hi: {
      title: 'संपर्क करें',
      intro: 'स्क्रैप कीमत, उपहार पात्रता या बल्क पिकअप के बारे में प्रश्न हैं? कभी भी संपर्क करें। हमारी टीम आपकी मदद के लिए तैयार है।',
      address: 'पता',
      phone: 'फोन',
      email: 'ईमेल',
      sendMessage: 'हमें संदेश भेजें',
      formSubtitle: 'नीचे विवरण भरें, हम जल्द ही आपसे संपर्क करेंगे।',
      fullName: 'पूरा नाम *',
      emailAddress: 'ईमेल पता *',
      phoneNumber: 'फोन नंबर *',
      subject: 'विषय *',
      message: 'संदेश *',
      namePlaceholder: 'अपना पूरा नाम',
      messagePlaceholder: 'अपनी समस्या/प्रश्न लिखें...',
      selectSubject: 'विषय चुनें',
      submit: 'सबमिट करें',
      success: 'संदेश सफलतापूर्वक भेजा गया। हम जल्द संपर्क करेंगे।',
      error: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
      whyTitle: 'हमसे संपर्क क्यों करें?',
    },
    mr: {
      title: 'संपर्क करा',
      intro: 'स्क्रॅप किंमत, गिफ्ट निकष किंवा बल्क पिकअपबद्दल प्रश्न आहेत का? कधीही संपर्क करा. आमची टीम मदतीस तयार आहे.',
      address: 'पत्ता',
      phone: 'फोन',
      email: 'ईमेल',
      sendMessage: 'आम्हाला संदेश पाठवा',
      formSubtitle: 'खालील तपशील भरा, आम्ही लवकरच संपर्क करू.',
      fullName: 'पूर्ण नाव *',
      emailAddress: 'ईमेल पत्ता *',
      phoneNumber: 'फोन नंबर *',
      subject: 'विषय *',
      message: 'संदेश *',
      namePlaceholder: 'तुमचे पूर्ण नाव',
      messagePlaceholder: 'तुमची चौकशी लिहा...',
      selectSubject: 'विषय निवडा',
      submit: 'सबमिट',
      success: 'संदेश यशस्वीरीत्या पाठवला. आम्ही लवकर संपर्क करू.',
      error: 'कृपया सर्व आवश्यक फील्ड भरा.',
      whyTitle: 'आमच्याशी संपर्क का?',
    },
    ur: {
      title: 'ہم سے رابطہ کریں',
      intro: 'اسکریپ قیمت، انعامات یا بلک پیک اپ کے بارے میں سوال ہے؟ کبھی بھی رابطہ کریں۔ ہماری ٹیم مدد کے لیے تیار ہے۔',
      address: 'پتہ',
      phone: 'فون',
      email: 'ای میل',
      sendMessage: 'ہمیں پیغام بھیجیں',
      formSubtitle: 'نیچے تفصیل بھریں، ہم جلد رابطہ کریں گے۔',
      fullName: 'پورا نام *',
      emailAddress: 'ای میل ایڈریس *',
      phoneNumber: 'فون نمبر *',
      subject: 'موضوع *',
      message: 'پیغام *',
      namePlaceholder: 'اپنا پورا نام',
      messagePlaceholder: 'اپنا مسئلہ/سوال لکھیں...',
      selectSubject: 'موضوع منتخب کریں',
      submit: 'جمع کریں',
      success: 'پیغام کامیابی سے بھیج دیا گیا۔ ہم جلد رابطہ کریں گے۔',
      error: 'براہ کرم تمام ضروری خانے پُر کریں۔',
      whyTitle: 'ہم سے رابطہ کیوں؟',
    },
    bn: {
      title: 'যোগাযোগ করুন',
      intro: 'স্ক্র্যাপ মূল্য, উপহার যোগ্যতা বা বাল্ক পিকআপ নিয়ে প্রশ্ন আছে? যেকোনো সময় যোগাযোগ করুন।',
      address: 'ঠিকানা',
      phone: 'ফোন',
      email: 'ইমেল',
      sendMessage: 'আমাদের বার্তা পাঠান',
      formSubtitle: 'নিচের তথ্য পূরণ করুন, আমরা দ্রুত যোগাযোগ করব।',
      fullName: 'পূর্ণ নাম *',
      emailAddress: 'ইমেল ঠিকানা *',
      phoneNumber: 'ফোন নম্বর *',
      subject: 'বিষয় *',
      message: 'বার্তা *',
      namePlaceholder: 'আপনার পূর্ণ নাম',
      messagePlaceholder: 'আপনার প্রশ্ন লিখুন...',
      selectSubject: 'একটি বিষয় নির্বাচন করুন',
      submit: 'জমা দিন',
      success: 'বার্তা সফলভাবে পাঠানো হয়েছে। আমরা দ্রুত যোগাযোগ করব।',
      error: 'অনুগ্রহ করে সব প্রয়োজনীয় ঘর পূরণ করুন।',
      whyTitle: 'কেন যোগাযোগ করবেন?',
    },
  };
  const copy = COPY[language] || COPY.en;
  const subjectOptions = isEnglish
    ? ['Scrap Prices Question', 'Gift Inquiry', 'Bulk Pickup Request', 'Account Issue', 'General Inquiry', 'Feedback']
    : ['स्क्रैप कीमत प्रश्न', 'उपहार जानकारी', 'बल्क पिकअप अनुरोध', 'खाता समस्या', 'सामान्य पूछताछ', 'फीडबैक'];
  const benefits = isEnglish
    ? [
        '💰 Get instant prices for your scrap',
        '🎁 Know which gifts you can unlock',
        '🚚 Schedule bulk pickups',
        '🤝 Expert guidance on recycling',
        '🌍 Contribute to a sustainable future',
      ]
    : [
        '💰 अपने स्क्रैप की तुरंत कीमत पाएं',
        '🎁 जानें कौन से गिफ्ट अनलॉक कर सकते हैं',
        '🚚 बल्क पिकअप शेड्यूल करें',
        '🤝 रीसाइक्लिंग पर विशेषज्ञ मार्गदर्शन',
        '🌍 टिकाऊ भविष्य में योगदान दें',
      ];
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
        <h1>{copy.title}</h1>
        <p>
          {copy.intro}
        </p>

        {/* Quick Contact Info */}
        <div className="quick-contact">
          <div className="contact-item">
            <MapPin size={24} />
            <div>
              <span className="contact-label">{copy.address}</span>
              <span className="contact-value">123 Green City, Eco Valley, NG 10001</span>
            </div>
          </div>

          <div className="contact-item">
            <Phone size={24} />
            <div>
              <span className="contact-label">{copy.phone}</span>
              <span className="contact-value">+91 98765 43210</span>
            </div>
          </div>

          <div className="contact-item">
            <Mail size={24} />
            <div>
              <span className="contact-label">{copy.email}</span>
              <span className="contact-value">support@kachrabeche.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form-section">
        <div className="form-container">
          <h2>{copy.sendMessage}</h2>
          <p className="form-subtitle">{copy.formSubtitle}</p>

          <form onSubmit={handleSubmit} className="contact-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">{copy.fullName}</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={copy.namePlaceholder}
                className="form-input"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">{copy.emailAddress}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={isEnglish ? 'your.email@example.com' : 'aapka.email@example.com'}
                className="form-input"
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">{copy.phoneNumber}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={isEnglish ? '+91 XXXXX XXXXX' : '+91 अपना नंबर'}
                className="form-input"
              />
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="subject">{copy.subject}</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">{copy.selectSubject}</option>
                {subjectOptions.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">{copy.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={copy.messagePlaceholder}
                className="form-textarea"
                rows="5"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              {copy.submit}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="status-message success">
                ✓ {copy.success}
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="status-message error">
                ✕ {copy.error}
              </div>
            )}
          </form>
        </div>

        {/* Form Image/Illustration (Optional) */}
        <div className="form-side-visual">
          <div className="visual-card">
            <h3>{copy.whyTitle}</h3>
            <ul className="benefits-list">
              {benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
