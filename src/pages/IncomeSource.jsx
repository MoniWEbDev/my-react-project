import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Weight, Gift, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './IncomeSource.css';

const IncomeSource = () => {
  const WASTE_TYPE_KEYS = ['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'E-Waste', 'Textile', 'Rubber', 'Battery', 'Cardboard', 'Aluminium', 'Mixed Dry Waste'];
  const { language } = useLanguage();
  let copy = language === 'en'
    ? {
        wasteTypeLabels: {
          Plastic: 'Plastic', Paper: 'Paper', Metal: 'Metal', Glass: 'Glass', Organic: 'Organic', 'E-Waste': 'E-Waste', Textile: 'Textile', Rubber: 'Rubber', Battery: 'Battery', Cardboard: 'Cardboard', Aluminium: 'Aluminium', 'Mixed Dry Waste': 'Mixed Dry Waste',
        },
        pageTitle: 'Waste Input',
        pageSubtitle: 'Add household waste manually or upload photos from your phone gallery or camera.',
        bannerTitle: 'Smart Pickup In Your Area',
        bannerSubtitle: 'Schedule doorstep collection and track how your waste moves from pickup to recycling.',
        schedulePickup: 'Schedule Pickup',
        editingNote: 'Editing mode is active for one entry.',
        weightPlaceholder: 'Weight (kg)',
        saveChanges: 'Save Changes',
        addEntry: 'Add Entry',
        cancelEdit: 'Cancel Edit',
        mediaTitle: 'Add Photos or Videos',
        mediaSubtitle: 'Upload clear photos or an optional short video to improve pickup verification.',
        addEntryImage: 'Add Entry Image',
        addEntryVideo: 'Add Entry Video (Optional)',
        photoLabel: 'Photo',
        videoLabel: 'Video',
        selectedImage: 'Selected image',
        selectedVideo: 'Selected video',
        pickupInfoTitle: 'Pickup Information',
        pickupInfoText: 'Add your contact and address details for doorstep scrap pickup.',
        fullName: 'Full Name',
        phoneNumber: 'Phone Number',
        confirmPhone: 'Confirm Phone Number',
        pinCode: 'PIN Code',
        block: 'Block',
        village: 'Village',
        addressPlaceholder: 'House no, street, area',
        uploadPhotos: 'Upload Photos',
        totalSubmitted: 'Total submitted',
        uploadedPhotos: 'Uploaded Photos',
        useForEntry: 'Use For Entry',
        recentEntries: 'Recent Entries',
        noImage: 'No image',
        noMedia: 'No media attached',
        edit: 'Edit',
        delete: 'Delete',
        rewardsTitle: 'Ready to unlock rewards?',
        rewardsText: 'Your rewards are dynamically calculated based on your total recycled weight.',
        viewGifts: 'View Gifts',
        openDashboard: 'Open Dashboard',
        errChooseImage: 'Please choose an image for the entry photo.',
        errChooseVideo: 'Please choose a valid video file.',
        errRequiredFields: 'Please fill all required fields before submitting.',
        alertRequiredFields: 'Please fill this: complete all required fields.',
        errFullName: 'Please enter full name.',
        errPhone: 'Please enter a valid 10-digit phone number.',
        errPhoneMatch: 'Phone number and confirm phone number must match.',
        errAddress: 'Please enter address.',
        errPickupDate: 'Please select a pickup date.',
        errPastDate: 'Pickup date cannot be in the past.',
        errPin: 'Please enter a valid 6-digit PIN code.',
        errBlockVillage: 'Please enter both block and village details.',
        errWeight: 'Please enter a valid weight greater than 0.',
        alertWeight: 'Please fill this: enter a valid weight.',
        successUpdated: 'Entry updated successfully.',
        successSubmitted: 'Form submitted successfully. Your waste pickup details have been saved.',
        alertSubmitted: 'Successfully submitted. Your waste pickup details have been saved.',
        successEditing: 'Editing selected entry. Update details and click Save Changes.',
        confirmDelete: 'Delete this entry?',
        successDeleted: 'Entry deleted successfully.',
        successCancel: 'Edit canceled.',
        errImagesOnly: 'Please upload image files only.',
        successPickupDetails: 'Fill pickup details and click Add Entry to confirm your pickup request.',
      }
    : {
        wasteTypeLabels: {
          Plastic: 'प्लास्टिक', Paper: 'कागज', Metal: 'धातु', Glass: 'कांच', Organic: 'जैविक', 'E-Waste': 'ई-कचरा', Textile: 'कपड़ा', Rubber: 'रबर', Battery: 'बैटरी', Cardboard: 'कार्डबोर्ड', Aluminium: 'एल्यूमिनियम', 'Mixed Dry Waste': 'मिश्रित सूखा कचरा',
        },
        pageTitle: 'आपका योगदान',
        pageSubtitle: 'घरेलू कचरा मैन्युअली जोड़ें या फोन गैलरी/कैमरा से फोटो अपलोड करें।',
        bannerTitle: 'आपके क्षेत्र में स्मार्ट पिकअप',
        bannerSubtitle: 'डोरस्टेप कलेक्शन शेड्यूल करें और ट्रैक करें कि कचरा कैसे रीसाइक्लिंग तक जाता है।',
        schedulePickup: 'पिकअप शेड्यूल करें',
        editingNote: 'एक एंट्री के लिए एडिट मोड सक्रिय है।',
        weightPlaceholder: 'वजन (किग्रा)',
        saveChanges: 'परिवर्तन सहेजें',
        addEntry: 'एंट्री जोड़ें',
        cancelEdit: 'एडिट रद्द करें',
        mediaTitle: 'फोटो या वीडियो जोड़ें',
        mediaSubtitle: 'पिकअप सत्यापन बेहतर करने के लिए साफ फोटो या छोटा वीडियो अपलोड करें।',
        addEntryImage: 'एंट्री इमेज जोड़ें',
        addEntryVideo: 'एंट्री वीडियो जोड़ें (वैकल्पिक)',
        photoLabel: 'फोटो',
        videoLabel: 'वीडियो',
        selectedImage: 'चयनित इमेज',
        selectedVideo: 'चयनित वीडियो',
        pickupInfoTitle: 'पिकअप जानकारी',
        pickupInfoText: 'डोरस्टेप स्क्रैप पिकअप के लिए संपर्क और पता विवरण जोड़ें।',
        fullName: 'पूरा नाम',
        phoneNumber: 'फोन नंबर',
        confirmPhone: 'फोन नंबर पुनः दर्ज करें',
        pinCode: 'पिन कोड',
        block: 'ब्लॉक',
        village: 'गांव',
        addressPlaceholder: 'मकान नंबर, सड़क, क्षेत्र',
        uploadPhotos: 'फोटो अपलोड करें',
        totalSubmitted: 'कुल जमा',
        uploadedPhotos: 'अपलोड की गई फोटो',
        useForEntry: 'एंट्री में उपयोग करें',
        recentEntries: 'हाल की एंट्री',
        noImage: 'कोई इमेज नहीं',
        noMedia: 'कोई मीडिया नहीं',
        edit: 'एडिट',
        delete: 'हटाएं',
        rewardsTitle: 'रिवॉर्ड अनलॉक करने के लिए तैयार?',
        rewardsText: 'आपके रिवॉर्ड कुल रीसाइकल वजन के आधार पर गणना होते हैं।',
        viewGifts: 'गिफ्ट देखें',
        openDashboard: 'डैशबोर्ड खोलें',
        errChooseImage: 'कृपया एंट्री फोटो के लिए इमेज चुनें।',
        errChooseVideo: 'कृपया सही वीडियो फाइल चुनें।',
        errRequiredFields: 'सबमिट करने से पहले सभी आवश्यक फ़ील्ड भरें।',
        alertRequiredFields: 'कृपया सभी आवश्यक फ़ील्ड भरें।',
        errFullName: 'कृपया पूरा नाम दर्ज करें।',
        errPhone: 'कृपया सही 10-अंकीय फोन नंबर दर्ज करें।',
        errPhoneMatch: 'फोन नंबर और पुष्टि फोन नंबर मेल नहीं खाते।',
        errAddress: 'कृपया पता दर्ज करें।',
        errPickupDate: 'कृपया पिकअप तिथि चुनें।',
        errPastDate: 'पिकअप तिथि पिछली नहीं हो सकती।',
        errPin: 'कृपया सही 6-अंकीय पिन कोड दर्ज करें।',
        errBlockVillage: 'कृपया ब्लॉक और गांव दोनों दर्ज करें।',
        errWeight: 'कृपया 0 से अधिक सही वजन दर्ज करें।',
        alertWeight: 'कृपया सही वजन दर्ज करें।',
        successUpdated: 'एंट्री सफलतापूर्वक अपडेट हुई।',
        successSubmitted: 'फॉर्म सफलतापूर्वक सबमिट हुआ। पिकअप विवरण सहेजे गए।',
        alertSubmitted: 'सफलतापूर्वक सबमिट हुआ।',
        successEditing: 'एंट्री एडिट मोड में है। विवरण अपडेट करें और सहेजें।',
        confirmDelete: 'क्या आप यह एंट्री हटाना चाहते हैं?',
        successDeleted: 'एंट्री सफलतापूर्वक हटाई गई।',
        successCancel: 'एडिट रद्द किया गया।',
        errImagesOnly: 'कृपया केवल इमेज फाइल अपलोड करें।',
        successPickupDetails: 'पिकअप विवरण भरें और Add Entry दबाएं।',
      };

  if (language === 'ur') {
    copy = {
      ...copy,
      wasteTypeLabels: {
        Plastic: 'پلاسٹک',
        Paper: 'کاغذ',
        Metal: 'دھات',
        Glass: 'شیشہ',
        Organic: 'نامیاتی',
        'E-Waste': 'ای ویسٹ',
        Textile: 'کپڑا',
        Rubber: 'ربڑ',
        Battery: 'بیٹری',
        Cardboard: 'کارڈ بورڈ',
        Aluminium: 'ایلومینیم',
        'Mixed Dry Waste': 'مخلوط خشک فضلہ',
      },
      pageTitle: 'آپ کا تعاون',
      pageSubtitle: 'گھریلو فضلہ دستی طور پر شامل کریں یا موبائل گیلری/کیمرہ سے تصاویر اپلوڈ کریں۔',
      bannerTitle: 'آپ کے علاقے میں اسمارٹ پک اپ',
      bannerSubtitle: 'گھر سے کلیکشن شیڈول کریں اور دیکھیں کہ فضلہ ری سائیکلنگ تک کیسے پہنچتا ہے۔',
      schedulePickup: 'پک اپ شیڈول کریں',
      editingNote: 'ایک اندراج کے لیے ایڈیٹنگ موڈ فعال ہے۔',
      weightPlaceholder: 'وزن (کلوگرام)',
      saveChanges: 'تبدیلیاں محفوظ کریں',
      addEntry: 'اندراج شامل کریں',
      cancelEdit: 'ایڈیٹ منسوخ کریں',
      mediaTitle: 'تصاویر یا ویڈیو شامل کریں',
      mediaSubtitle: 'تصدیق بہتر کرنے کے لیے صاف تصاویر یا مختصر ویڈیو اپلوڈ کریں۔',
      addEntryImage: 'اندراج تصویر شامل کریں',
      addEntryVideo: 'اندراج ویڈیو شامل کریں (اختیاری)',
      photoLabel: 'تصویر',
      videoLabel: 'ویڈیو',
      selectedImage: 'منتخب تصویر',
      selectedVideo: 'منتخب ویڈیو',
      pickupInfoTitle: 'پک اپ معلومات',
      pickupInfoText: 'گھر سے اسکریپ پک اپ کے لیے رابطہ اور پتا درج کریں۔',
      fullName: 'پورا نام',
      phoneNumber: 'فون نمبر',
      confirmPhone: 'فون نمبر دوبارہ درج کریں',
      pinCode: 'پن کوڈ',
      block: 'بلاک',
      village: 'گاؤں',
      addressPlaceholder: 'گھر نمبر، گلی، علاقہ',
      uploadPhotos: 'تصاویر اپلوڈ کریں',
      totalSubmitted: 'کل جمع',
      uploadedPhotos: 'اپلوڈ شدہ تصاویر',
      useForEntry: 'اندراج کے لیے استعمال کریں',
      recentEntries: 'حالیہ اندراجات',
      noImage: 'کوئی تصویر نہیں',
      noMedia: 'کوئی میڈیا موجود نہیں',
      edit: 'ایڈیٹ',
      delete: 'حذف کریں',
      rewardsTitle: 'انعامات ان لاک کرنے کے لیے تیار؟',
      rewardsText: 'آپ کے انعامات کل ری سائیکل وزن کی بنیاد پر حساب ہوتے ہیں۔',
      viewGifts: 'گفٹس دیکھیں',
      openDashboard: 'ڈیش بورڈ کھولیں',
      errChooseImage: 'براہِ کرم اندراج کے لیے تصویر منتخب کریں۔',
      errChooseVideo: 'براہِ کرم درست ویڈیو فائل منتخب کریں۔',
      errRequiredFields: 'جمع کرانے سے پہلے تمام ضروری خانے پُر کریں۔',
      alertRequiredFields: 'براہِ کرم تمام ضروری خانے پُر کریں۔',
      errFullName: 'براہِ کرم پورا نام درج کریں۔',
      errPhone: 'براہِ کرم درست 10 ہندسوں کا فون نمبر درج کریں۔',
      errPhoneMatch: 'فون نمبر اور تصدیقی فون نمبر ایک جیسے نہیں ہیں۔',
      errAddress: 'براہِ کرم پتا درج کریں۔',
      errPickupDate: 'براہِ کرم پک اپ تاریخ منتخب کریں۔',
      errPastDate: 'پک اپ تاریخ ماضی کی نہیں ہو سکتی۔',
      errPin: 'براہِ کرم درست 6 ہندسوں کا پن کوڈ درج کریں۔',
      errBlockVillage: 'براہِ کرم بلاک اور گاؤں دونوں درج کریں۔',
      errWeight: 'براہِ کرم 0 سے زیادہ درست وزن درج کریں۔',
      alertWeight: 'براہِ کرم درست وزن درج کریں۔',
      successUpdated: 'اندراج کامیابی سے اپڈیٹ ہوگیا۔',
      successSubmitted: 'فارم کامیابی سے جمع ہوگیا۔ آپ کی پک اپ معلومات محفوظ ہوگئیں۔',
      alertSubmitted: 'کامیابی سے جمع ہوگیا۔',
      successEditing: 'اندراج ایڈیٹنگ موڈ میں ہے۔ تفصیل اپڈیٹ کریں اور محفوظ کریں۔',
      confirmDelete: 'کیا آپ یہ اندراج حذف کرنا چاہتے ہیں؟',
      successDeleted: 'اندراج کامیابی سے حذف ہوگیا۔',
      successCancel: 'ایڈیٹ منسوخ ہوگیا۔',
      errImagesOnly: 'براہِ کرم صرف تصویر فائلیں اپلوڈ کریں۔',
      successPickupDetails: 'پک اپ تفصیلات پُر کریں اور Add Entry پر کلک کریں۔',
    };
  }

  const wasteTypeOptions = WASTE_TYPE_KEYS.map((value) => ({ value, label: copy.wasteTypeLabels[value] || value }));

  const [wasteType, setWasteType] = useState('Plastic');
  const [weight, setWeight] = useState('');
  const [entries, setEntries] = useState([
    { id: 1, type: 'Plastic', weight: 5, photoUrl: '', photoName: '', videoUrl: '', videoName: '' },
    { id: 2, type: 'Paper', weight: 7, photoUrl: '', photoName: '', videoUrl: '', videoName: '' },
    { id: 3, type: 'Organic', weight: 4, photoUrl: '', photoName: '', videoUrl: '', videoName: '' },
  ]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [entryPhoto, setEntryPhoto] = useState(null);
  const [entryVideo, setEntryVideo] = useState(null);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [newEntryAdded, setNewEntryAdded] = useState(false);
  const pickupInfoRef = useRef(null);
  const [pickupInfo, setPickupInfo] = useState({
    fullName: '',
    phone: '',
    confirmPhone: '',
    pickupDate: '',
    address: '',
    pinCode: '',
    block: '',
    village: '',
  });

  const totalSubmitted = useMemo(
    () => entries.reduce((sum, item) => sum + item.weight, 0),
    [entries]
  );

  const requiredPickupFields = ['fullName', 'phone', 'confirmPhone', 'pickupDate', 'address', 'pinCode', 'block', 'village'];
  const isAnyRequiredMissing = requiredPickupFields.some((field) => !pickupInfo[field].trim());
  const isWeightInvalid = !weight || Number(weight) <= 0;
  const isFormIncomplete = isAnyRequiredMissing || isWeightInvalid;
  const todayDate = new Date().toISOString().split('T')[0];

  const useUploadedPhotoForEntry = (photo) => {
    setEntryPhoto(photo);
    setError('');
  };

  const handleEntryPhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError(copy.errChooseImage);
      event.target.value = '';
      return;
    }

    const photo = {
      id: `${Date.now()}-entry`,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    };

    setEntryPhoto(photo);
    setError('');
    event.target.value = '';
  };

  const handleEntryVideoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setError(copy.errChooseVideo);
      event.target.value = '';
      return;
    }

    const video = {
      id: `${Date.now()}-entry-video`,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    };

    setEntryVideo(video);
    setError('');
    event.target.value = '';
  };

  const handleAddEntry = () => {
    const parsedWeight = Number(weight);
    const phonePattern = /^[6-9]\d{9}$/;
    const editingEntry = entries.find((entry) => entry.id === editingEntryId);

    if (isAnyRequiredMissing) {
      setError(copy.errRequiredFields);
      setSuccess('');
      window.alert(copy.alertRequiredFields);
      return;
    }

    if (!pickupInfo.fullName.trim()) {
      setError(copy.errFullName);
      setSuccess('');
      return;
    }

    if (!phonePattern.test(pickupInfo.phone.trim())) {
      setError(copy.errPhone);
      setSuccess('');
      return;
    }

    if (pickupInfo.phone.trim() !== pickupInfo.confirmPhone.trim()) {
      setError(copy.errPhoneMatch);
      setSuccess('');
      return;
    }

    if (!pickupInfo.address.trim()) {
      setError(copy.errAddress);
      setSuccess('');
      return;
    }

    if (!pickupInfo.pickupDate) {
      setError(copy.errPickupDate);
      setSuccess('');
      return;
    }

    if (pickupInfo.pickupDate < todayDate) {
      setError(copy.errPastDate);
      setSuccess('');
      return;
    }

    if (!/^\d{6}$/.test(pickupInfo.pinCode.trim())) {
      setError(copy.errPin);
      setSuccess('');
      return;
    }

    if (!pickupInfo.block.trim() || !pickupInfo.village.trim()) {
      setError(copy.errBlockVillage);
      setSuccess('');
      return;
    }

    if (!parsedWeight || parsedWeight <= 0) {
      setError(copy.errWeight);
      setSuccess('');
      window.alert(copy.alertWeight);
      return;
    }

    if (editingEntryId) {
      setEntries((prev) =>
        prev.map((entry) => {
          if (entry.id !== editingEntryId) return entry;
          return {
            ...entry,
            type: wasteType,
            weight: parsedWeight,
            photoUrl: entryPhoto?.previewUrl || editingEntry?.photoUrl || '',
            photoName: entryPhoto?.name || editingEntry?.photoName || '',
            videoUrl: entryVideo?.previewUrl || editingEntry?.videoUrl || '',
            videoName: entryVideo?.name || editingEntry?.videoName || '',
          };
        })
      );
      setSuccess(copy.successUpdated);
      setEditingEntryId(null);
    } else {
      setEntries((prev) => [
        {
          id: Date.now(),
          type: wasteType,
          weight: parsedWeight,
          photoUrl: entryPhoto?.previewUrl || '',
          photoName: entryPhoto?.name || '',
          videoUrl: entryVideo?.previewUrl || '',
          videoName: entryVideo?.name || '',
        },
        ...prev,
      ]);
      setSuccess(copy.successSubmitted);
      setNewEntryAdded(true);
      setTimeout(() => setNewEntryAdded(false), 600);
      window.alert(copy.alertSubmitted);
    }

    setWeight('');
    setEntryPhoto(null);
    setEntryVideo(null);
    setError('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditEntry = (entry) => {
    setWasteType(entry.type);
    setWeight(String(entry.weight));
    setEditingEntryId(entry.id);
    setEntryPhoto(
      entry.photoUrl
        ? {
            id: `edit-${entry.id}`,
            name: entry.photoName || `${entry.type} image`,
            previewUrl: entry.photoUrl,
          }
        : null
    );
    setEntryVideo(
      entry.videoUrl
        ? {
            id: `edit-video-${entry.id}`,
            name: entry.videoName || `${entry.type} video`,
            previewUrl: entry.videoUrl,
          }
        : null
    );
    setError('');
    setSuccess(copy.successEditing);
  };

  const handleDeleteEntry = (entryId) => {
    const shouldDelete = window.confirm(copy.confirmDelete);
    if (!shouldDelete) return;

    setEntries((prev) => prev.filter((entry) => entry.id !== entryId));

    if (editingEntryId === entryId) {
      setEditingEntryId(null);
      setWasteType('Plastic');
      setWeight('');
      setEntryPhoto(null);
      setEntryVideo(null);
    }

    setSuccess(copy.successDeleted);
    setError('');
  };

  const cancelEditing = () => {
    setEditingEntryId(null);
    setWasteType('Plastic');
    setWeight('');
    setEntryPhoto(null);
    setEntryVideo(null);
    setError('');
    setSuccess(copy.successCancel);
  };

  const handlePickupInputChange = (event) => {
    const { name, value } = event.target;
    setPickupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSuccess('');
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (!imageFiles.length) {
      setError(copy.errImagesOnly);
      event.target.value = '';
      return;
    }

    const photoItems = imageFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));

    setUploadedPhotos((prev) => [...photoItems, ...prev].slice(0, 8));
    setError('');
    setSuccess('');
    event.target.value = '';
  };

  const handleSchedulePickupClick = () => {
    pickupInfoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const firstPickupField = pickupInfoRef.current?.querySelector('input[name="fullName"]');
    firstPickupField?.focus();
    setError('');
    setSuccess(copy.successPickupDetails);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <section className="waste-page">
      <div className="waste-truck-banner animate-fade-in">
        <div className="waste-truck-content">
          <h2>{copy.bannerTitle}</h2>
          <p>
            {copy.bannerSubtitle}
          </p>
          <button type="button" className="truck-cta-btn" onClick={handleSchedulePickupClick}>
            {copy.schedulePickup}
          </button>
        </div>

        <div className="truck-scene" aria-hidden="true">
          <div className="scene-glow" />

          <div className="truck-motion">
            <div className="truck-body">
              <div className="truck-top-box" />
              <div className="truck-cabin" />
              <div className="truck-container">
                <span className="truck-leaf">eco</span>
              </div>
              <div className="truck-intake" />
              <div className="truck-wheel truck-wheel-left" />
              <div className="truck-wheel truck-wheel-right" />
            </div>
          </div>

          <div className="waste-stream" />

          <div className="dust-trail" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="truck-bins">
            <div className="truck-bin bin-large" />
            <div className="truck-bin bin-medium" />
          </div>

          <div className="road-line" />
        </div>
      </div>

      <div className="waste-input-card animate-fade-in">
        <h1>{copy.pageTitle}</h1>
        <p>
          {copy.pageSubtitle}
        </p>

        {editingEntryId && (
          <p className="editing-note">{copy.editingNote}</p>
        )}

        <div className="waste-input-row">
          <select
            value={wasteType}
            onChange={(event) => setWasteType(event.target.value)}
            className="waste-control"
          >
            {wasteTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <div className="weight-field">
            <Weight size={16} />
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder={copy.weightPlaceholder}
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className="waste-control"
            />
          </div>

          <button
            type="button"
            className="add-entry-btn"
            onClick={handleAddEntry}
            disabled={isFormIncomplete}
            aria-disabled={isFormIncomplete}
          >
            {editingEntryId ? copy.saveChanges : copy.addEntry}
          </button>
        </div>

        {editingEntryId && (
          <div className="entry-edit-actions">
            <button type="button" className="cancel-edit-btn" onClick={cancelEditing}>
              {copy.cancelEdit}
            </button>
          </div>
        )}

        <div className="entry-photo-row">
          <div className="entry-media-header">
            <h3>{copy.mediaTitle}</h3>
            <p>{copy.mediaSubtitle}</p>
          </div>

          <label className="upload-btn entry-upload-btn" htmlFor="entry-photo-upload">
            <Upload size={15} /> {copy.addEntryImage}
          </label>
          <input
            id="entry-photo-upload"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleEntryPhotoChange}
            hidden
          />

          <label className="upload-btn entry-upload-btn" htmlFor="entry-video-upload">
            <Upload size={15} /> {copy.addEntryVideo}
          </label>
          <input
            id="entry-video-upload"
            type="file"
            accept="video/*"
            capture="environment"
            onChange={handleEntryVideoChange}
            hidden
          />

         

          {(entryPhoto || entryVideo) && (
            <div className="entry-selected-media animate-scale-in">
              {entryPhoto && (
                <button type="button" className="selected-media-chip" onClick={() => setEntryPhoto(null)}>
                  {copy.photoLabel}: {entryPhoto.name || copy.selectedImage} ×
                </button>
              )}
              {entryVideo && (
                <button type="button" className="selected-media-chip" onClick={() => setEntryVideo(null)}>
                  {copy.videoLabel}: {entryVideo.name || copy.selectedVideo} ×
                </button>
              )}
            </div>
          )}
        </div>

        <div className="pickup-info-card" ref={pickupInfoRef}>
          <h3>{copy.pickupInfoTitle}</h3>
          <p>{copy.pickupInfoText}</p>

          <div className="pickup-info-grid">
            <input
              type="text"
              name="fullName"
              placeholder={copy.fullName}
              value={pickupInfo.fullName}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="tel"
              name="phone"
              maxLength="10"
              placeholder={copy.phoneNumber}
              value={pickupInfo.phone}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="tel"
              name="confirmPhone"
              maxLength="10"
              placeholder={copy.confirmPhone}
              value={pickupInfo.confirmPhone}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="date"
              name="pickupDate"
              value={pickupInfo.pickupDate}
              onChange={handlePickupInputChange}
              className="waste-control"
              min={todayDate}
              required
            />
            <input
              type="text"
              name="pinCode"
              maxLength="6"
              placeholder={copy.pinCode}
              value={pickupInfo.pinCode}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="text"
              name="block"
              placeholder={copy.block}
              value={pickupInfo.block}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <input
              type="text"
              name="village"
              placeholder={copy.village}
              value={pickupInfo.village}
              onChange={handlePickupInputChange}
              className="waste-control"
              required
            />
            <textarea
              name="address"
              rows="3"
              placeholder={copy.addressPlaceholder}
              value={pickupInfo.address}
              onChange={handlePickupInputChange}
              className="waste-control pickup-address"
              required
            />
          </div>
        </div>

        <div className="waste-input-footer">
          <label className="upload-btn" htmlFor="photo-upload">
            <Upload size={15} /> {copy.uploadPhotos}
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handlePhotoUpload}
            hidden
          />

          <span className="total-weight">{copy.totalSubmitted}: {totalSubmitted.toFixed(1)} kg</span>
        </div>

        {error && <p className="waste-error animate-shake">{error}</p>}
        {success && <p className={`waste-success ${showSuccess ? 'animate-bounce-in' : 'animate-bounce-out'}`}>{success}</p>}

        {uploadedPhotos.length > 0 && (
          <div className="uploaded-photos animate-scale-in">
            <h3>{copy.uploadedPhotos}</h3>
            <div className="photo-grid">
              {uploadedPhotos.map((photo, index) => (
                <figure key={photo.id} className="photo-item animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <img src={photo.previewUrl} alt={photo.name} />
                  <figcaption>{photo.name}</figcaption>
                  <button type="button" className="use-photo-btn" onClick={() => useUploadedPhotoForEntry(photo)}>
                    {copy.useForEntry}
                  </button>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="waste-grid">
        <div className="recent-entries-card animate-slide-in-right">
          <h2>{copy.recentEntries}</h2>
          <ul>
            {entries.slice(0, 6).map((item, index) => (
              <li key={item.id} className={`animate-slide-in-left ${newEntryAdded && index === 0 ? 'highlight-new' : ''}`} style={{ animationDelay: `${index * 80}ms` }}>
                <div className="entry-left">
                  <div className="entry-thumb-wrap">
                    {item.photoUrl ? (
                      <img src={item.photoUrl} alt={item.photoName || item.type} className="entry-thumb" />
                    ) : item.videoUrl ? (
                      <video src={item.videoUrl} className="entry-thumb" controls preload="metadata" />
                    ) : (
                      <div className="entry-thumb entry-thumb-placeholder">{copy.noImage}</div>
                    )}
                  </div>
                  <div className="entry-meta">
                    <span>{item.type}</span>
                    <small>{item.photoName || item.videoName || copy.noMedia}</small>
                  </div>
                </div>
                <div className="entry-right">
                  <strong>{item.weight} kg</strong>
                  <div className="entry-actions">
                    <button type="button" className="entry-action-btn edit" onClick={() => handleEditEntry(item)}>
                      {copy.edit}
                    </button>
                    <button type="button" className="entry-action-btn delete" onClick={() => handleDeleteEntry(item.id)}>
                      {copy.delete}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rewards-card animate-slide-in-left">
          <h2>{copy.rewardsTitle}</h2>
          <p>
            {copy.rewardsText}
          </p>
          <div className="rewards-actions">
            <Link to="/gift" className="rewards-link rewards-link-light">
              <Gift size={16} /> {copy.viewGifts}
            </Link>
            <Link to="/profile" className="rewards-link rewards-link-outline">
              <LayoutDashboard size={16} /> {copy.openDashboard}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncomeSource;
