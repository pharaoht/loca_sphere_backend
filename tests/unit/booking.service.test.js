const BookingService = require('../../src/business/booking/booking.service');

describe('dateStringToIsoFormat function', () => {

    it('should return false when the "dateString" parameter is falsy', () => {
        const result = BookingService.dateStringToIsoFormat(undefined);
        expect(result).toBe(false);
    });

    it('should return false when a the "dateString" parameter contains invalid delimiter', () => {
        const result = BookingService.dateStringToIsoFormat('2026.11.02');
        expect(result).toBe(false);
    });

    it('should return false when the "dateString" parameter doesnt contain 3 parts', () => {
        const result = BookingService.dateStringToIsoFormat('2026-11-0-2');
        expect(result).toBe(false);
    });

    it('should return false when "dateString" parameter contains invalid month', () => {
        const result = BookingService.dateStringToIsoFormat('2026-14-02');
        expect(result).toBe(false);
    });

    it('should return false when "dateString" parameter invalid day', () => {
        const result = BookingService.dateStringToIsoFormat('2026-11-33');
        expect(result).toBe(false);
    });

    it('should return false when "dateString" parameter invalid year', () => {
        const result = BookingService.dateStringToIsoFormat('2030-11-02');
        expect(result).toBe(false);
        const result2 = BookingService.dateStringToIsoFormat('2002-11-02');
        expect(result2).toBe(false);
    });

    it('should return false when "dateString" parameter is in the past', () => {
       const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000); // 1 day ago
        const pad = n => n < 10 ? '0' + n : n;
        const str = `${yesterday.getUTCFullYear()}-${pad(yesterday.getUTCMonth()+1)}-${pad(yesterday.getUTCDate())}`;
        const result = BookingService.dateStringToIsoFormat(str);
        expect(result).toBe(false);
    })

    it('should return string when "dateString" parameter is valid', () => {

        const future = new Date();

        future.setUTCFullYear(future.getUTCFullYear() + 1);

        const pad = n => n < 10 ? '0' + n : n;

        const str = `${future.getUTCFullYear()}-${pad(future.getUTCMonth() + 1)}-${pad(future.getUTCDate())}`;

        const result = BookingService.dateStringToIsoFormat(str);

        expect(typeof result).toBe('string');

        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    });
});

describe('isEndDateGreaterThanStartDate function', () => {

    it('should return false if startDate is missing', () => {
        expect(BookingService.isEndDateGreaterThanStartDate(undefined, '2025-11-18')).toBe(false);
    });

    it('should return false if endDate is missing', () => {
        expect(BookingService.isEndDateGreaterThanStartDate('2025-11-18', undefined)).toBe(false);
    });

    it('should return false if both dates are missing', () => {
        expect(BookingService.isEndDateGreaterThanStartDate()).toBe(false);
    });

    it('should return false when endDate is before startDate', () => {
        expect(BookingService.isEndDateGreaterThanStartDate('2025-11-18', '2025-11-17')).toBe(false);
    });

    it('should return false when startDate and endDate are equal', () => {
        expect(BookingService.isEndDateGreaterThanStartDate('2025-11-18', '2025-11-18')).toBe(false);
    });

    it('should return true when endDate is after startDate', () => {
        expect(BookingService.isEndDateGreaterThanStartDate('2025-11-18', '2025-12-19')).toBe(true);
    });

    it('should return true when endDate is in next month', () => {
        expect(BookingService.isEndDateGreaterThanStartDate('2025-11-30', '2026-01-01')).toBe(true);
    });

    it('should return true when endDate is in next year', () => {
        expect(BookingService.isEndDateGreaterThanStartDate('2025-11-31', '2026-01-01')).toBe(true);
    });
})