import { Router } from 'express';
import { initiatePayment, getTransactionStatus } from '../controllers/paymentController.js';

const router = Router();

// ✅ SANS amount (sécurisé)
function validatePayRequest(req, res, next) {
  const { phone, gateway } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone is required' });
  }

  if (!gateway) {
    return res.status(400).json({ error: 'Gateway is required' });
  }

  next();
}

router.post('/pay', validatePayRequest, initiatePayment);
router.get('/status/:id', getTransactionStatus);

export default router;