import React, { useEffect, useState } from 'react';
import { Search, Mic } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Skill.css';

const Skill = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [currentSkill, setCurrentSkill] = useState(t('cropCultivation'));
  const [activeSkillId, setActiveSkillId] = useState(null);

  const summary = {
    overallProgress: '1%',
    skillsCompleted: '1',
    certificates: '1',
    points: '270',
  };

  const handleStartLearning = (skill) => {
    setCurrentSkill(skill.localizedTitle || skill.title);
    setActiveSkillId(skill.id);
  };

  const fallbackSkillImage =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" viewBox="0 0 800 480"><rect width="800" height="480" fill="%23fff1dc"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="%239a6b2f" font-family="Arial, sans-serif" font-size="30">Learning Hub Image</text></svg>';

  const skills = [
    {
      id: 1,
      title: 'Crop Cultivation',
      category: 'Agriculture',
      level: 'Beginner',
      description: 'Learn crop cultivation with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'In progress',
    },
    {
      id: 2,
      title: 'Soil Health Management',
      category: 'Agriculture',
      level: 'Intermediate',
      description: 'Learn soil health management with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.pexels.com/photos/4207908/pexels-photo-4207908.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 3,
      title: 'Organic Farming',
      category: 'Agriculture',
      level: 'Beginner',
      description: 'Learn organic farming with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'In progress',
    },
    {
      id: 4,
      title: 'Seed Preservation',
      category: 'Agriculture',
      level: 'Beginner',
      description: 'Learn seed preservation with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.pexels.com/photos/7728036/pexels-photo-7728036.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 5,
      title: 'Composting Basics',
      category: 'Waste Management',
      level: 'Beginner',
      description: 'Learn composting with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.pexels.com/photos/7656769/pexels-photo-7656769.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 35,
      modules: 4,
      status: 'Not started',
    },
    {
      id: 6,
      title: 'Upcycling Crafts',
      category: 'Waste Management',
      level: 'Intermediate',
      description: 'Learn upcycling with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 6,
      status: 'Not started',
    },
    {
      id: 7,
      title: 'Water Saving Methods',
      category: 'Agriculture',
      level: 'Advanced',
      description: 'Master farm-level water conservation through practical planning and field tasks.',
      image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 4,
      status: 'Not started',
    },
    {
      id: 8,
      title: 'Rural Compost Economics',
      category: 'Waste Management',
      level: 'Intermediate',
      description: 'Learn how composting can generate village income with realistic case studies.',
      image: 'https://images.pexels.com/photos/804392/pexels-photo-804392.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 9,
      title: 'Handmade Product Designing',
      category: 'Designing',
      level: 'Beginner',
      description: 'Learn design basics for handmade products, including shape, color, and usability.',
      image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 10,
      title: 'Clay Pottery Basics',
      category: 'Pottery',
      level: 'Beginner',
      description: 'Start making simple clay pots and utility items with practical pottery techniques.',
      image: 'https://images.pexels.com/photos/4992479/pexels-photo-4992479.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 6,
      status: 'Not started',
    },
    {
      id: 11,
      title: 'Mud Utensils Craft',
      category: 'Pottery',
      level: 'Intermediate',
      description: 'Build durable mud utensils for home and market use through guided practice.',
      image: 'https://images.pexels.com/photos/671956/pexels-photo-671956.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 6,
      status: 'Not started',
    },
    {
      id: 12,
      title: 'Bamboo Utility Products',
      category: 'Bamboo Craft',
      level: 'Beginner',
      description: 'Create practical bamboo items like baskets, trays, and storage utilities.',
      image: 'https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 13,
      title: 'Bamboo Equipment Making',
      category: 'Bamboo Craft',
      level: 'Intermediate',
      description: 'Learn to craft bamboo tools and basic rural equipment with strong joinery methods.',
      image: 'https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 7,
      status: 'Not started',
    },
    {
      id: 14,
      title: 'Home Decor Handicrafts',
      category: 'Handicrafts',
      level: 'Beginner',
      description: 'Make decorative handmade products for homes, stalls, and local exhibitions.',
      image: 'https://images.pexels.com/photos/6444255/pexels-photo-6444255.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 15,
      title: 'Waste to Best Projects',
      category: 'Waste Management',
      level: 'Intermediate',
      description: 'Turn household and farm waste into useful products with market-ready project ideas.',
      image: 'https://images.pexels.com/photos/9324332/pexels-photo-9324332.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 6,
      status: 'Not started',
    },
    {
      id: 16,
      title: 'Recycled Decor Products',
      category: 'Handicrafts',
      level: 'Intermediate',
      description: 'Develop decorative items from recycled material and package them for sale.',
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 17,
      title: 'Hand-Painted Pots & Planters',
      category: 'Pottery',
      level: 'Advanced',
      description: 'Learn finishing and painting techniques to create high-value decorative pots.',
      image: 'https://images.pexels.com/photos/3094229/pexels-photo-3094229.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 4,
      status: 'Not started',
    },
    {
      id: 18,
      title: 'Local Craft Branding',
      category: 'Designing',
      level: 'Advanced',
      description: 'Build product identity, labels, and a visual style for your craft business.',
      image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 4,
      status: 'Not started',
    },
    {
      id: 19,
      title: 'Clothes Designing Fundamentals',
      category: 'Designing',
      level: 'Beginner',
      description: 'Learn basic garment styling, color combinations, and practical clothing design workflows.',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 6,
      status: 'Not started',
    },
    {
      id: 20,
      title: 'Drawing Essentials',
      category: 'Creative Arts',
      level: 'Beginner',
      description: 'Build confidence in line work, shading, composition, and observation-based drawing.',
      image: 'https://images.pexels.com/photos/4442040/pexels-photo-4442040.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 21,
      title: 'Sketching for Product Ideas',
      category: 'Creative Arts',
      level: 'Intermediate',
      description: 'Create quick and clear concept sketches for craft products and decor items.',
      image: 'https://images.pexels.com/photos/209151/pexels-photo-209151.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 4,
      status: 'Not started',
    },
    {
      id: 22,
      title: 'Plantation Basics',
      category: 'Agriculture',
      level: 'Beginner',
      description: 'Learn practical plantation planning, spacing, watering, and crop care by season.',
      image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 23,
      title: 'Home Decor Styling',
      category: 'Handicrafts',
      level: 'Intermediate',
      description: 'Design and style affordable home decor using local materials and handmade products.',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 24,
      title: 'Kitchen Gardening',
      category: 'Gardening',
      level: 'Beginner',
      description: 'Start a home kitchen garden with easy setups for vegetables, herbs, and seasonal plants.',
      image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 25,
      title: 'Organic Terrace Gardening',
      category: 'Gardening',
      level: 'Intermediate',
      description: 'Grow food in terrace spaces with compost, containers, and low-cost irrigation methods.',
      image: 'https://images.pexels.com/photos/4505160/pexels-photo-4505160.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 6,
      status: 'Not started',
    },
    {
      id: 26,
      title: 'Digital Literacy for Creators',
      category: 'Technical Skills',
      level: 'Beginner',
      description: 'Understand smartphones, apps, online safety, and cloud basics for everyday work.',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 4,
      status: 'Not started',
    },
    {
      id: 27,
      title: 'Basic Video Editing on Mobile',
      category: 'Technical Skills',
      level: 'Intermediate',
      description: 'Edit clear short videos on mobile using cuts, transitions, captions, and music.',
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 28,
      title: 'Communication & Confidence',
      category: 'Soft Skills',
      level: 'Beginner',
      description: 'Improve speaking clarity, listening, confidence, and day-to-day professional behavior.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 4,
      status: 'Not started',
    },
    {
      id: 29,
      title: 'Teamwork & Problem Solving',
      category: 'Soft Skills',
      level: 'Intermediate',
      description: 'Practice decision-making, collaboration, and practical problem-solving in real scenarios.',
      image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 4,
      status: 'Not started',
    },
    {
      id: 30,
      title: 'Content Creation for Beginners',
      category: 'Content Creation',
      level: 'Beginner',
      description: 'Plan simple educational and craft content for social media with consistency.',
      image: 'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 31,
      title: 'How to Make Better Videos',
      category: 'Content Creation',
      level: 'Intermediate',
      description: 'Learn framing, lighting, sound, and storytelling to make better short-form videos.',
      image: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 6,
      status: 'Not started',
    },
    {
      id: 32,
      title: 'Educational Content Strategy',
      category: 'Content Creation',
      level: 'Advanced',
      description: 'Create a content roadmap for skills education, growth tracking, and audience retention.',
      image: 'https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
  ];

  const hiTitleMap = {
    'Crop Cultivation': 'फसल उत्पादन',
    'Soil Health Management': 'मिट्टी स्वास्थ्य प्रबंधन',
    'Organic Farming': 'जैविक खेती',
    'Seed Preservation': 'बीज संरक्षण',
    'Composting Basics': 'कंपोस्टिंग बेसिक्स',
    'Upcycling Crafts': 'अपसाइक्लिंग क्राफ्ट्स',
    'Water Saving Methods': 'जल बचत के तरीके',
    'Rural Compost Economics': 'ग्रामीण कंपोस्ट अर्थशास्त्र',
    'Handmade Product Designing': 'हैंडमेड प्रोडक्ट डिज़ाइनिंग',
    'Clay Pottery Basics': 'मिट्टी के बर्तनों की मूल बातें',
    'Mud Utensils Craft': 'मिट्टी के बर्तन शिल्प',
    'Bamboo Utility Products': 'बांस उपयोगी उत्पाद',
    'Bamboo Equipment Making': 'बांस उपकरण निर्माण',
    'Home Decor Handicrafts': 'होम डेकोर हस्तशिल्प',
    'Waste to Best Projects': 'वेस्ट टू बेस्ट प्रोजेक्ट्स',
    'Recycled Decor Products': 'रिसाइकल्ड डेकोर उत्पाद',
    'Hand-Painted Pots & Planters': 'हैंड-पेंटेड पॉट्स और प्लांटर्स',
    'Local Craft Branding': 'लोकल क्राफ्ट ब्रांडिंग',
    'Clothes Designing Fundamentals': 'कपड़ा डिजाइनिंग मूल सिद्धांत',
    'Drawing Essentials': 'ड्रॉइंग मूल सिद्धांत',
    'Sketching for Product Ideas': 'प्रोडक्ट आइडिया स्केचिंग',
    'Plantation Basics': 'रोपण मूल बातें',
    'Home Decor Styling': 'होम डेकोर स्टाइलिंग',
    'Kitchen Gardening': 'किचन गार्डनिंग',
    'Organic Terrace Gardening': 'जैविक टैरेस गार्डनिंग',
    'Digital Literacy for Creators': 'क्रिएटर्स के लिए डिजिटल साक्षरता',
    'Basic Video Editing on Mobile': 'मोबाइल वीडियो एडिटिंग बेसिक्स',
    'Communication & Confidence': 'कम्युनिकेशन और कॉन्फिडेंस',
    'Teamwork & Problem Solving': 'टीमवर्क और समस्या समाधान',
    'Content Creation for Beginners': 'शुरुआती के लिए कंटेंट क्रिएशन',
    'How to Make Better Videos': 'बेहतर वीडियो कैसे बनाएं',
    'Educational Content Strategy': 'शैक्षिक कंटेंट रणनीति',
  };

  const urTitleMap = {
    'Crop Cultivation': 'فصل کی کاشت',
    'Soil Health Management': 'مٹی کی صحت کا انتظام',
    'Organic Farming': 'نامیاتی کھیتی',
    'Seed Preservation': 'بیج کا تحفظ',
    'Composting Basics': 'کمپوسٹنگ کی بنیادیات',
    'Upcycling Crafts': 'اپ سائیکلنگ ہنر',
    'Water Saving Methods': 'پانی بچانے کے طریقے',
    'Rural Compost Economics': 'دیہی کمپوسٹ معیشت',
    'Handmade Product Designing': 'ہاتھ سے بنی مصنوعات کی ڈیزائننگ',
    'Clay Pottery Basics': 'مٹی کے برتن کی بنیادیات',
    'Mud Utensils Craft': 'مٹی کے برتن ہنر',
    'Bamboo Utility Products': 'بانس کے کارآمد مصنوعات',
    'Bamboo Equipment Making': 'بانس کے آلات کی تیاری',
    'Home Decor Handicrafts': 'گھر کی سجاوٹ دستکاری',
    'Waste to Best Projects': 'فضلے سے بہترین منصوبے',
    'Recycled Decor Products': 'ری سائیکلڈ ڈیکور مصنوعات',
    'Hand-Painted Pots & Planters': 'ہاتھ سے رنگے گملے اور پلانٹرز',
    'Local Craft Branding': 'مقامی ہنر برانڈنگ',
    'Clothes Designing Fundamentals': 'کپڑوں کی ڈیزائننگ بنیادیات',
    'Drawing Essentials': 'ڈرائنگ کی بنیادیات',
    'Sketching for Product Ideas': 'مصنوعات کے خیالات کے لیے اسکیچنگ',
    'Plantation Basics': 'پودا کاری کی بنیادیات',
    'Home Decor Styling': 'گھر کی سجاوٹ اسٹائلنگ',
    'Kitchen Gardening': 'کچن باغبانی',
    'Organic Terrace Gardening': 'نامیاتی ٹیرس باغبانی',
    'Digital Literacy for Creators': 'کریئیٹرز کے لیے ڈیجیٹل خواندگی',
    'Basic Video Editing on Mobile': 'موبائل پر بنیادی ویڈیو ایڈیٹنگ',
    'Communication & Confidence': 'ابلاغ اور اعتماد',
    'Teamwork & Problem Solving': 'ٹیم ورک اور مسئلہ حل',
    'Content Creation for Beginners': 'ابتدائی افراد کے لیے مواد تخلیق',
    'How to Make Better Videos': 'بہتر ویڈیوز کیسے بنائیں',
    'Educational Content Strategy': 'تعلیمی مواد کی حکمت عملی',
  };

  const uiTextByLanguage = {
    en: {
      headerDesc: 'Explore practical skills with structured videos, adaptive testing, and real assignments.',
      voiceSearch: 'Voice Search',
      emptyState: 'No skills match your current search or filters.',
      descriptionTemplate: (title) => `${title} with structured modules, practical tasks, and real outcomes.`,
    },
    hi: {
      headerDesc: 'संरचित वीडियो, अनुकूली टेस्ट और वास्तविक असाइनमेंट के साथ व्यावहारिक कौशल सीखें।',
      voiceSearch: 'वॉइस सर्च',
      emptyState: 'आपकी खोज या फ़िल्टर से मेल खाने वाला कोई कौशल नहीं मिला।',
      descriptionTemplate: (title) => `${title} सीखें - संरचित मॉड्यूल, प्रैक्टिकल टास्क और वास्तविक परिणाम के साथ।`,
    },
    ur: {
      headerDesc: 'منظم ویڈیوز، اڈاپٹو ٹیسٹنگ اور حقیقی اسائنمنٹس کے ساتھ عملی مہارتیں سیکھیں۔',
      voiceSearch: 'وائس سرچ',
      emptyState: 'آپ کی تلاش یا فلٹر کے مطابق کوئی مہارت نہیں ملی۔',
      descriptionTemplate: (title) => `${title} سیکھیے - منظم ماڈیولز، عملی مشق اور حقیقی نتائج کے ساتھ۔`,
    },
  };

  const uiText = uiTextByLanguage[language] || uiTextByLanguage.hi;

  const categoryLabelMap = {
    'Agriculture': language === 'en' ? 'Agriculture' : language === 'ur' ? 'زراعت' : 'कृषि',
    'Waste Management': language === 'en' ? 'Waste Management' : language === 'ur' ? 'فضلہ انتظام' : 'कचरा प्रबंधन',
    'Designing': language === 'en' ? 'Designing' : language === 'ur' ? 'ڈیزائننگ' : 'डिजाइनिंग',
    'Pottery': language === 'en' ? 'Pottery' : language === 'ur' ? 'مٹی کے برتن' : 'मिट्टी शिल्प',
    'Bamboo Craft': language === 'en' ? 'Bamboo Craft' : language === 'ur' ? 'بانس ہنر' : 'बांस शिल्प',
    'Handicrafts': language === 'en' ? 'Handicrafts' : language === 'ur' ? 'دستکاری' : 'हस्तशिल्प',
    'Gardening': language === 'en' ? 'Gardening' : language === 'ur' ? 'باغبانی' : 'बागवानी',
    'Technical Skills': language === 'en' ? 'Technical Skills' : language === 'ur' ? 'تکنیکی مہارتیں' : 'तकनीकी कौशल',
    'Soft Skills': language === 'en' ? 'Soft Skills' : language === 'ur' ? 'نرم مہارتیں' : 'सॉफ्ट स्किल्स',
    'Content Creation': language === 'en' ? 'Content Creation' : language === 'ur' ? 'مواد تخلیق' : 'कंटेंट क्रिएशन',
    'Creative Arts': language === 'en' ? 'Creative Arts' : language === 'ur' ? 'تخلیقی فنون' : 'रचनात्मक कला',
  };

  const localizedSkills = skills.map((skill) => {
    const localizedTitle =
      language === 'en'
        ? skill.title
        : language === 'ur'
          ? (urTitleMap[skill.title] || skill.title)
          : (hiTitleMap[skill.title] || skill.title);
    return {
      ...skill,
      localizedTitle,
      localizedCategory: categoryLabelMap[skill.category] || skill.category,
      localizedLevel: language === 'en' ? skill.level : t(skill.level.toLowerCase()),
      localizedDescription: language === 'en' ? skill.description : uiText.descriptionTemplate(localizedTitle),
    };
  });

  useEffect(() => {
    const activeSkill = localizedSkills.find((skill) => skill.id === activeSkillId) || localizedSkills[0];
    if (activeSkill) {
      setCurrentSkill(activeSkill.localizedTitle);
    }
  }, [language]);

  const categories = ['All', ...new Set(localizedSkills.map((skill) => skill.localizedCategory))];
  const levels = ['All', ...new Set(skills.map((skill) => skill.level))];

  const stats = [
    { label: t('overallProgress'), value: summary.overallProgress },
    { label: t('skillsCompleted'), value: summary.skillsCompleted },
    { label: t('certificates'), value: summary.certificates },
    { label: t('points'), value: summary.points },
  ];

  const filteredSkills = localizedSkills.filter((skill) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      skill.localizedTitle.toLowerCase().includes(query) ||
      skill.localizedDescription.toLowerCase().includes(query);
    const matchesCategory = categoryFilter === 'All' || skill.localizedCategory === categoryFilter;
    const matchesLevel = levelFilter === 'All' || skill.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <section className="skill-page">
      <div className="skill-header">
        <h1>{t('learningHub')}</h1>
        <p>{uiText.headerDesc}</p>

        <div className="skill-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-track">
                <span className="stat-value">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="continue-learning-btn">
          {t('continueSkill')}: {currentSkill}
        </button>
      </div>

      <div className="explore-skills">
        <h2>{t('learningHub')}</h2>

        <div className="skill-controls">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder={t('searchSkills')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="skill-search"
            />
          </div>

          <div className="skill-filters">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'All' ? t('all') : category}
                </option>
              ))}
            </select>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="filter-select"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === 'All' ? t('allLevels') : t(level.toLowerCase())}
                </option>
              ))}
            </select>

            <button className="voice-search-btn">
              <Mic size={16} /> {uiText.voiceSearch}
            </button>
          </div>
        </div>

        <div className="skill-grid">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="skill-card">
              <div className="skill-image-container">
                <img
                  src={skill.image}
                  alt={skill.title}
                  className="skill-image"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackSkillImage;
                  }}
                />
              </div>

              <div className="skill-content">
                <h3 className="skill-title">{skill.localizedTitle}</h3>
                <p className="skill-meta">
                  {skill.localizedCategory} • {skill.localizedLevel}
                </p>
                <p className="skill-description">{skill.localizedDescription}</p>

                <div className="progress-section">
                  <div className="progress-header">
                    <span className="progress-label">{t('overallProgress')}</span>
                    <span className="progress-value">{skill.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="skill-info">
                  <span className="module-count">▦ {skill.modules} {t('skillModules')}</span>
                  <span className="module-status">◉ {skill.status === 'In progress' ? t('inProgress') : t('notStarted')}</span>
                </div>

                <button
                  type="button"
                  className="open-skill-btn"
                  onClick={() => handleStartLearning(skill)}
                >
                  {activeSkillId === skill.id ? t('learningStarted') : t('startLearning')}
                </button>
              </div>
            </div>
          ))}

          {filteredSkills.length === 0 ? (
            <div className="skill-empty-state">
              <p>{uiText.emptyState}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Skill;
