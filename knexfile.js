require('dotenv').config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const DATABASENAME = process.env.DATABASENAME;
const DATABASEPASSWORD = process.env.DATABASEPASSWORD;

// knexfile.js
module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: HOST,
            user: USER,
            password: DATABASEPASSWORD,
            database: DATABASENAME,
            port: 25371
        },
        migrations: { tableName: 'knex_migrations' },
        seeds: { directory: './seeds' },
    },

    pool: {
        min: 2,
        max: 10,
        afterCreate: (conn, done) => {
            console.info('✅ New MySQL connection created');
            done(null, conn);
        }
    },

	test: {
		client: 'mysql2',
		connection: {
			host: process.env.TEST_DB_HOST || '127.0.0.1',
			user: process.env.TEST_DB_USER || 'root',
			password: process.env.TEST_DB_PASS || '',
			database: process.env.TEST_DB_NAME || 'my_test_db',
		},
		migrations: { tableName: 'knex_migrations' },
		seeds: { directory: './seeds' },
	},

	// production: {
	// 	client: 'mysql2',
	// 	connection: process.env.DATABASE_URL,
	// 	migrations: { tableName: 'knex_migrations' },
	// 	seeds: { directory: './seeds' },
	// },
};
