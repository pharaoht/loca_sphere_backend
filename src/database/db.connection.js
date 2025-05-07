const mysql = require('mysql2');

require('dotenv').config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const DATABASENAME = process.env.DATABASENAME;
const DATABASEPASSWORD = process.env.DATABASEPASSWORD;

const pool = mysql.createPool({
    host: HOST,
    user: USER,
    port: 25371,
    database: DATABASENAME,
    password: DATABASEPASSWORD,

});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.info('*** MySQL Connected ✅ ***');

  // Release the connection back to the pool
  connection.release();
});

// Listen for connection errors
pool.on('error', (err) => {
  console.error('*** MySQL pool error: ***', err);
});

// Listen for pool reconnections
pool.on('connection', (connection) => {
  console.info('*** MySQL Reconnected ***');
});

// Listen for pool disconnections
pool.on('acquire', (connection) => {
  console.info('*** MySQL Acquired ***');
});

// Listen for pool release events
pool.on('release', (connection) => {
  console.info('*** MySQL Connection Released ***');
});

module.exports = pool.promise();