import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Truck, Wallet, Leaf, Users, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const About = () => {
  const { language } = useLanguage();
  const copyByLanguage = {
    en: {
      tag: 'About KachraBeche',
      title: 'From Scrap to Value, From Habit to Impact',
      lead: 'KachraBeche is built to make responsible recycling simple, rewarding, and scalable for Indian households. Our platform connects users, verified collectors, and recyclers in one transparent flow so every kilogram of waste has a better destination than landfill.',
      badge1: 'Cleaner Streets',
      badge2: 'Stronger Communities',
      badge3: 'Trusted Process',
      howTitle: 'How KachraBeche Works on Ground',
      impactTitle: 'Our Impact Snapshot',
      ctaTitle: 'Ready to Start Responsible Recycling?',
      ctaText: 'Track your waste, request pickup, and unlock rewards through one simple flow.',
      ctaPrimary: 'Start Waste Input',
      ctaSecondary: 'Talk to Our Team',
      highlights: [
        {
          title: 'Smart Segregation',
          text: 'We help households separate dry waste categories quickly so recyclable material can be recovered with less contamination.',
        },
        {
          title: 'Doorstep Pickup',
          text: 'Users can request convenient pickups and avoid local dumping points while keeping neighborhoods cleaner and safer.',
        },
        {
          title: 'Instant Value Back',
          text: 'From scrap payouts to gift rewards, KachraBeche turns everyday waste into measurable financial value.',
        },
      ],
      stats: ['Active Households', 'Cities Connected', 'Waste Diverted', 'Rewards Delivered'],
      images: ['Doorstep Scrap Pickup', 'Sorted Recyclable Waste', 'Community Recycling Impact'],
    },
    hi: {
      tag: 'KachraBeche के बारे में',
      title: 'कबाड़ से मूल्य, आदत से प्रभाव',
      lead: 'KachraBeche जिम्मेदार रीसाइक्लिंग को आसान, लाभदायक और बड़े स्तर पर अपनाने योग्य बनाता है। हमारा प्लेटफॉर्म उपयोगकर्ताओं, सत्यापित कलेक्टरों और रीसाइक्लरों को एक पारदर्शी प्रवाह में जोड़ता है।',
      badge1: 'साफ सड़कें',
      badge2: 'मजबूत समुदाय',
      badge3: 'विश्वसनीय प्रक्रिया',
      howTitle: 'KachraBeche जमीनी स्तर पर कैसे काम करता है',
      impactTitle: 'हमारा प्रभाव',
      ctaTitle: 'जिम्मेदार रीसाइक्लिंग शुरू करने के लिए तैयार हैं?',
      ctaText: 'अपना कचरा ट्रैक करें, पिकअप बुक करें और रिवॉर्ड पाएं।',
      ctaPrimary: 'वेस्ट इनपुट शुरू करें',
      ctaSecondary: 'हमारी टीम से बात करें',
      highlights: [
        {
          title: 'स्मार्ट छंटाई',
          text: 'हम घरों को सूखे कचरे की श्रेणियां जल्दी अलग करने में मदद करते हैं।',
        },
        {
          title: 'डोरस्टेप पिकअप',
          text: 'उपयोगकर्ता सुविधाजनक पिकअप बुक कर सकते हैं और आसपास को साफ रख सकते हैं।',
        },
        {
          title: 'तुरंत मूल्य',
          text: 'कबाड़ भुगतान से लेकर उपहार तक, कचरा अब आय में बदलता है।',
        },
      ],
      stats: ['सक्रिय परिवार', 'जुड़े शहर', 'लैंडफिल से बचा कचरा', 'दिए गए रिवॉर्ड'],
      images: ['डोरस्टेप कबाड़ पिकअप', 'छांटा गया रीसाइक्लेबल कचरा', 'समुदाय पर प्रभाव'],
    },
    ur: {
      tag: 'KachraBeche کے بارے میں',
      title: 'کباڑ سے قدر، عادت سے اثر',
      lead: 'KachraBeche ذمہ دار ری سائیکلنگ کو آسان، فائدہ مند اور بڑے پیمانے پر قابل عمل بناتا ہے۔ ہمارا پلیٹ فارم صارفین، تصدیق شدہ کلیکٹرز اور ری سائیکلرز کو ایک شفاف بہاؤ میں جوڑتا ہے۔',
      badge1: 'صاف سڑکیں',
      badge2: 'مضبوط کمیونٹیز',
      badge3: 'قابلِ اعتماد عمل',
      howTitle: 'KachraBeche زمینی سطح پر کیسے کام کرتا ہے',
      impactTitle: 'ہمارا اثر',
      ctaTitle: 'کیا آپ ذمہ دار ری سائیکلنگ شروع کرنے کے لیے تیار ہیں؟',
      ctaText: 'اپنا کچرا ٹریک کریں، پک اپ بک کریں اور انعامات حاصل کریں۔',
      ctaPrimary: 'ویسٹ اِن پٹ شروع کریں',
      ctaSecondary: 'ہماری ٹیم سے بات کریں',
      highlights: [
        {
          title: 'اسمارٹ چھانٹی',
          text: 'ہم گھروں کو خشک کچرے کی اقسام جلدی الگ کرنے میں مدد دیتے ہیں۔',
        },
        {
          title: 'گھر تک پک اپ',
          text: 'صارفین آسان پک اپ بک کر سکتے ہیں اور اپنے اردگرد کو صاف رکھ سکتے ہیں۔',
        },
        {
          title: 'فوری قدر',
          text: 'کباڑ ادائیگی سے لے کر تحائف تک، کچرا اب آمدنی میں بدلتا ہے۔',
        },
      ],
      stats: ['فعال گھرانے', 'جڑے ہوئے شہر', 'لینڈ فل سے بچایا گیا کچرا', 'دیے گئے انعامات'],
      images: ['گھر تک کباڑ پک اپ', 'الگ کیا گیا ری سائیکل ہونے والا کچرا', 'کمیونٹی پر اثر'],
    },
    mr: {
      tag: 'KachraBeche बद्दल',
      title: 'कचऱ्यापासून मूल्य, सवयीपासून प्रभाव',
      lead: 'KachraBeche जबाबदार पुनर्वापर सोपा, फायदेशीर आणि मोठ्या प्रमाणात वापरण्यास योग्य बनवतो. आमचे प्लॅटफॉर्म वापरकर्ते, पडताळलेले कलेक्टर्स आणि रिसायकलर्स यांना पारदर्शक प्रवाहात जोडते.',
      badge1: 'स्वच्छ रस्ते',
      badge2: 'मजबूत समुदाय',
      badge3: 'विश्वासार्ह प्रक्रिया',
      howTitle: 'KachraBeche प्रत्यक्ष पातळीवर कसे काम करते',
      impactTitle: 'आमचा प्रभाव',
      ctaTitle: 'जबाबदार पुनर्वापर सुरू करायला तयार आहात?',
      ctaText: 'तुमचा कचरा ट्रॅक करा, पिकअप बुक करा आणि रिवॉर्ड मिळवा.',
      ctaPrimary: 'वेस्ट इनपुट सुरू करा',
      ctaSecondary: 'आमच्या टीमशी बोला',
      highlights: [
        {
          title: 'स्मार्ट वर्गीकरण',
          text: 'आम्ही घरांना सुक्या कचऱ्याच्या श्रेणी लवकर वेगळ्या करण्यात मदत करतो.',
        },
        {
          title: 'डोरस्टेप पिकअप',
          text: 'वापरकर्ते सोयीस्कर पिकअप बुक करू शकतात आणि परिसर स्वच्छ ठेवू शकतात.',
        },
        {
          title: 'तत्काळ मूल्य',
          text: 'कचरा देयकांपासून गिफ्टपर्यंत, कचरा आता उत्पन्नात बदलतो.',
        },
      ],
      stats: ['सक्रिय कुटुंबे', 'जोडलेली शहरे', 'लँडफिलपासून वाचवलेला कचरा', 'दिलेली बक्षिसे'],
      images: ['डोरस्टेप कचरा पिकअप', 'वर्गीकृत रिसायकल कचरा', 'समुदायावर प्रभाव'],
    },
    bn: {
      tag: 'KachraBeche সম্পর্কে',
      title: 'আবর্জনা থেকে মূল্য, অভ্যাস থেকে প্রভাব',
      lead: 'KachraBeche দায়িত্বশীল রিসাইক্লিংকে সহজ, লাভজনক এবং বড় পরিসরে গ্রহণযোগ্য করে। আমাদের প্ল্যাটফর্ম ব্যবহারকারী, যাচাইকৃত সংগ্রাহক এবং রিসাইক্লারদের একটি স্বচ্ছ প্রবাহে যুক্ত করে।',
      badge1: 'পরিষ্কার রাস্তা',
      badge2: 'শক্তিশালী সম্প্রদায়',
      badge3: 'বিশ্বস্ত প্রক্রিয়া',
      howTitle: 'KachraBeche মাটির স্তরে কীভাবে কাজ করে',
      impactTitle: 'আমাদের প্রভাব',
      ctaTitle: 'দায়িত্বশীল রিসাইক্লিং শুরু করতে প্রস্তুত?',
      ctaText: 'আপনার বর্জ্য ট্র্যাক করুন, পিকআপ বুক করুন এবং পুরস্কার পান।',
      ctaPrimary: 'ওয়েস্ট ইনপুট শুরু করুন',
      ctaSecondary: 'আমাদের টিমের সাথে কথা বলুন',
      highlights: [
        {
          title: 'স্মার্ট বাছাই',
          text: 'আমরা পরিবারগুলোকে শুকনো বর্জ্যের ধরন দ্রুত আলাদা করতে সাহায্য করি।',
        },
        {
          title: 'ডোরস্টেপ পিকআপ',
          text: 'ব্যবহারকারীরা সুবিধাজনক পিকআপ বুক করতে পারে এবং আশপাশ পরিষ্কার রাখতে পারে।',
        },
        {
          title: 'তাৎক্ষণিক মূল্য',
          text: 'স্ক্র্যাপ পেমেন্ট থেকে গিফট পর্যন্ত, বর্জ্য এখন আয়ে রূপান্তরিত হয়।',
        },
      ],
      stats: ['সক্রিয় পরিবার', 'সংযুক্ত শহর', 'ল্যান্ডফিল থেকে বাঁচানো বর্জ্য', 'প্রদানকৃত পুরস্কার'],
      images: ['ডোরস্টেপ স্ক্র্যাপ পিকআপ', 'বাছাই করা রিসাইক্লেবল বর্জ্য', 'কমিউনিটি প্রভাব'],
    },
  };

  const copy = copyByLanguage[language] || copyByLanguage.en;

  const highlights = [
    {
      title: copy.highlights[0].title,
      text: copy.highlights[0].text,
      Icon: Recycle,
    },
    {
      title: copy.highlights[1].title,
      text: copy.highlights[1].text,
      Icon: Truck,
    },
    {
      title: copy.highlights[2].title,
      text: copy.highlights[2].text,
      Icon: Wallet,
    },
  ];

  const impactStats = [
    { label: copy.stats[0], value: '10L+' },
    { label: copy.stats[1], value: '500+' },
    { label: copy.stats[2], value: '2.4M kg+' },
    { label: copy.stats[3], value: '75K+' },
  ];

  const aboutImages = [
    {
      title: copy.images[0],
      image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: copy.images[1],
      image: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: copy.images[2],
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <section className="about-page">
      <div className="about-hero">
        <p className="about-tag">{copy.tag}</p>
        <h1>{copy.title}</h1>
        <p className="about-lead">
          {copy.lead}
        </p>

        <div className="about-hero-badges">
          <span><Leaf size={16} /> {copy.badge1}</span>
          <span><Users size={16} /> {copy.badge2}</span>
          <span><ShieldCheck size={16} /> {copy.badge3}</span>
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
        <h3>{copy.howTitle}</h3>
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
        <h3>{copy.impactTitle}</h3>
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
        <h3>{copy.ctaTitle}</h3>
        <p>{copy.ctaText}</p>
        <div className="about-cta-actions">
          <Link to="/income-source" className="about-btn about-btn-primary">{copy.ctaPrimary}</Link>
          <Link to="/contact" className="about-btn about-btn-secondary">{copy.ctaSecondary}</Link>
        </div>
      </div>
    </section>
  );
};

export default About;
