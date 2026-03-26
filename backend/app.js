import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import giftRoutes from './routes/giftRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true, message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/gifts', giftRoutes);

export default app;
