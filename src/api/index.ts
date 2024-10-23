import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import catatan from './catatan';
import { requireAuth } from '../middlewares';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

router.use('/catatan', requireAuth, catatan);

export default router;
