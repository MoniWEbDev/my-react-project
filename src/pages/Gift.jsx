import React, { useState } from 'react';
import './Gift.css';

const Gift = () => {
  const allGifts = [
    {
      id: 1,
      title: 'Mitti Handi Bowl',
      description: 'Traditional mitti handi bowl handmade in rural homes, perfect for serving food.',
      image: 'https://m.media-amazon.com/images/I/513jJVyjIiL._AC_UL320_.jpg',
    },
    {
      id: 2,
      title: 'Hand-Painted Matka Set',
      description: 'Floral hand-painted matka set crafted by village women artisans.',
      image: 'https://s.alicdn.com/@sc04/kf/A5e0eb3c42a92418787725dd097755588n.jpg',
    },
    {
      id: 3,
      title: 'Colorful Thread Wall Hanging',
      description: 'Colorful handcrafted wall decor made using thread, rings, and tassels.',
      image: 'https://i.ytimg.com/vi/xRfCWQYIhy8/maxresdefault.jpg',
    },
    {
      id: 4,
      title: 'Terracotta Carved Pot Set',
      description: 'Carved terracotta pots made by traditional rural potter communities.',
      image: 'https://i.pinimg.com/736x/b5/32/0e/b5320ed395493f6fe8402fdbfeda9a29.jpg',
    },
    {
      id: 5,
      title: 'Multicolor Crochet Round Mat',
      description: 'Hand-crocheted multicolor round mat made by rural women groups.',
      image: 'https://m.media-amazon.com/images/I/616km0qBd1L.jpg',
    },
    {
      id: 6,
      title: 'Pink White Crochet Mat',
      description: 'Bright pink and white crochet mat handmade by rural women artisans.',
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/12/CA/IM/AO/26341215/new-product-500x500.jpeg',
    },
    {
      id: 7,
      title: 'Bamboo Village Craft Collection',
      description: 'Mixed bamboo handicraft collection made by rural women artisan groups.',
      image: 'https://m.media-amazon.com/images/I/61snqmIoPNL.jpg',
    },
    {
      id: 8,
      title: 'Mitti Kulhad Tea Cups',
      description: 'Traditional clay kulhad cup set handmade by local rural potters.',
      image: 'https://tiimg.tistatic.com/fp/1/007/606/highly-durable-long-lasting-with-high-quality-plastic-mug-green--635.jpg',
    },
    {
      id: 9,
      title: 'Jute Rope Decor Basket',
      description: 'Decorative jute rope basket handcrafted by village women collectives.',
      image: 'https://cpimg.tistatic.com/7594027/b/4/plastic-lunch-box-set.jpg',
    },
    {
      id: 10,
      title: 'Folk Art Pottery Jar',
      description: 'Hand-painted clay jar with floral village folk motifs and traditional finish.',
      image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/26a9298e-a6b4-4c07-a7f0-9989522ca5b9.png?bg_token=color.background.quaternary',
    },
    {
      id: 11,
      title: 'Carved Mitti Lantern',
      description: 'Terracotta lantern with hand-carved patterns made by rural craft women.',
      image: 'https://anek.tdservers.co.in/wp-content/uploads/2024/10/GULLAK.jpg',
    },
    {
      id: 12,
      title: 'Handmade Cane Utility Basket',
      description: 'Rural utility basket handwoven with cane by local women artisans.',
      image: 'https://tiimg.tistatic.com/fp/1/007/202/spacious-flower-design-plastic-cutlery-stand-085.jpg',
    },
    {
      id: 13,
      title: 'Village Hand Embroidery Frame',
      description: 'Decor frame with hand embroidery made by women artisan self-help groups.',
      image: 'https://www.bharatsokagakkai.org/wp-content/uploads/2024/09/Plastic-laundry-basket.jpg',
    },
    {
      id: 14,
      title: 'Woven Storage Basket',
      description: 'Natural handwoven storage basket made in rural homes by women artisans.',
      image: 'https://m.media-amazon.com/images/I/61A2OYtJ3OL._AC_UL320_.jpg',
    },
    {
      id: 15,
      title: 'Rural Women Craft Combo',
      description: 'Combined handcrafted village decor set made by rural women artisan families.',
      image: 'https://m.media-amazon.com/images/I/51bBWOXg7JL._AC_UL320_.jpg',
    },
  ];

  const [claimedGifts, setClaimedGifts] = useState([]);

  const handleClaimGift = (giftId) => {
    setClaimedGifts((prev) => [...prev, giftId]);
  };

  const availableGifts = allGifts.filter((gift) => !claimedGifts.includes(gift.id));

  return (
    <section className="gift-page">
      <div className="gift-header">
        <h1>Gifts Section</h1>
        <p>Claim eco-friendly rewards based on your recycled total. Available: {availableGifts.length} gifts</p>
      </div>

      {availableGifts.length === 0 ? (
        <div className="gift-empty-state">
          <p>Congratulations! You've claimed all available gifts. More rewards coming soon!</p>
        </div>
      ) : (
        <div className="gift-grid">
          {availableGifts.map((gift) => (
            <div key={gift.id} className="gift-card">
              <div className="gift-image-container">
                <img src={gift.image} alt={gift.title} className="gift-image" />
              </div>
              <div className="gift-content">
                <h3 className="gift-title">{gift.title}</h3>
                <p className="gift-description">{gift.description}</p>
                <button
                  type="button"
                  className="gift-claim-btn"
                  onClick={() => handleClaimGift(gift.id)}
                >
                  Claim Gift
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Gift;
