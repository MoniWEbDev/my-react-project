import { Router } from 'express';
import {
	claimGift,
	createGift,
	getAllGifts,
	resetAllGiftClaims,
} from '../controllers/giftController.js';

const router = Router();

router.get('/', getAllGifts);
router.post('/', createGift);
router.post('/:giftId/claim', claimGift);
router.post('/reset-claims', resetAllGiftClaims);

export default router;
