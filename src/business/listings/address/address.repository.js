const db = require('../../../database/db.connection');

class AddressRepository {

    constructor() {
        this._tableName = 'Address';
    }

    async getAddressById(id) {

        const query = `SELECT * FROM ${this._tableName} WHERE id = ?`;

        const [rows] = await db.execute(query, [id]);

        return rows[0];
    }

    async getAddressesByCoordinatesRadius(latitude, longitude, radius = 15 * 1.60934) {

        const query = `
            SELECT 
                a.*,
                l.monthlyRent,
                l.title,
                l.currency,
                l.isChecked,
                (6371 * acos(
                    cos(radians(?)) * cos(radians(latitude)) *
                    cos(radians(longitude) - radians(?)) +
                    sin(radians(?)) * sin(radians(latitude))
                )) AS distance
            FROM ${this._tableName} AS a
            JOIN Listing AS l ON a.listingId = l.id
            HAVING distance < ?
            ORDER BY distance
            LIMIT 0, 20;
        `;

        const [rows] = await db.execute(query, [latitude, longitude, latitude, radius]);

        return rows;
    }

    async createAddress(address) {

        const query = `INSERT INTO ${this._tableName}`;
    }

};

const addressRepositoy = new AddressRepository();

module.exports = addressRepositoy