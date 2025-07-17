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

    $parseDatabaseJson(json){

        json = super.$parseDatabaseJson(json);

        json[HouseRulesMap.Fields.IS_ALLOWED] = json[HouseRulesMap.Fields.IS_ALLOWED] === 1 ? true : false;

        return json
    }

    $formatJson(json) {

        const formattedJson = super.$formatJson(json);

        formattedJson.ruleName = json.houseRules ? json.houseRules.ruleName : null;
        formattedJson.icon = json.houseRules ? json.houseRules.icon : null;
        delete formattedJson.houseRules;
        delete formattedJson.listingId;

        return formattedJson
    }
};

module.exports = {
    HouseRulesMap,
    HouseRules
};