import mongoose from 'mongoose';

const giftSchema = new mongoose.Schema(
  {
    giftId: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    claimed: { type: Boolean, default: false },
    claimedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Gift = mongoose.model('Gift', giftSchema);

export default Gift;
