import express from 'express';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS SIMPLE
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// FRONTEND
app.use(express.static('public'));

// TEST
app.get('/api/test', (req, res) => {
  res.json({ message: 'API OK' });
});

// API
app.use('/api', paymentRoutes);

// START
app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});