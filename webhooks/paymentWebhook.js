import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    console.log('📩 Webhook received:', req.body);

    // Ici tu peux traiter le paiement (succès / échec)
    const data = req.body;

    // Exemple de logique
    if (data.status === 'SUCCESS') {
      console.log('✅ Paiement réussi');
    } else {
      console.log('❌ Paiement échoué');
    }

    res.status(200).json({
      message: 'Webhook received'
    });

  } catch (error) {
    console.error('❌ Webhook error:', error);

    res.status(500).json({
      error: error.message
    });
  }
});

export default router;