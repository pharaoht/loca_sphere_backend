// Load environment variables from .env
require('dotenv').config();

// Common DB environment variables
const {
  HOST,
  USER,
  DATABASENAME,
  DATABASEPASSWORD,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = process.env;

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: HOST || '127.0.0.1',
      user: USER || 'root',
      password: DATABASEPASSWORD || '',
      database: DATABASENAME || 'my_local_db',
      port: 25371,
    },
    migrations: { tableName: 'knex_migrations' },
    seeds: { directory: './seeds' },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        console.info('✅ New MySQL connection created (development)');
        done(null, conn);
      },
    },
  },

  test: {
    client: 'mysql2',
    connection: {
      host: DB_HOST || 'mysql',
      port: DB_PORT || 3306,
      user: DB_USER || 'test_user',
      password: DB_PASSWORD || 'test_pass',
      database: DB_NAME || 'test_db',
    },
    migrations: { tableName: 'knex_migrations' },
    seeds: { directory: './seeds' },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        console.info('🧪 New MySQL connection created (test)');
        done(null, conn);
      },
    },
  },

  // Uncomment when you set up production
  // production: {
  //   client: 'mysql2',
  //   connection: process.env.DATABASE_URL,
  //   migrations: { tableName: 'knex_migrations' },
  //   seeds: { directory: './seeds' },
  // },
};
