class Utility {

    static sqmToSqFt(sqm) {
        if (typeof sqm !== 'number' || sqm < 0) {
            throw new Error('Invalid input: sqm must be a non-negative number');
        }
        return sqm * 10.7639; // 1 square meter = 10.7639 square feet
    }

    static calculateSecurityDeposit(price, percentage = 0.1) {

        if (typeof price !== 'number' || price < 0) {
            throw new Error('Invalid input: price must be a non-negative number');
        }

        if (typeof percentage !== 'number' || percentage < 0 || percentage > 1) {
            throw new Error('Invalid input: percentage must be between 0 and 1');
        }

        return price * percentage;
    }

    static calculateAdminFee(price, percentage = 0.05) {

        if (typeof price !== 'number' || price < 0) {
            throw new Error('Invalid input: price must be a non-negative number');
        }

        if (typeof percentage !== 'number' || percentage < 0 || percentage > 1) {
            throw new Error('Invalid input: percentage must be between 0 and 1');
        }

        return price * percentage;
    }
};

module.exports = Utility;