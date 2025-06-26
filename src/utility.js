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
};

module.exports = Utility;