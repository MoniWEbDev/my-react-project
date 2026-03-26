import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './Gift.css';

const Gift = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const [gifts, setGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [deliveryForm, setDeliveryForm] = useState({
    fullName: '',
    phone: '',
    confirmPhone: '',
    address: '',
    block: '',
    pinCode: '',
  });
  const [isSubmittingDelivery, setIsSubmittingDelivery] = useState(false);
  const [successPopupMessage, setSuccessPopupMessage] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [uploadedItems, setUploadedItems] = useState([]);
  const [postedGifts, setPostedGifts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [claimingGiftId, setClaimingGiftId] = useState(null);

  const getFallbackImage = (giftId) => `https://picsum.photos/seed/gift-${giftId}/1200/675`;

  const fetchGifts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/api/gifts`);
      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || 'Failed to load gifts.');
        return;
      }

      setGifts(data?.gifts || []);
    } catch {
      setError('Could not connect to gift server.');
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchGifts();
  }, [fetchGifts]);

  const handleClaimGift = async (giftId) => {
    try {
      setClaimingGiftId(giftId);
      setError('');
      setDeliveryMessage('');

      const response = await fetch(`${API_BASE_URL}/api/gifts/${giftId}/claim`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || 'Failed to claim gift.');
        return;
      }

      setGifts((prev) =>
        prev.map((gift) =>
          gift.giftId === giftId
            ? { ...gift, claimed: true, claimedAt: data?.gift?.claimedAt || new Date().toISOString() }
            : gift
        )
      );
    } catch {
      setError('Could not claim gift. Please try again.');
    } finally {
      setClaimingGiftId(null);
    }
  };

  const getGiftCategory = (gift) => {
    const text = `${gift.title} ${gift.description}`.toLowerCase();

    if (text.includes('plastic')) return 'Plastic';
    if (text.includes('iron') || text.includes('steel') || text.includes('metal')) return 'Iron';
    if (text.includes('cosmetic') || text.includes('beauty')) return 'Cosmetic';
    if (text.includes('paper') || text.includes('book') || text.includes('notebook')) return 'Paper';
    if (text.includes('cloth') || text.includes('fabric') || text.includes('cotton')) return 'Cloths';
    if (text.includes('shoe') || text.includes('footwear')) return 'Old Shoes';

    return 'Plastic';
  };

  const handleDeliveryInputChange = (event) => {
    const { name, value } = event.target;
    setDeliveryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeliverySubmit = (event) => {
    event.preventDefault();
    setError('');
    setDeliveryMessage('');

    const requiredFields = ['fullName', 'phone', 'confirmPhone', 'address', 'block', 'pinCode'];
    const isMissingField = requiredFields.some((field) => !deliveryForm[field].trim());
    const phonePattern = /^[6-9]\d{9}$/;
    const pinPattern = /^\d{6}$/;

    if (isMissingField) {
      setError('Please fill all delivery details.');
      return;
    }

    if (!phonePattern.test(deliveryForm.phone.trim())) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (deliveryForm.phone.trim() !== deliveryForm.confirmPhone.trim()) {
      setError('Phone number and confirm phone number do not match.');
      return;
    }

    if (!pinPattern.test(deliveryForm.pinCode.trim())) {
      setError('Please enter a valid 6-digit PIN code.');
      return;
    }

    setIsSubmittingDelivery(true);

    setTimeout(() => {
      setIsSubmittingDelivery(false);
      setDeliveryMessage('Delivery details saved successfully.');
      setSuccessPopupMessage('Success! Your form has been submitted.');
      setTimeout(() => {
        setSuccessPopupMessage('');
      }, 2200);
    }, 400);
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files || []);
    const parsedWeight = Number(weightKg);

    if (!files.length) return;

    if (!parsedWeight || parsedWeight <= 0) {
      setError('Please enter valid weight before uploading photo.');
      event.target.value = '';
      return;
    }

    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (!imageFiles.length) {
      setError('Please upload image files only.');
      event.target.value = '';
      return;
    }

    const items = imageFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
      weight: parsedWeight,
      weightUnit: 'kg',
      posted: false,
    }));

    setUploadedItems((prev) => [...items, ...prev].slice(0, 12));
    setError('');
    setDeliveryMessage('Photo uploaded successfully with weight details.');
    event.target.value = '';
  };

  const handleDeleteUploadedItem = (itemId) => {
    setUploadedItems((prev) => {
      const itemToRemove = prev.find((item) => item.id === itemId);
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }
      return prev.filter((item) => item.id !== itemId);
    });
  };

  const handlePostUploadedItem = (itemId) => {
    const selectedItem = uploadedItems.find((item) => item.id === itemId);

    if (!selectedItem || selectedItem.posted) {
      return;
    }

    const selectedCategory = categoryFilter === 'All Categories' ? 'Plastic' : categoryFilter;
    const postedGift = {
      giftId: `user-post-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: `Posted: ${selectedItem.name}`,
      description: `User posted this skill item photo. Weight: ${selectedItem.weight} ${selectedItem.weightUnit}.`,
      image: selectedItem.previewUrl,
      category: selectedCategory,
      isUserPost: true,
      claimed: false,
    };

    setPostedGifts((prev) => [postedGift, ...prev]);
    setUploadedItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, posted: true } : item))
    );
    setSuccessPopupMessage('Success! Photo posted to gifts section.');
    setTimeout(() => {
      setSuccessPopupMessage('');
    }, 2200);
  };

  const visibleGifts = useMemo(() => {
    return gifts.filter((gift) => {
      const giftCategory = getGiftCategory(gift);
      const matchesCategory = categoryFilter === 'All Categories' || giftCategory === categoryFilter;

      return matchesCategory;
    });
  }, [gifts, categoryFilter]);

  const visiblePostedGifts = useMemo(() => {
    return postedGifts.filter((gift) =>
      categoryFilter === 'All Categories' || gift.category === categoryFilter
    );
  }, [postedGifts, categoryFilter]);

  const emptyStateMessage = 'No gifts found for the selected category.';

  const featuredGifts = [
    {
      giftId: 'featured-1',
      title: 'Plastic Utility Storage Basket',
      description: 'Lightweight plastic utility basket for daily household storage use.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6yzzjV5dLW7BzyBDxrqNKRBlsT8dhTkMjgw&s',
      category: 'Plastic',
      price: 449,
      isFeatured: true,
    },
    {
      giftId: 'featured-2',
      title: 'Clay Handi Pot',
      description: 'Traditional clay handi pot suitable for cooking and kitchen decor.',
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/2/385566234/NZ/WQ/FC/70598361/clayhandi-500x500.jpg',
      category: 'Ceramic',
      price: 399,
      isFeatured: true,
    },
    {
      giftId: 'featured-3',
      title: 'Plastic Insulated Water Jug',
      description: 'Leak-proof insulated water jug with inner steel body and easy carry design.',
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/12/469605647/RH/MA/KN/120990192/plastic-insulated-water-jug-thermos-jug-inner-stainless-steel-jug-leak-proof-jug-easy-to-carry-250x250.jpeg',
      category: 'Plastic',
      price: 299,
      isFeatured: true,
    },
    {
      giftId: 'featured-4',
      title: 'Plastic Storage Basket Box',
      description: 'Small plastic storage basket box with handle for home essentials.',
      image: 'https://rukminim2.flixcart.com/image/300/300/xif0q/storage-basket/s/e/l/1-plastic-storage-small-basket-box-with-handle-for-puja-toy-book-original-imaghzkyp83pvugz.jpeg',
      category: 'Plastic',
      price: 249,
      isFeatured: true,
    },
    {
      giftId: 'featured-5',
      title: 'Designer Plastic Water Bottle',
      description: 'Portable designer plastic water bottle for travel and daily use.',
      image: 'https://5.imimg.com/data5/SELLER/Default/2026/1/572544919/UE/IJ/DF/61733394/designer-plastic-water-bottle-500x500.jpeg',
      category: 'Plastic',
      price: 349,
      isFeatured: true,
    },
    {
      giftId: 'featured-6',
      title: 'Plastic Mug',
      description: 'Durable plastic mug ideal for kitchen and bathroom daily needs.',
      image: 'https://cpimg.tistatic.com/11589489/b/4/Plastic-Mug..png',
      category: 'Plastic',
      price: 499,
      isFeatured: true,
    },
    {
      giftId: 'featured-7',
      title: 'Plastic Home Storage Item',
      description: 'Multi-use plastic home storage item for organizing daily accessories.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnPEpraEJRF1cZHuLdMpvuJUqlOYydJ8pIjA&s',
      category: 'Plastic',
      price: 379,
      isFeatured: true,
    },
    {
      giftId: 'featured-8',
      title: 'Artificial Flower Set',
      description: 'Multicolor artificial flower set for home decoration and gifting.',
      image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/artificial-flower/i/s/n/2-set-of-02-multicolor-artificial-flower-for-home-decoration-s-original-imagjntnunku7tzc.jpeg?q=90',
      category: 'Cosmetic',
      price: 599,
      isFeatured: true,
    },
    {
      giftId: 'featured-9',
      title: 'Plastic Household Container',
      description: 'Compact plastic household container for neat utility storage.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Ohze1ZXxBSBD_p6uQSIFjALC2ShedDJ3Iw&s',
      category: 'Plastic',
      price: 219,
      isFeatured: true,
    },
    {
      giftId: 'featured-10',
      title: 'Polyethylene Kitchen Strainer',
      description: 'Small plastic kitchen strainer for rinsing and draining ingredients.',
      image: 'https://www.globalkitchenjapan.com/cdn/shop/products/SankoPolyethyleneStrainerSmall4863010_1.jpg?v=1756273816&width=375',
      category: 'Plastic',
      price: 329,
      isFeatured: true,
    },
    {
      giftId: 'featured-11',
      title: 'Craft Paper Storage Box',
      description: 'Foldable paper storage box for tidy home organization.',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&h=630&fit=crop',
      category: 'Paper',
      price: 259,
      isFeatured: true,
    },
    {
      giftId: 'featured-12',
      title: 'Cotton Kitchen Towels',
      description: 'Soft cloth towel set made from recycled cotton fabric.',
      image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1200&h=630&fit=crop',
      category: 'Cloths',
      price: 279,
      isFeatured: true,
    },
    {
      giftId: 'featured-13',
      title: 'Metal Utility Rack',
      description: 'Strong iron rack for kitchen and utility space use.',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&h=630&fit=crop',
      category: 'Iron',
      price: 899,
      isFeatured: true,
    },
    {
      giftId: 'featured-14',
      title: 'Eco Beauty Pouch',
      description: 'Travel cosmetic pouch produced with reused material.',
      image: 'https://images.unsplash.com/photo-1596704017254-9df7c3f6f3f4?w=1200&h=630&fit=crop',
      category: 'Cosmetic',
      price: 239,
      isFeatured: true,
    },
    {
      giftId: 'featured-15',
      title: 'Recycled Plastic Organizer',
      description: 'Compact organizer tray made from recycled plastic blend.',
      image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=1200&h=630&fit=crop',
      category: 'Plastic',
      price: 329,
      isFeatured: true,
    },
    {
      giftId: 'featured-16',
      title: 'Sustainable Journal Set',
      description: 'Journaling set with textured paper and eco ink pens.',
      image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=1200&h=630&fit=crop',
      category: 'Paper',
      price: 369,
      isFeatured: true,
    },
    {
      giftId: 'featured-17',
      title: 'Upcycled Denim Pouch',
      description: 'Utility pouch stitched from durable old denim cloth.',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&h=630&fit=crop',
      category: 'Cloths',
      price: 289,
      isFeatured: true,
    },
    {
      giftId: 'featured-18',
      title: 'Ceramic Serving Bowl',
      description: 'Hand-thrown ceramic bowl for serving and dining.',
      image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=1200&h=630&fit=crop',
      category: 'Ceramic',
      price: 419,
      isFeatured: true,
    },
    {
      giftId: 'featured-19',
      title: 'Iron Plant Stand',
      description: 'Elegant iron stand for balcony and indoor plant pots.',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&h=630&fit=crop',
      category: 'Iron',
      price: 759,
      isFeatured: true,
    },
    {
      giftId: 'featured-20',
      title: 'Eco Footwear Kit',
      description: 'Refreshed old shoes combo with cleaned reusable pairs.',
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&h=630&fit=crop',
      category: 'Old Shoes',
      price: 699,
      isFeatured: true,
    },
    {
      giftId: 'featured-21',
      title: 'Handmade Cosmetic Brush Case',
      description: 'Compact brush holder case designed for daily makeup kits.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&h=630&fit=crop',
      category: 'Cosmetic',
      price: 269,
      isFeatured: true,
    },
    {
      giftId: 'featured-22',
      title: 'Wicker Basket Set',
      description: 'Handwoven wicker baskets made with rattan and bamboo for storage and decor.',
      image: 'https://www.shutterstock.com/image-photo/wicker-baskets-made-rattan-bamboo-260nw-2437410651.jpg',
      category: 'Cloths',
      price: 459,
      isFeatured: true,
    },
    {
      giftId: 'featured-23',
      title: 'Handwoven Storage Basket',
      description: 'Traditional woven basket for home storage and utility use.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTra6_BfvOXBlK2PICMV2b95IzoV3ue10hTZQ&s',
      category: 'Cloths',
      price: 429,
      isFeatured: true,
    },
    {
      giftId: 'featured-24',
      title: 'Bamboo Utility Basket',
      description: 'Compact bamboo basket suitable for shelf organization and decor.',
      image: 'https://m.media-amazon.com/images/I/41Yn4KTI9cL.jpg',
      category: 'Cloths',
      price: 389,
      isFeatured: true,
    },
  ];

  const featuredVisible = featuredGifts.filter((gift) =>
    categoryFilter === 'All Categories' || gift.category === categoryFilter
  );

  const cardsToRender = [...visiblePostedGifts, ...featuredVisible, ...visibleGifts];

  return (
    <section className="gift-page">
      {successPopupMessage ? <div className="gift-success-popup">{successPopupMessage}</div> : null}
      <div className="gift-header">
        <h1>Gifts Section</h1>
        <p>
          Claim eco-friendly rewards based on your recycled total. Total gifts: {gifts.length}
        </p>

        <div className="gift-toolbar">
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="gift-filter-select"
          >
            <option value="All Categories">All Categories</option>
            <option value="Plastic">Plastic</option>
            <option value="Iron">Iron</option>
            <option value="Cosmetic">Cosmetic</option>
            <option value="Paper">Paper</option>
            <option value="Cloths">Cloths</option>
            <option value="Old Shoes">Old Shoes</option>
            <option value="Ceramic">Ceramic</option>
          </select>
        </div>

        <form id="gift-delivery-form" className="gift-delivery-form" onSubmit={handleDeliverySubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Name"
            value={deliveryForm.fullName}
            onChange={handleDeliveryInputChange}
            className="gift-add-input"
            required
          />
          <input
            type="tel"
            name="phone"
            maxLength="10"
            placeholder="Phone No"
            value={deliveryForm.phone}
            onChange={handleDeliveryInputChange}
            className="gift-add-input"
            required
          />
          <input
            type="tel"
            name="confirmPhone"
            maxLength="10"
            placeholder="Confirm Phone"
            value={deliveryForm.confirmPhone}
            onChange={handleDeliveryInputChange}
            className="gift-add-input"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={deliveryForm.address}
            onChange={handleDeliveryInputChange}
            className="gift-add-input"
            required
          />
          <input
            type="text"
            name="block"
            placeholder="Block"
            value={deliveryForm.block}
            onChange={handleDeliveryInputChange}
            className="gift-add-input"
            required
          />
          <input
            type="text"
            name="pinCode"
            maxLength="6"
            placeholder="PIN Code"
            value={deliveryForm.pinCode}
            onChange={handleDeliveryInputChange}
            className="gift-add-input"
            required
          />
        </form>

        <div className="gift-photo-upload-row">
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="Weight (KG)"
            value={weightKg}
            onChange={(event) => setWeightKg(event.target.value)}
            className="gift-add-input"
          />
          <label className="gift-upload-btn" htmlFor="gift-photo-upload">
            Upload Photo
          </label>
          <input
            id="gift-photo-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            hidden
          />
        </div>

        <div className="gift-header-actions">
          <button
            type="submit"
            form="gift-delivery-form"
            className="gift-claim-btn gift-submit-form-btn"
            disabled={isSubmittingDelivery}
          >
            {isSubmittingDelivery ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>

      </div>

      {error ? <div className="gift-empty-state"><p>{error}</p></div> : null}
      {deliveryMessage ? <div className="gift-success-state"><p>{deliveryMessage}</p></div> : null}

      {uploadedItems.length > 0 ? (
        <div className="gift-uploaded-section">
          <h3>Uploaded Photos Preview</h3>
          <div className="gift-uploaded-layout">
            <div className="gift-uploaded-left">
              <div className="gift-uploaded-grid">
                {uploadedItems.map((item) => (
                  <figure key={item.id} className="gift-uploaded-card">
                    <img src={item.previewUrl} alt={item.name} className="gift-uploaded-image" />
                    <figcaption>
                      <span className="gift-uploaded-name">{item.name}</span>
                      <span className="gift-uploaded-weight">Weight: {item.weight} {item.weightUnit}</span>
                      <button
                        type="button"
                        className="gift-uploaded-delete-btn"
                        onClick={() => handleDeleteUploadedItem(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="gift-uploaded-post-btn"
                        onClick={() => handlePostUploadedItem(item.id)}
                        disabled={item.posted}
                      >
                        {item.posted ? 'Posted' : 'Post Photo'}
                      </button>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="gift-uploaded-right">
              <p className="gift-uploaded-note">Click here to upload any additional photos.</p>
            </div>
          </div>
        </div>
      ) : null}

      {isLoading ? (
        <div className="gift-empty-state">
          <p>Loading gifts...</p>
        </div>
      ) : cardsToRender.length === 0 ? (
        <div className="gift-empty-state">
          <p>{emptyStateMessage}</p>
        </div>
      ) : (
        <div className="gift-grid">
          {cardsToRender.map((gift) => (
            <div key={gift.giftId} className="gift-card">
              <div className="gift-image-container">
                <img
                  src={gift.image || getFallbackImage(gift.giftId)}
                  alt={gift.title}
                  className="gift-image"
                  onError={(event) => {
                    const fallbackImage = getFallbackImage(gift.giftId);
                    if (event.currentTarget.src !== fallbackImage) {
                      event.currentTarget.src = fallbackImage;
                    }
                  }}
                />
              </div>
              <div className="gift-content">
                <h3 className="gift-title">{gift.title}</h3>
                <p className="gift-description">{gift.description}</p>
                <p className="gift-status-text">
                  Category: {gift.category || getGiftCategory(gift)}
                </p>
                <button
                  type="button"
                  className="gift-claim-btn"
                  onClick={() => handleClaimGift(gift.giftId)}
                  disabled={gift.isUserPost || gift.claimed || claimingGiftId === gift.giftId}
                >
                  {gift.isUserPost
                    ? 'Posted Item'
                    : gift.claimed
                    ? 'Already Claimed'
                    : claimingGiftId === gift.giftId
                      ? 'Claiming...'
                      : 'Claim Gift'}
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
