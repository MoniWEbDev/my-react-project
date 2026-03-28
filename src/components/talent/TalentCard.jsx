import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTalentText } from './talentText';

const phoneRegex = /(\+?\d[\d\s-]{7,}\d)/;
const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const toDigits = (value) => value.replace(/[^\d+]/g, '');

export default function TalentCard({ talent, isEligible }) {
  const { language } = useLanguage();
  const copy = getTalentText(language);
  const contact = talent.contactDetails || '';
  const phoneMatch = contact.match(phoneRegex);
  const emailMatch = contact.match(emailRegex);

  const phone = phoneMatch ? toDigits(phoneMatch[1]) : '';
  const email = emailMatch ? emailMatch[0] : '';

  const callHref = phone ? `tel:${phone}` : email ? `mailto:${email}` : null;
  const messageHref = phone
    ? `https://wa.me/${phone.replace('+', '')}`
    : email
      ? `mailto:${email}`
      : null;

  return (
    <article className={`talent-card ${isEligible ? 'eligible' : ''}`}>
      <img
        src={talent.imageDataUrl || talent.imageUrl}
        alt={talent.productTitle}
        loading="lazy"
      />

      <div className="talent-card-body">
        <h3 className="talent-skill-title">{talent.productTitle}</h3>

        <div className="talent-priority-row">
          <span className="talent-price-highlight">INR {talent.priceInr}</span>
          <span className="talent-contact-highlight">{talent.contactDetails || copy.contactNotProvided}</span>
        </div>

        <p className="talent-category">{talent.category || copy.creativeProduct}</p>
        <p className="talent-desc">{talent.description}</p>

        <div className="talent-chip-row">
          <span className="talent-level">{copy.requiresWaste.replace('{kg}', talent.wasteRequirementKg)}</span>
        </div>

        {isEligible ? <span className="redeem-badge">{copy.redeemBadge}</span> : null}

        <div className="talent-contact-row">
          {callHref ? (
            <a href={callHref} className="talent-action-btn" aria-label={copy.contactAria.replace('{title}', talent.productTitle)}>
              {copy.call}
            </a>
          ) : (
            <button type="button" className="talent-action-btn disabled" disabled>
              {copy.call}
            </button>
          )}

          {messageHref ? (
            <a href={messageHref} className="talent-action-btn ghost" target="_blank" rel="noreferrer">
              {copy.message}
            </a>
          ) : (
            <button type="button" className="talent-action-btn ghost disabled" disabled>
              {copy.message}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
