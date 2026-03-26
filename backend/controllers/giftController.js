import Gift from '../models/Gift.js';
import defaultGifts from '../data/defaultGifts.js';

const seedGiftsIfNeeded = async () => {
  const existingGiftIds = await Gift.find({}, { giftId: 1, _id: 0 });
  const existingIdSet = new Set(existingGiftIds.map((gift) => gift.giftId));
  const missingDefaultGifts = defaultGifts.filter((gift) => !existingIdSet.has(gift.giftId));

  if (missingDefaultGifts.length > 0) {
    await Gift.insertMany(missingDefaultGifts);
  }
};

export const getAllGifts = async (_req, res) => {
  try {
    await seedGiftsIfNeeded();

    const gifts = await Gift.find().sort({ giftId: 1 });
    return res.status(200).json({ gifts });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch gifts.', error: error.message });
  }
};

export const createGift = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ message: 'Title, description, and image are required.' });
    }

    await seedGiftsIfNeeded();

    const latestGift = await Gift.findOne().sort({ giftId: -1 });
    const nextGiftId = latestGift ? latestGift.giftId + 1 : 1;

    const newGift = await Gift.create({
      giftId: nextGiftId,
      title: String(title).trim(),
      description: String(description).trim(),
      image: String(image).trim(),
      claimed: false,
      claimedAt: null,
    });

    return res.status(201).json({ message: 'Gift added successfully.', gift: newGift });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add gift.', error: error.message });
  }
};

export const claimGift = async (req, res) => {
  try {
    const { giftId } = req.params;

    const updatedGift = await Gift.findOneAndUpdate(
      { giftId: Number(giftId), claimed: false },
      { claimed: true, claimedAt: new Date() },
      { new: true }
    );

    if (!updatedGift) {
      return res.status(404).json({ message: 'Gift not found or already claimed.' });
    }

    return res.status(200).json({ message: 'Gift claimed successfully.', gift: updatedGift });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to claim gift.', error: error.message });
  }
};

export const resetAllGiftClaims = async (_req, res) => {
  try {
    await Gift.updateMany({}, { claimed: false, claimedAt: null });
    return res.status(200).json({ message: 'All gift claims have been reset.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to reset gifts.', error: error.message });
  }
};
