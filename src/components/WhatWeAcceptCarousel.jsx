import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './WhatWeAcceptCarousel.css';

const AUTO_DELAY_MS = 2600;
const FALLBACK_IMAGE =
	'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop';

const wasteItems = [
	{
		name: 'Cans',
		image:
			'/images/cans.jpg',
	},
	{
		name: 'Water Bottles',
		image:
			'/images/water-bottles.jpg',
	},
	{
		name: 'Bottle Caps',
		image:
			'/images/bottle-caps.jpg',
	},
	{
		name: 'Plastics',
		image:
			'/images/plastics.jpg',
	},
	{
		name: 'Wrappers',
		image:
			'/images/wrappers.jpg',
	},
	{
		name: 'Metals',
		image:
			'/images/metals.jpg',
	},
	{
		name: 'Electronics (E-waste)',
		image:
			'/images/electronics.jpg',
	},
	{
		name: 'Cardboards',
		image:
			'/images/cardboards.jpg',
	},
	{
		name: 'Paper',
		image:
			'/images/paper.jpg',
	},
	{
		name: 'Woods',
		image:
			'/images/woods.jpg',
	},
	{
		name: 'Cosmetic Pouches',
		image:
			'/images/cosmetic-pouches.jpg',
	},
	{
		name: 'Glass',
		image:
			'/images/glass.jpg',
	},
];

export default function WhatWeAcceptCarousel() {
  const { language } = useLanguage();
	const copyByLanguage = {
		en: {
			names: ['Cans', 'Water Bottles', 'Bottle Caps', 'Plastics', 'Wrappers', 'Metals', 'Electronics (E-waste)', 'Cardboards', 'Paper', 'Woods', 'Cosmetic Pouches', 'Glass'],
			slidePrefix: 'Slide',
			slideOf: 'of',
			sectionAria: 'Accepted waste categories',
			heading: 'What We Accept',
			description: 'We collect and process multiple recyclable streams from daily life.',
			prevSlide: 'Previous slide',
			nextSlide: 'Next slide',
			slideSelectors: 'Slide selectors',
			goToPrefix: 'Go to',
		},
		hi: {
			names: ['डिब्बे', 'पानी की बोतलें', 'बोतल के ढक्कन', 'प्लास्टिक', 'रैपर', 'धातु', 'इलेक्ट्रॉनिक कचरा', 'कार्डबोर्ड', 'कागज', 'लकड़ी', 'कॉस्मेटिक पाउच', 'कांच'],
			slidePrefix: 'स्लाइड',
			slideOf: '/',
			sectionAria: 'स्वीकृत कचरा श्रेणियां',
			heading: 'हम क्या स्वीकार करते हैं',
			description: 'हम दैनिक जीवन से कई रीसाइक्लेबल श्रेणियां एकत्र और प्रोसेस करते हैं।',
			prevSlide: 'पिछली स्लाइड',
			nextSlide: 'अगली स्लाइड',
			slideSelectors: 'स्लाइड चयन',
			goToPrefix: '',
		},
		ur: {
			names: ['ڈبے', 'پانی کی بوتلیں', 'بوتل کے ڈھکن', 'پلاسٹک', 'ریپر', 'دھات', 'الیکٹرانک کچرا', 'کارڈ بورڈ', 'کاغذ', 'لکڑی', 'کاسمیٹک پاؤچ', 'شیشہ'],
			slidePrefix: 'سلائیڈ',
			slideOf: 'میں سے',
			sectionAria: 'قبول شدہ کچرے کی اقسام',
			heading: 'ہم کیا قبول کرتے ہیں',
			description: 'ہم روزمرہ زندگی سے کئی ری سائیکل ہونے والی اقسام جمع کرتے اور پروسیس کرتے ہیں۔',
			prevSlide: 'پچھلی سلائیڈ',
			nextSlide: 'اگلی سلائیڈ',
			slideSelectors: 'سلائیڈ انتخاب',
			goToPrefix: '',
		},
	};

	const copy = copyByLanguage[language] || copyByLanguage.en;
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [failedImageUrls, setFailedImageUrls] = useState({});

	const localizedNames = copy.names;

	const localizedWasteItems = wasteItems.map((item, idx) => ({
		...item,
		localizedName: localizedNames[idx] || item.name,
	}));

	const totalSlides = localizedWasteItems.length;

	const nextSlide = () => {
		setActiveIndex((prev) => (prev + 1) % totalSlides);
	};

	const prevSlide = () => {
		setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
	};

	useEffect(() => {
		if (isPaused) return undefined;

		const intervalId = window.setInterval(() => {
			nextSlide();
		}, AUTO_DELAY_MS);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [isPaused, totalSlides]);

	useEffect(() => {
		wasteItems.slice(0, 2).forEach((item) => {
			const preloadImage = new Image();
			preloadImage.src = item.image;
		});
	}, []);

	const slideA11yText = useMemo(
		() =>
			language === 'hi'
				? `${copy.slidePrefix} ${activeIndex + 1} ${copy.slideOf} ${totalSlides}: ${localizedWasteItems[activeIndex].localizedName}`
				: `${copy.slidePrefix} ${activeIndex + 1} ${copy.slideOf} ${totalSlides}: ${localizedWasteItems[activeIndex].localizedName}`,
		[activeIndex, totalSlides, localizedWasteItems, copy, language],
	);

	return (
		<section className="what-accept-section" aria-label={copy.sectionAria}>
			<div className="what-accept-header">
				<h2>{copy.heading}</h2>
				<p>{copy.description}</p>
			</div>

			<div
				className="what-accept-carousel"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
			>
				<span className="sr-only" aria-live="polite">
					{slideA11yText}
				</span>

				<div className="what-accept-stage">
					{localizedWasteItems.map((item, index) => (
						<article
							key={`${item.name}-${index}`}
							className={`what-accept-slide ${index === activeIndex ? 'is-active' : ''}`}
							aria-hidden={index !== activeIndex}
						>
							<img
								src={failedImageUrls[item.image] ? FALLBACK_IMAGE : item.image}
								alt={item.localizedName}
								loading={index < 2 ? 'eager' : 'lazy'}
								decoding="async"
								onError={(event) => {
									if (event.currentTarget.src !== FALLBACK_IMAGE) {
										setFailedImageUrls((prev) => ({ ...prev, [item.image]: true }));
									}
								}}
							/>
							<div className="what-accept-gradient" aria-hidden="true" />
							<h3>{item.localizedName}</h3>
						</article>
					))}
				</div>

				<button type="button" className="what-accept-nav prev" aria-label={copy.prevSlide} onClick={prevSlide}>
					<ChevronLeft size={20} />
				</button>
				<button type="button" className="what-accept-nav next" aria-label={copy.nextSlide} onClick={nextSlide}>
					<ChevronRight size={20} />
				</button>

				<div className="what-accept-dots" role="tablist" aria-label={copy.slideSelectors}>
					{localizedWasteItems.map((item, index) => (
						<button
							key={`${item.name}-${index}`}
							type="button"
							className={`what-accept-dot ${index === activeIndex ? 'is-active' : ''}`}
							onClick={() => setActiveIndex(index)}
							aria-label={copy.goToPrefix ? `${copy.goToPrefix} ${item.localizedName}` : item.localizedName}
							aria-selected={index === activeIndex}
							role="tab"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
