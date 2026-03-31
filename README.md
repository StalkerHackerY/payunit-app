# PayUnit Express Backend API

🚀 **Complete Node.js Express backend with PayUnit Mobile Money integration** (MTN/Orange Cameroon)

## ✨ Features
- ✅ ES Modules (modern Node.js)
- ✅ Production-ready error handling
- ✅ Input validation (phone, amount)
- ✅ Test/Live mode switching
- ✅ Payment initiation (`/api/pay`)
- ✅ Transaction status (`/api/status/:id`)
- ✅ Webhook handler (`/api/webhook`)
- ✅ In-memory transaction storage (easy testing)

## 📁 Folder Structure
```
payunit-app/
├── app.js                 # Main server
├── config/
│   └── payunit.js         # PayUnit client config
├── controllers/
│   └── paymentController.js
├── routes/
│   └── paymentRoutes.js
├── utils/
│   └── validators.js
├── webhooks/
│   └── paymentWebhook.js
├── .env.example          # Copy to .env
├── package.json
└── README.md
```

## 🚀 Quick Start

1. **Install dependencies**
```bash
cd payunit-app
npm install
```

2. **Setup environment** (get credentials from [PayUnit Dashboard](https://dashboard.payunit.com))
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Start server**
```bash
npm start
# or npm run dev (with nodemon)
```

4. **Test server** `http://localhost:3000/`

## 🔑 Environment Variables (.env)
```
PAYUNIT_API_KEY=your_api_key
PAYUNIT_USERNAME=your_username
PAYUNIT_PASSWORD=your_password
MODE=test  # or live
PORT=3000
```

## 📋 API Endpoints

### 1. Initiate Payment `POST /api/pay`
**Body:**
```json
{
  "phone": "6912345678", 
  "amount": 5000,
  "network": "CM_MTNMOMO"  // or CM_ORANGE
}
```

**Response:**
```json
{
  "success": true,
  "transaction_id": "txn_abc123...",
  "message": "Payment initiated successfully",
  "data": { ...payunit_response }
}
```

### 2. Check Status `GET /api/status/:transaction_id`
```
GET /api/status/txn_abc123
```

### 3. Webhook `POST /api/webhook`
**PayUnit will send notifications automatically**

**Test webhook:** `GET /api/webhook/transactions`

## 🧪 Postman Collection (Raw JSON)

**Payment Initiation:**
```
POST http://localhost:3000/api/pay
Content-Type: application/json

{
  "phone": "6912345678",
  "amount": 5000,
  "network": "CM_MTNMOMO"
}
```

**Status Check:**
```
GET http://localhost:3000/api/status/txn_abc123
```

## 🛠️ Development

```bash
npm run dev    # Auto-restart on changes
npm start      # Production
```

## 📱 Supported Networks
- `CM_MTNMOMO` (MTN Cameroon)
- `CM_ORANGE` (Orange Cameroon)

## ⚠️ Production Notes
- Replace in-memory storage with PostgreSQL/MongoDB
- Add rate limiting (express-rate-limit)
- Add CORS (cors middleware)
- Use HTTPS/SSL
- Add authentication/JWT
- Deploy to Railway/Heroku/Vercel

## 🔗 PayUnit Docs
- [PayUnit Node.js SDK](https://docs.payunit.com/sdks/nodejs)
- [Mobile Money API](https://docs.payunit.com/api-reference/mobile-money)

**Ready for production! 🎉**

