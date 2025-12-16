const { Model } = require("objection");
const moment = require('moment');

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
            LISTING_ID :'listingId',
            HOST_ID:'hostId',
            GUEST_ID:'guestId',
            START_DATE:'startDate',
            END_DATE:'endDate',
            CREATED_AT:'createdAt',
            STATUS_ID:'statusId',
            ADDITIONAL_INFO:'additionalInfo',
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 
                BookingModel.Fields.LISTING_ID, 
                BookingModel.Fields.HOST_ID, 
                BookingModel.Fields.GUEST_ID, 
                BookingModel.Fields.START_DATE,
                BookingModel.Fields.END_DATE,
            ],
            properties: {
                [BookingModel.Fields.ID]: { type: 'string', maxLength: 21 },
                [BookingModel.Fields.LISTING_ID]: { type: 'string', maxLength: 21 },
                [BookingModel.Fields.HOST_ID]: { type: 'string', maxLength: 21 },
                [BookingModel.Fields.GUEST_ID]: { type: 'string', maxLength: 21 },
                [BookingModel.Fields.START_DATE]: { type: 'string', format: 'date' },
                [BookingModel.Fields.END_DATE]: { type: 'string', format: 'date' },
                [BookingModel.Fields.CREATED_AT]: { type: 'string', format: 'date-time' },
                [BookingModel.Fields.STATUS_ID]: { type: 'integer', default: 6 },
                [BookingModel.Fields.ADDITIONAL_INFO]: { type: 'string', maxLength: 21 },
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

    $parseDatabaseJson(json){

        json = super.$parseDatabaseJson(json);

        json[BookingModel.Fields.START_DATE] = moment(json[BookingModel.Fields.START_DATE]).format('YYYY-MM-DD');
        json[BookingModel.Fields.END_DATE] = moment(json[BookingModel.Fields.END_DATE]).format('YYYY-MM-DD');
        json[BookingModel.Fields.CREATED_AT] = moment(json[BookingModel.Fields.CREATED_AT]).format('YYYY-MM-DD');
        json.startDateMiliSeconds = moment(json[BookingModel.Fields.START_DATE]).valueOf();
        json.endDateMiliSeconds = moment(json[BookingModel.Fields.END_DATE]).valueOf();

        console.log(json)

        return json;
    }

    $formatJson(json) {
        //to client
        const formattedJson = super.$formatJson(json);

        return formattedJson;
    }



}

module.exports = BookingModel;