require('dotenv').config();
const http = require('http');
const app = require('./app');
const redis = require('./services/cache/redis.cache');
const database = require('./database/db.connect')

const PORT = process.env.PORT || 8000;

(async () => {

    try {

        await redis.connect();
        await database.connect();

        const server = http.createServer(app);

        server.listen(PORT, () => {
            if(redis.isConnected) console.log('✅ Redis Server connected...');
            if(database.isConnected) console.log('✅ Database Server connected...');
            console.log('✅ Server Ready and...');
            console.log(`✅ Listening on port ${PORT}...`);
        });

    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
    
})();
