import React, { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTalentUploads } from '../utils/talentStorage';
import { demoTalents } from '../data/demoTalents';
import TalentWasteFilter from '../components/talent/TalentWasteFilter';
import TalentGalleryGrid from '../components/talent/TalentGalleryGrid';
import { getTalentText } from '../components/talent/talentText';
import './TalentGallery.css';

const getRecommendedPriceBand = (wasteKg) => {
  if (wasteKg >= 100 && wasteKg <= 150) return { min: 50, max: 100 };
  if (wasteKg > 150 && wasteKg <= 250) return { min: 100, max: 200 };
  if (wasteKg > 250) return { min: 200, max: 500 };
  if (wasteKg >= 50) return { min: 20, max: 80 };
  return null;
};

export default function TalentGallery() {
  const { t, language } = useLanguage();
  const copy = getTalentText(language);
  const normalizeTalent = (item, index) => ({
    id: item.id || `gallery-${index}`,
    productTitle: item.productTitle || item.skillType || copy.skillYouHave,
    category: item.category || item.talentCategory || copy.creativeProduct,
    description: item.description || copy.description,
    priceInr: Number(item.priceInr || item.priceTag || 0),
    wasteRequirementKg: Number(item.wasteRequirementKg || item.weightKg || 0),
    contactDetails: item.contactDetails || item.mobile || copy.contactNotProvided,
    imageDataUrl: item.imageDataUrl,
    imageUrl: item.imageUrl,
    isDemo: Boolean(item.isDemo),
  });
  const [wasteKgInput, setWasteKgInput] = useState('');
  const uploads = useMemo(
    () => getTalentUploads().map((item, index) => normalizeTalent(item, index)),
    [language]
  );
  const mergedTalents = useMemo(
    () => [...uploads, ...demoTalents.map((item, index) => normalizeTalent(item, index))],
    [uploads, language]
  );
  const wasteKg = Number(wasteKgInput || 0);
  const recommendedBand = getRecommendedPriceBand(wasteKg);
  const eligibleRewards = useMemo(
    () =>
      mergedTalents.filter((item) => {
        const wasteEligible = Number(item.wasteRequirementKg || 0) <= wasteKg;
        if (!wasteEligible) return false;

        if (!recommendedBand) return true;
        const price = Number(item.priceInr || 0);
        return price >= recommendedBand.min && price <= recommendedBand.max;
      }),
    [mergedTalents, wasteKg, recommendedBand]
  );

  return (
    <section className="talent-gallery-page">
      <div className="talent-gallery-container">
        <div className="talent-gallery-header">
          <p>{t('uploadYourTalent')}</p>
          <h1>{t('talentGallery')}</h1>
          <p>
            {copy.wasteFinderDesc}
          </p>
        </div>

        <TalentWasteFilter wasteKg={wasteKgInput} onChange={setWasteKgInput} />

        <TalentGalleryGrid
          title={copy.eligibleRewardsTitle}
          subtitle={
            recommendedBand
              ? copy.eligibleSubtitleBand.replace('{min}', recommendedBand.min).replace('{max}', recommendedBand.max)
              : copy.eligibleSubtitleDefault
          }
          items={eligibleRewards}
          eligibleWasteKg={wasteKg}
        />

        <TalentGalleryGrid
          title={copy.allTalentProductsTitle}
          subtitle={copy.allTalentProductsSubtitle}
          items={mergedTalents}
          eligibleWasteKg={wasteKg}
        />
      </div>
    </section>
  );
}
