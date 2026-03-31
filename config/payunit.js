import { PayunitClient } from '@payunit/nodejs-sdk';

const createPayunitClient = () => {
  const mode = process.env.MODE === 'live' ? 'live' : 'test';

  console.log('🔧 PayUnit mode:', mode);

  if (!process.env.PAYUNIT_API_KEY) {
    throw new Error('PAYUNIT_API_KEY is missing');
  }

  const client = new PayunitClient({
    apiKey: process.env.PAYUNIT_API_KEY,
    username: process.env.PAYUNIT_USERNAME,
    password: process.env.PAYUNIT_PASSWORD,
    mode: mode
  });

  console.log('✅ PayUnit client created');

  return client;
};

export default createPayunitClient;