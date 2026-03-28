import React from 'react';
import TalentCard from './TalentCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTalentText } from './talentText';

export default function TalentGalleryGrid({ title, subtitle, items, eligibleWasteKg }) {
  const { language } = useLanguage();
  const copy = getTalentText(language);

  return (
    <section className="talent-gallery-block">
      <div className="talent-gallery-head">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      {items.length === 0 ? (
        <div className="talent-gallery-empty">
          <h3>{copy.noMatchingTalents}</h3>
          <p>{copy.noMatchingTalentsDesc}</p>
        </div>
      ) : (
        <div className="talent-grid">
          {items.map((item) => {
            const isEligible = Number(eligibleWasteKg || 0) >= Number(item.wasteRequirementKg || 0);
            return <TalentCard key={item.id} talent={item} isEligible={isEligible} />;
          })}
        </div>
      )}
    </section>
  );
}
