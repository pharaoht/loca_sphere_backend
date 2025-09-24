const { Model } = require("objection");

class HouseRules extends Model {

    static get tableName(){
        return 'HouseRules'
    }    
    
    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            NAME: 'ruleName',
            ICON: 'icon',
        }
    }

}

class HouseRulesMap extends Model {

    static get tableName(){

        return 'ListingHouseRules';
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            LISTING_ID: 'listingId',
            RULE_ID: 'ruleId',
            IS_ALLOWED: 'isAllowed',
        }
    }

    static get relationMappings(){

        const x = `${HouseRulesMap.tableName}.${HouseRulesMap.Fields.RULE_ID}`;
        const u = `${HouseRules.tableName}.${HouseRules.Fields.ID}`;

        return {

            houseRules: {
                relation: Model.BelongsToOneRelation,
                modelClass: HouseRules,
                join: {
                    from: x,
                    to: u
                }
            }
        }
    }

    static async createRecord(data = [], ...args){
        
        const { houseRules } = data;

        if(houseRules.length === 0) return []
    
        const model = HouseRulesMap;

        const targetColumn = model.Fields.LISTING_ID;

        if(houseRules.length == 0) return;

        for(const itm of houseRules){

            if(!itm.id) await model.query().insert(itm);
            else await model.query().findById(itm.id).patch(itm);
        };
        
        return await model.query()
        .select('*')
        .where(targetColumn, houseRules[0].listingId);
    }

    $parseDatabaseJson(json){

        json = super.$parseDatabaseJson(json);

        return json
    }

    $formatJson(json) {

        const formattedJson = super.$formatJson(json);

        if(json?.houseRules) {
            formattedJson.ruleName = json.houseRules.ruleName;
            formattedJson.icon = json.houseRules.icon
            delete formattedJson.houseRules;
        }

        return formattedJson
    }


};

module.exports = {
    HouseRulesMap,
    HouseRules
};