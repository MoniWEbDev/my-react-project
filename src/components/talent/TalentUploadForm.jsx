import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTalentText } from './talentText';

const categories = [
  'Recycled Art',
  'Handmade Craft',
  'Home Decor',
  'Utility Product',
  'Fashion Accessory',
  'Other',
];

export default function TalentUploadForm({
  formData,
  fileName,
  isSubmitting,
  onChange,
  onFileChange,
  onSubmit,
}) {
  const { language } = useLanguage();
  const copy = getTalentText(language);

  return (
    <form className="upload-talent-form" onSubmit={onSubmit}>
      <div className="upload-core-inputs upload-full">
        <h3>{copy.skillDetailsTitle}</h3>
        <p>{copy.skillDetailsDesc}</p>
      </div>

      <label>
        {copy.skillYouHave}
        <input
          type="text"
          name="skillName"
          value={formData.skillName}
          onChange={onChange}
          placeholder={copy.skillPlaceholder}
          required
        />
      </label>

      <label>
        {copy.category}
        <select name="category" value={formData.category} onChange={onChange}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {copy.categoryOptions?.[item] || item}
            </option>
          ))}
        </select>
      </label>

      <label>
        {copy.priceInr}
        <input
          type="number"
          min="1"
          step="1"
          name="priceInr"
          value={formData.priceInr}
          onChange={onChange}
          placeholder={copy.pricePlaceholder}
          required
        />
      </label>

      <label>
        {copy.wasteRequirement}
        <input
          type="number"
          min="1"
          step="1"
          name="wasteRequirementKg"
          value={formData.wasteRequirementKg}
          onChange={onChange}
          placeholder={copy.wastePlaceholder}
          required
        />
      </label>

      <label className="upload-full">
        {copy.description}
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={4}
          placeholder={copy.descriptionPlaceholder}
          required
        />
      </label>

      <label>
        {copy.contactDetails}
        <input
          type="text"
          name="contactDetails"
          value={formData.contactDetails}
          onChange={onChange}
          placeholder={copy.contactPlaceholder}
          required
        />
      </label>

      <label className="upload-full">
        {copy.uploadProductImage}
        <input type="file" accept="image/*" onChange={onFileChange} required />
        <span className="upload-file-name">{fileName || copy.noFileSelected}</span>
      </label>

      <button type="submit" className="upload-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? copy.savingTalent : copy.saveTalent}
      </button>
    </form>
  );
}
