import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTalentText } from './talentText';

const getPriceHint = (wasteKg, copy) => {
  if (wasteKg >= 100 && wasteKg <= 150) {
    return copy.hint100;
  }
  if (wasteKg > 150 && wasteKg <= 250) {
    return copy.hint150;
  }
  if (wasteKg > 250) {
    return copy.hint250;
  }
  if (wasteKg >= 50) {
    return copy.hint50;
  }
  return copy.hintDefault;
};

export default function TalentWasteFilter({ wasteKg, onChange }) {
  const { language } = useLanguage();
  const copy = getTalentText(language);

  return (
    <section className="waste-filter-panel">
      <div className="waste-filter-head">
        <h2>{copy.wasteFinderTitle}</h2>
        <p>{copy.wasteFinderDesc}</p>
      </div>

      <div className="waste-filter-input-row">
        <label htmlFor="waste-kg-input">{copy.collectedWaste}</label>
        <input
          id="waste-kg-input"
          type="number"
          min="0"
          step="1"
          value={wasteKg}
          onChange={(event) => onChange(event.target.value)}
          placeholder={copy.finderPlaceholder}
        />
      </div>

      <p className="waste-filter-hint">{getPriceHint(Number(wasteKg || 0), copy)}</p>
    </section>
  );
}
