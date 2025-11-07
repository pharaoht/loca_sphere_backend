const fs = require('fs');
const moment = require('moment');

class Utility {

    static sqmToSqFt(sqm) {
        if (typeof sqm !== 'number' || sqm < 0) {
            throw new Error('Invalid input: sqm must be a non-negative number');
        }
        return sqm * 10.7639; // 1 square meter = 10.7639 square feet
    }

    static calculateSecurityDeposit(price, percentage = 1.1) {

        if (isNaN(price) || price < 0) {
            throw new Error('Invalid input: price must be a non-negative number');
        }

        return  Number(price) * Number(percentage);
    }

    static calculateAdminFee(price, percentage = 0.05) {

        if (isNaN(price) || price < 0) {
            throw new Error('Invalid input: price must be a non-negative number');
        }

        if (isNaN(percentage)) {
            throw new Error('Invalid input: percentage must be between 0 and 1');
        }

        return Number(price) * Number(percentage);
    }

    static deleteFileFromFs(pathToFile){
        fs.unlink(pathToFile, (err) => {

            if (err){
                console.error('Failed to delete local file:', err);

                return false;
            }

            console.log('file deleted from local');

            return true
        });
    };

    static dateValidation(moveIn = '', moveOut = '',){

        if(!moveIn || !moveOut){
            throw new Error('params: moveIn, moveOut must be provided');
        }


        const isMoveInValid = moment(moveIn, 'YYYY-MM-DD', true).isValid();
        const isMoveOutValid = moment(moveOut, 'YYYY-MM-DD', true).isValid();

        if(!isMoveInValid || !isMoveOutValid){
            return false;
        }

        const formatMoveInDate = moment(moveIn)
        const formatMoveOutDate = moment(moveOut);
   
        //check if dates are in the past
        if(formatMoveInDate.isBefore(moment(), 'day') || formatMoveOutDate.isBefore(moment(), 'day')){

            return false;
        }
        //check if moveIn is greater than moveOut
        if(!formatMoveInDate.isBefore(formatMoveOutDate)){

            return false;
        }

        return true;
    }
};

module.exports = Utility;
