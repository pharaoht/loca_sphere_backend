const Knex = require('knex');
const { Model } = require('objection');

require('dotenv').config();

const dbConfig = {
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.DATABASEPASSWORD,
        database: process.env.DATABASENAME,
        port: process.env.DATABASEPORT || 25371,
    },
    pool: {
        min: 2,
        max: 10,
        afterCreate: (conn, done) => {
            console.info('✅ New MySQL connection created');
            done(null, conn);
        },
        create: (conn) => {
            console.log('✅ Connection acquired');
            return conn;
        },
        
    },
};

class Database {
    constructor() {
        this.knex = null;
    }

    connect() {
        if (!this.knex) {

            this.knex = Knex(dbConfig);
            Model.knex(this.knex);
            console.log('✅ Database connected');
        }
        return this.knex;
    }

    async close() {
        if (this.knex) {
            
            await this.knex.destroy();
            console.log('🧹 Database connection closed');
            this.knex = null;
        }
    }
}

module.exports = new Database();

