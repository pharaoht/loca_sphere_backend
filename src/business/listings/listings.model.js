const db = require('../../database/db.connection');

class ListingsModel {

    constructor(){

        this._ListingtableName = 'Listing';
        this._listingsTableColumns = null;
        this._addressTableName = 'Address';
        this._addressTableColumns = null

        this._listingsMapTable = 'ListingBedroomAmenities';
        this._listingsMapTableColumns = null

        this._bedroomAmenitiesTable = 'BedroomAmenities';
        this._bedroomAmenitiesTableColumns = null

        this._listingTypesTable = 'ListingTypes';
        this._listingTypesTableColumns = null
    }

    async initColumns(){
        this._listingsTableColumns = this.getColumnsForTable(this._ListingtableName);
        // this._addressTableColumns = await this.getColumnsForTable(this._addressTableName);
        // this._listingsMapTableColumns = await this.getColumnsForTable(this._listingsMapTable);
        // this._bedroomAmenitiesTableColumns = await this.getColumnsForTable(this._bedroomAmenitiesTable);
        // this._listingTypesTableColumns = await this.getColumnsForTable(this._listingTypesTable);
    }

    getColumnsForTable(tableName){

        const query = `SELECT column_name FROM information_schema.columns WHERE table_schema = 'loca_sphere' AND table_name = ?`;
    
        db.execute(query, [tableName])
        .then(([rows]) => {

            const set = new Set(rows.map(row => row.COLUMN_NAME));
    
            return set;
        })
        .catch(error => {
            console.error(error)
        })

    }

    formatColumns(columns, abriviation, removeColumns){


        columns.forEach((column) => {
            console.log(column);
           
        })
    }

};

new ListingsModel()


module.exports = ListingsModel;