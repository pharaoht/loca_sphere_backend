// jest.setup.js
require('dotenv').config({ path: '.env.test' });

// You can also set fallback values if needed:
process.env.GOOGLE_CLIENT_ID ||= 'fake-client-id';
process.env.GOOGLE_CLIENT_SECRET ||= 'fake-client-secret';
process.env.GOOGLE_REDIRECT_URI ||= 'http://localhost:3000/auth/google/callback';
