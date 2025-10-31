require('dotenv').config();
const http = require('http');
const app = require('./app');
const redis = require('./services/cache/redis.cache');
const databse = require('./database/db.connect')

const PORT = process.env.PORT || 8000;

(async () => {

    try {

        await redis.connect();
        await databse.connect();

        const server = http.createServer(app);

        server.listen(PORT, () => {
            console.log('✅ Server Ready and...');
            console.log(`✅ Listening on port ${PORT}...`);
        });

    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
    
})();
