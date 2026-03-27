import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Minus, Plus, Send, X } from 'lucide-react';
import RobotAvatar from './RobotAvatar';
import { useLanguage } from '../contexts/LanguageContext';
import './ChatbotWidget.css';

const CHATBOT_COPY = {
  en: {
    intro: 'Hi, I am KachraBeche Assistant. Ask me about pickup, gifts, profile, or any website help.',
    helperTag: 'How can I help you?',
    panelLabel: 'Website chatbot',
    closeLabel: 'Close chatbot',
    addAttachmentLabel: 'Add attachment',
    sendMessageLabel: 'Send message',
    openChatbotLabel: 'Open chatbot',
    showcaseTitle: 'Hey there! 👋',
    showcaseSub: 'Need a boost?',
    inputPlaceholder: 'Type your query...',
    quickQuestions: [
      'How to submit waste?',
      'How do rewards work?',
      'How to contact support?',
      'Where can I upload photos?',
    ],
    replies: {
      waste: 'Go to Waste Input, fill your pickup information, select waste type and weight, then click Add Entry.',
      rewards: 'Rewards are based on your total recycled weight. Open Incentives to explore available reward items.',
      photos: 'Use Upload Photos in Your Contribution. You can also assign a photo to each entry before submitting.',
      profile: 'Open Profile from the navbar to see your activity, stats, and account details.',
      support: 'Please use the Contact page for direct support. You can share your issue and our team will reach out.',
      fallback: 'I can help with Your Contribution, rewards, incentives, profile, and support. Tell me what you need.',
    },
    keywords: {
      waste: ['waste', 'submit', 'pickup', 'contribution'],
      rewards: ['reward', 'gift', 'incentive'],
      photos: ['photo', 'image', 'upload'],
      profile: ['profile', 'dashboard'],
      support: ['contact', 'support', 'help'],
    },
  },
  hi: {
    intro: 'नमस्ते, मैं KachraBeche Assistant हूं। आप पिकअप, प्रोत्साहन, प्रोफाइल या वेबसाइट सहायता के बारे में पूछ सकते हैं।',
    helperTag: 'मैं आपकी कैसे मदद करूं?',
    panelLabel: 'वेबसाइट चैटबॉट',
    closeLabel: 'चैटबॉट बंद करें',
    addAttachmentLabel: 'अटैचमेंट जोड़ें',
    sendMessageLabel: 'संदेश भेजें',
    openChatbotLabel: 'चैटबॉट खोलें',
    showcaseTitle: 'नमस्ते! 👋',
    showcaseSub: 'मदद चाहिए?',
    inputPlaceholder: 'अपना प्रश्न लिखें...',
    quickQuestions: ['कचरा कैसे जमा करें?', 'रिवॉर्ड कैसे मिलते हैं?', 'सपोर्ट से कैसे संपर्क करें?', 'फोटो कहां अपलोड करें?'],
    replies: {
      waste: 'Your Contribution पेज पर जाएं, पिकअप जानकारी भरें, कचरे का प्रकार और वजन चुनें, फिर Add Entry पर क्लिक करें।',
      rewards: 'रिवॉर्ड आपके कुल रीसाइकल वजन पर आधारित होते हैं। Incentives पेज पर उपलब्ध रिवॉर्ड देखें।',
      photos: 'Your Contribution में Upload Photos का उपयोग करें। सबमिट करने से पहले आप हर एंट्री के साथ फोटो जोड़ सकते हैं।',
      profile: 'अपनी गतिविधि, आँकड़े और खाता विवरण देखने के लिए navbar से Profile खोलें।',
      support: 'सीधे सहायता के लिए Contact पेज का उपयोग करें। अपनी समस्या साझा करें, हमारी टीम आपसे संपर्क करेगी।',
      fallback: 'मैं Your Contribution, रिवॉर्ड, प्रोत्साहन, प्रोफाइल और सपोर्ट में मदद कर सकता हूं। बताइए क्या चाहिए।',
    },
    keywords: {
      waste: ['कचरा', 'जमा', 'पिकअप', 'योगदान'],
      rewards: ['रिवॉर्ड', 'उपहार', 'प्रोत्साहन', 'इनसेंटिव'],
      photos: ['फोटो', 'इमेज', 'अपलोड', 'चित्र'],
      profile: ['प्रोफाइल', 'डैशबोर्ड'],
      support: ['संपर्क', 'सहायता', 'मदद', 'सपोर्ट'],
    },
  },
  mr: {
    intro: 'नमस्कार, मी KachraBeche Assistant आहे. पिकअप, प्रोत्साहन, प्रोफाइल किंवा वेबसाइट मदतीबद्दल विचारा.',
    helperTag: 'मी कशी मदत करू?',
    panelLabel: 'वेबसाइट चॅटबॉट',
    closeLabel: 'चॅटबॉट बंद करा',
    addAttachmentLabel: 'फाइल जोडा',
    sendMessageLabel: 'संदेश पाठवा',
    openChatbotLabel: 'चॅटबॉट उघडा',
    showcaseTitle: 'हाय! 👋',
    showcaseSub: 'मदत हवी आहे का?',
    inputPlaceholder: 'तुमचा प्रश्न लिहा...',
    quickQuestions: ['कचरा कसा सबमिट करायचा?', 'रिवॉर्ड कसे काम करतात?', 'सपोर्टशी संपर्क कसा करायचा?', 'फोटो कुठे अपलोड करायचे?'],
    replies: {
      waste: 'Your Contribution पेजवर जा, पिकअप माहिती भरा, कचऱ्याचा प्रकार आणि वजन निवडा, नंतर Add Entry क्लिक करा.',
      rewards: 'रिवॉर्ड तुमच्या एकूण पुनर्वापर वजनावर आधारित असतात. उपलब्ध रिवॉर्डसाठी Incentives पेज उघडा.',
      photos: 'Your Contribution मध्ये Upload Photos वापरा. सबमिट करण्यापूर्वी प्रत्येक एंट्रीला फोटो जोडू शकता.',
      profile: 'तुमची activity, stats आणि account तपशील पाहण्यासाठी navbar मधून Profile उघडा.',
      support: 'थेट मदतीसाठी Contact पेज वापरा. तुमची समस्या शेअर करा, टीम संपर्क करेल.',
      fallback: 'मी Your Contribution, rewards, incentives, profile आणि support मध्ये मदत करू शकतो. काय हवे ते सांगा.',
    },
    keywords: {
      waste: ['कचरा', 'सबमिट', 'पिकअप', 'योगदान'],
      rewards: ['रिवॉर्ड', 'गिफ्ट', 'प्रोत्साहन'],
      photos: ['फोटो', 'इमेज', 'अपलोड', 'चित्र'],
      profile: ['प्रोफाइल', 'डॅशबोर्ड'],
      support: ['संपर्क', 'मदत', 'सपोर्ट'],
    },
  },
  ur: {
    intro: 'ہیلو، میں KachraBeche Assistant ہوں۔ پیک اپ، ترغیبات، پروفائل یا ویب سائٹ مدد کے بارے میں پوچھیں۔',
    helperTag: 'میں آپ کی کیسے مدد کروں؟',
    panelLabel: 'ویب سائٹ چیٹ بوٹ',
    closeLabel: 'چیٹ بوٹ بند کریں',
    addAttachmentLabel: 'اٹیچمنٹ شامل کریں',
    sendMessageLabel: 'پیغام بھیجیں',
    openChatbotLabel: 'چیٹ بوٹ کھولیں',
    showcaseTitle: 'ہیلو! 👋',
    showcaseSub: 'مدد چاہیے؟',
    inputPlaceholder: 'اپنا سوال لکھیں...',
    quickQuestions: ['فضلہ کیسے جمع کریں؟', 'انعامات کیسے کام کرتے ہیں؟', 'سپورٹ سے رابطہ کیسے کریں؟', 'تصاویر کہاں اپلوڈ کریں؟'],
    replies: {
      waste: 'Your Contribution صفحہ کھولیں، پیک اپ معلومات بھریں، فضلے کی قسم اور وزن منتخب کریں، پھر Add Entry دبائیں۔',
      rewards: 'انعامات آپ کے کل ری سائیکل وزن پر مبنی ہیں۔ دستیاب انعامات کے لیے Incentives کھولیں۔',
      photos: 'Your Contribution میں Upload Photos استعمال کریں۔ جمع کرانے سے پہلے ہر اندراج کے ساتھ تصویر لگ سکتی ہے۔',
      profile: 'اپنی سرگرمی، اعدادوشمار اور اکاؤنٹ تفصیل کے لیے navbar سے Profile کھولیں۔',
      support: 'براہِ راست مدد کے لیے Contact صفحہ استعمال کریں۔ مسئلہ شیئر کریں، ہماری ٹیم رابطہ کرے گی۔',
      fallback: 'میں Your Contribution، rewards، incentives، profile اور support میں مدد کر سکتا ہوں۔ بتائیں آپ کو کیا چاہیے۔',
    },
    keywords: {
      waste: ['فضلہ', 'جمع', 'پک اپ', 'تعاون'],
      rewards: ['انعام', 'گفٹ', 'ترغیبات'],
      photos: ['تصویر', 'امیج', 'اپلوڈ', 'فوٹو'],
      profile: ['پروفائل', 'ڈیش بورڈ'],
      support: ['رابطہ', 'سپورٹ', 'مدد'],
    },
  },
  bn: {
    intro: 'হ্যালো, আমি KachraBeche Assistant। পিকআপ, প্রণোদনা, প্রোফাইল বা ওয়েবসাইট সহায়তা সম্পর্কে জিজ্ঞাসা করুন।',
    helperTag: 'আমি কীভাবে সাহায্য করতে পারি?',
    panelLabel: 'ওয়েবসাইট চ্যাটবট',
    closeLabel: 'চ্যাটবট বন্ধ করুন',
    addAttachmentLabel: 'অ্যাটাচমেন্ট যোগ করুন',
    sendMessageLabel: 'বার্তা পাঠান',
    openChatbotLabel: 'চ্যাটবট খুলুন',
    showcaseTitle: 'হাই! 👋',
    showcaseSub: 'সাহায্য লাগবে?',
    inputPlaceholder: 'আপনার প্রশ্ন লিখুন...',
    quickQuestions: ['বর্জ্য কীভাবে জমা দেব?', 'রিওয়ার্ড কীভাবে কাজ করে?', 'সাপোর্টে কীভাবে যোগাযোগ করব?', 'ছবি কোথায় আপলোড করব?'],
    replies: {
      waste: 'Your Contribution পেজে যান, পিকআপ তথ্য দিন, বর্জ্যের ধরন ও ওজন বাছুন, তারপর Add Entry ক্লিক করুন।',
      rewards: 'রিওয়ার্ড আপনার মোট রিসাইকেল ওজনের উপর নির্ভর করে। Incentives পেজে রিওয়ার্ড দেখুন।',
      photos: 'Your Contribution এ Upload Photos ব্যবহার করুন। সাবমিট করার আগে প্রতিটি এন্ট্রিতে ছবি যোগ করতে পারবেন।',
      profile: 'আপনার activity, stats ও account দেখতে navbar থেকে Profile খুলুন।',
      support: 'সরাসরি সহায়তার জন্য Contact পেজ ব্যবহার করুন। আপনার সমস্যা লিখুন, টিম যোগাযোগ করবে।',
      fallback: 'আমি Your Contribution, rewards, incentives, profile এবং support নিয়ে সাহায্য করতে পারি। কী জানতে চান বলুন।',
    },
    keywords: {
      waste: ['বর্জ্য', 'জমা', 'পিকআপ', 'অবদান'],
      rewards: ['রিওয়ার্ড', 'উপহার', 'প্রণোদনা'],
      photos: ['ছবি', 'ইমেজ', 'আপলোড', 'ফটো'],
      profile: ['প্রোফাইল', 'ড্যাশবোর্ড'],
      support: ['যোগাযোগ', 'সাপোর্ট', 'সাহায্য'],
    },
  },
};

