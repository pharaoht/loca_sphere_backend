const Utils = require('../../src/utility'); // adjust path

describe('sqmToSqFt function', () => {

    it('should throw an error when input is not of type number', () => {
        expect(() => Utils.sqmToSqFt('100')).toThrow('Invalid input: sqm must be a non-negative number');
        expect(() => Utils.sqmToSqFt(null)).toThrow('Invalid input: sqm must be a non-negative number');
        expect(() => Utils.sqmToSqFt(undefined)).toThrow('Invalid input: sqm must be a non-negative number');
    });

    it('should throw an error when input is less than 0', () => {
        expect(() => Utils.sqmToSqFt(-5)).toThrow('Invalid input: sqm must be a non-negative number');
    });

    it('should return a number', () => {
        const result = Utils.sqmToSqFt(10);
        expect(typeof result).toBe('number');
        expect(result).toBeCloseTo(107.639, 3); // precise check with tolerance
    });
});

describe('calculateSecurityDeposit function', () => {

    it('should throw an error when price is not a number', () => {
        expect(() => Utils.calculateSecurityDeposit('abc')).toThrow('Invalid input: price must be a non-negative number');
    });

    it('should throw an error when price is negative', () => {
        expect(() => Utils.calculateSecurityDeposit(-500)).toThrow('Invalid input: price must be a non-negative number');
    });

    it('should return price * default percentage when only price is provided', () => {
        const result = Utils.calculateSecurityDeposit(1000);
        expect(result).toBe(1100); // 1000 * 1.1
    });

    it('should return price * provided percentage when both are provided', () => {
        const result = Utils.calculateSecurityDeposit(1000, 1.2);
        expect(result).toBe(1200);
    });
});

describe('calculateAdminFee function', () => {

    it('should throw an error when price is not a number', () => {
        expect(() => Utils.calculateAdminFee('abc')).toThrow('Invalid input: price must be a non-negative number');
    });

    it('should throw an error when price is negative', () => {
        expect(() => Utils.calculateAdminFee(-200)).toThrow('Invalid input: price must be a non-negative number');
    });

    it('should throw an error when percentage is not a number', () => {
        expect(() => Utils.calculateAdminFee(1000, 'abc')).toThrow('Invalid input: percentage must be between 0 and 1');
    });

    it('should return price * default percentage when only price is provided', () => {
        const result = Utils.calculateAdminFee(1000);
        expect(result).toBe(900); // 1000 * 0.9
    });

    it('should return price * provided percentage when both are provided', () => {
        const result = Utils.calculateAdminFee(2000, 0.1);
        expect(result).toBe(200);
    });
});
