import axios from 'axios';

const BASE_URL = 'https://gateway.payunit.net';

// 🔐 AUTH
const getAuth = () => {
  return Buffer.from(
    `${process.env.PAYUNIT_USERNAME}:${process.env.PAYUNIT_PASSWORD}`
  ).toString('base64');
};

export const initiatePayment = async (req, res) => {
  try {
    const { phone, gateway } = req.body;

    const amount = 10000; // 🔥 FIXE

    const transaction_id = 'TXN_' + Date.now();
    const auth = getAuth();

    // =========================
    // 1️⃣ INITIALIZE
    // =========================
    await axios.post(
      `${BASE_URL}/api/gateway/initialize`,
      {
        transaction_id,
        total_amount: amount,
        currency: 'XAF'
      },
      {
        headers: {
          'x-api-key': process.env.PAYUNIT_API_KEY,
          'mode': process.env.MODE || 'live',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        }
      }
    );

    // =========================
    // 2️⃣ MAKE PAYMENT
    // =========================
    const response = await axios.post(
      `${BASE_URL}/api/gateway/makepayment`,
      {
        gateway,
        amount,
        transaction_id,
        return_url: 'https://webhook.site/test-return',
        phone_number: phone,
        currency: 'XAF',
        paymentType: 'button',
        notify_url: 'https://webhook.site/test-notify'
      },
      {
        headers: {
          'x-api-key': process.env.PAYUNIT_API_KEY,
          'mode': process.env.MODE || 'live',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        }
      }
    );

    res.json({
      success: true,
      transaction_id,
      data: response.data
    });

  } catch (error) {
    console.error('❌ PAYMENT ERROR:', error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: 'Payment failed',
      details: error.response?.data || error.message
    });
  }
};

// STATUS
export const getTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const auth = getAuth();

    const response = await axios.get(
      `${BASE_URL}/api/gateway/transaction/${id}`,
      {
        headers: {
          'x-api-key': process.env.PAYUNIT_API_KEY,
          'mode': process.env.MODE || 'live',
          'Authorization': `Basic ${auth}`
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    res.status(500).json({
      error: 'Failed to get transaction status'
    });
  }
};