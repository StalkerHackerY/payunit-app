# PayUnit Backend Fixes & Improvements TODO

**Status: 4/6 complete** ✅

1. [x] Update package.json - ES modules, correct main/scripts
2. [x] Update utils/validators.js - Strict MTN 6XXXXXXXX validation
3. [x] Update controllers/paymentController.js - Network validation + exported shared transactions Map
4. [x] Update webhooks/paymentWebhook.js - Uses shared storage, proper SUCCESS/FAILED handling
5. [ ] Test server - Execute `cd payunit-app && npm install && npm start`
6. [ ] Final verification & cleanup
