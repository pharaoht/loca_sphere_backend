require('dotenv').config({ path: '.env.test' });
const redis = require('./src/services/cache/redis.cache');
const database = require('./src/database/db.connect');

process.env.GOOGLE_CLIENT_ID ||= 'fake-client-id';
process.env.GOOGLE_CLIENT_SECRET ||= 'fake-client-secret';
process.env.GOOGLE_REDIRECT_URI ||= 'http://localhost:3000/auth/google/callback';


afterAll(async () => {
  console.log('hiii')
  if (redis && typeof redis.quit === 'function') {
    await redis.quit();
    await database.close();
    console.log('🧹 Redis connection closed after tests');
  }
});
