const { Model } = require("objection");

const nanoid = async () => {
  const { nanoid } = await import('nanoid');
  return nanoid(19);
};

class BookingStatus extends Model {
    static get tableName(){
        return 'BookingStatuses'
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){
        return {
            ID: 'id',
            STATUSNAME: 'statusName'
        }
    }
}

class BookingModel extends Model {

    static get tableName(){
        return 'Bookings'
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID :'id',
            LISTINGID :'listingId',
            HOSTID:'hostId',
            GUESTID:'guestId',
            STARTDATE:'startDate',
            ENDDATE:'endDate',
            CREATEDAT:'createdAt',
            STATUSID:'statusId',
            ADDITIONALINFO:'additionalInfo',
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 
                BookingModel.Fields.LISTINGID, 
                BookingModel.Fields.HOSTID, 
                BookingModel.Fields.GUESTID, 
                BookingModel.Fields.STARTDATE,
                BookingModel.Fields.ENDDATE,
            ],
            properties: {
                [BookingModel.Fields.ID]: { type: 'string', maxLength: 21 },
                [BookingModel.Fields.LISTINGID]: { type: 'string', maxLength: 21 },
                [BookingModel.Fields.HOSTID]: { type: 'string', maxLength: 21 },
                [BookingModel.Fields.GUESTID]: { type: 'string', maxLength: 21 },
                [BookingModel.Fields.STARTDATE]: { type: 'string', format: 'date' },
                [BookingModel.Fields.ENDDATE]: { type: 'string', format: 'date' },
                [BookingModel.Fields.CREATEDAT]: { type: 'string', format: 'date-time' },
                [BookingModel.Fields.STATUSID]: { type: 'integer', default: 6 },
                [BookingModel.Fields.ADDITIONALINFO]: { type: 'string', maxLength: 21 },
            },
        };
    }

    static get relationMappings() {
        
        return {
            status: Model.HasOneRelation,
            modelClass: BookingStatus,
            join: {
                from: '',
                to: ''
            }
        }
    }

    async $beforeInsert(queryContext) {

        await super.$beforeInsert(queryContext);
        
        this[BookingModel.Fields.ID] = `bk${await nanoid()}`;

    }

    $formatJson(json) {
        //to client
        const formattedJson = super.$formatJson(json);

        return formattedJson;
    }



}

module.exports = BookingModel;