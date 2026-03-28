import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { readFileAsDataUrl, saveTalentUpload } from '../utils/talentStorage';
import TalentUploadForm from '../components/talent/TalentUploadForm';
import { getTalentText } from '../components/talent/talentText';
import './UploadTalent.css';

const initialFormState = {
  skillName: '',
  productTitle: '',
  category: 'Recycled Art',
  priceInr: '',
  wasteRequirementKg: '',
  contactDetails: '',
  description: '',
  file: null,
};

export default function UploadTalent() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const copy = getTalentText(language);
  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    setFormData((prev) => ({ ...prev, file: selectedFile }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.file) return;

    setIsSubmitting(true);
    try {
      const imageDataUrl = await readFileAsDataUrl(formData.file);
      const entry = {
        id: Date.now().toString(),
        skillName: formData.skillName,
        productTitle: formData.skillName || formData.productTitle,
        category: formData.category,
        priceInr: Number(formData.priceInr),
        wasteRequirementKg: Number(formData.wasteRequirementKg),
        contactDetails: formData.contactDetails,
        description: formData.description,
        imageDataUrl,
        submittedAt: new Date().toISOString(),
        isDemo: false,
      };

      saveTalentUpload(entry);
      setSubmitted(true);
      setFormData(initialFormState);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="upload-talent-page">
      <div className="upload-talent-container">
        <div className="upload-talent-header">
          <p className="upload-talent-kicker">{copy.uploadKicker}</p>
          <h1>{copy.uploadHeading}</h1>
          <p>{copy.uploadSubtitle}</p>
        </div>

        {submitted ? (
          <div className="upload-success" role="status" aria-live="polite">
            <h2>{copy.uploadSuccessTitle}</h2>
            <p>{copy.uploadSuccessDesc}</p>
            <button type="button" className="upload-view-gallery-btn" onClick={() => navigate('/talent-gallery')}>
              {copy.viewTalentGallery}
            </button>
          </div>
        ) : null}

        <TalentUploadForm
          formData={formData}
          fileName={formData.file?.name || ''}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