function createBotIntro(text) {
  return {
    id: 1,
    from: 'bot',
    text,
  };
}

function getBotReply(message, copy) {
  const text = message.toLowerCase();
  const { keywords, replies } = copy;

  if (keywords.waste.some((keyword) => text.includes(keyword))) return replies.waste;
  if (keywords.rewards.some((keyword) => text.includes(keyword))) return replies.rewards;
  if (keywords.photos.some((keyword) => text.includes(keyword))) return replies.photos;
  if (keywords.profile.some((keyword) => text.includes(keyword))) return replies.profile;
  if (keywords.support.some((keyword) => text.includes(keyword))) return replies.support;

  return replies.fallback;
}

export default function ChatbotWidget() {
  const { language } = useLanguage();
  const copy = CHATBOT_COPY[language] || CHATBOT_COPY.en;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => [createBotIntro(copy.intro)]);

  useEffect(() => {
    setMessages([createBotIntro(copy.intro)]);
    setInput('');
  }, [copy.intro]);

  const quickQuestionButtons = useMemo(() => copy.quickQuestions, [copy.quickQuestions]);

  const sendMessage = (rawText) => {
    const messageText = (rawText ?? input).trim();
    if (!messageText) return;

    const userMessage = {
      id: Date.now(),
      from: 'user',
      text: messageText,
    };

    const botMessage = {
      id: Date.now() + 1,
      from: 'bot',
      text: getBotReply(messageText, copy),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="chatbot-root">
      {isOpen && (
        <section className="chatbot-panel" aria-label={copy.panelLabel}>
          <header className="chatbot-header">
            <div className="chatbot-title-wrap">
              <span className="chatbot-window-dot dot-red" aria-hidden="true" />
              <span className="chatbot-window-dot dot-yellow" aria-hidden="true" />
              <span className="chatbot-window-dot dot-green" aria-hidden="true" />
            </div>
            <div className="chatbot-window-actions" aria-hidden="true">
              <Minus size={16} />
              <button type="button" onClick={() => setIsOpen(false)} aria-label={copy.closeLabel}>
                <X size={16} />
              </button>
            </div>
          </header>

          <div className="chatbot-showcase" aria-hidden="true">
            <div className="chatbot-showcase-bubble">
              <p>{copy.showcaseTitle}</p>
              <span>{copy.showcaseSub}</span>
            </div>
            <div className="chatbot-showcase-robot">
              <RobotAvatar size={142} />
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <article key={message.id} className={`chat-msg ${message.from === 'user' ? 'user' : 'bot'}`}>
                {message.text}
              </article>
            ))}
          </div>

          <div className="chatbot-quick-actions">
            {quickQuestionButtons.map((question) => (
              <button key={question} type="button" onClick={() => sendMessage(question)}>
                {question}
              </button>
            ))}
          </div>

          <form
            className="chatbot-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <button type="button" className="chatbot-input-plus" aria-label={copy.addAttachmentLabel}>
              <Plus size={16} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={copy.inputPlaceholder}
            />
            <button type="submit" className="chatbot-send-btn" aria-label={copy.sendMessageLabel}>
              <Send size={16} />
            </button>
          </form>
        </section>
      )}

      {!isOpen && <p className="chatbot-helper-tag">{copy.helperTag}</p>}

      <button
        type="button"
        className="chatbot-toggle"
        aria-label={copy.openChatbotLabel}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <RobotAvatar size={32} />
      </button>
    </div>,
    document.body,
  );
}
