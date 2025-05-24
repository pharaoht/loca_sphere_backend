const Knex = require('knex');
const { Model } = require('objection');

require('dotenv').config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const DATABASENAME = process.env.DATABASENAME;
const DATABASEPASSWORD = process.env.DATABASEPASSWORD;

const knex = Knex({
    client: 'mysql2',
    connection: {
        host: HOST,
        user: USER,
        password: DATABASEPASSWORD,
        database: DATABASENAME,
        port: 25371
    },
    pool: {
        min: 2,
        max: 10,
        afterCreate: (conn, done) => {
            console.info('✅ New MySQL connection created');
            done(null, conn);
        }
    }
});

Model.knex(knex);

module.exports = knex;
