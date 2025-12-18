class BookingService {

    static dateStringToIsoFormat(dateString = undefined){

        if(!dateString) return false;

        const delimiter = String(dateString).includes('-') ? '-' : String(dateString).includes('/') ? '/' : null;

        if(!delimiter) return false;

        const parts = String(dateString).trim().split(delimiter);

        if(parts.length !== 3) return false;

        const currentYear = new Date().getFullYear();
    
        const yyyy = parseInt(parts[0], 10);
        const mm = parseInt(parts[1], 10);
        const dd = parseInt(parts[2], 10);

        if(mm < 0 || mm > 12) return false;
        if(dd < 1 || dd > 31) return false;
        if(yyyy < currentYear) return false;
        if(yyyy > currentYear + 2) return false;

        const santizeDate = new Date(Date.UTC(yyyy, mm - 1, dd, 0, 0, 0, 0));

        const now = new Date();
        const nowUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));

        if(santizeDate.getUTCMonth() !== mm - 1) return false;
        if(santizeDate.getTime() <= nowUtc.getTime()) return false;

        return santizeDate.toISOString().split('T')[0];

    }

    /**
     * @typedef {string} DateYYYYMMDD - Date string in format YYYY-MM-DD
     */
    /**
     * @param {DateYYYYMMDD} [startDate]
     * @param {DateYYYYMMDD} [endDate]
     * @returns {boolean}
    */
    static isEndDateGreaterThanStartDate(startDate = undefined, endDate = undefined){

        if(!startDate || !endDate) return false;

        const [sy, sm, sd] = startDate.split('-').map(numStr => Number(numStr));
        const [ey, em, ed ] = endDate.split('-').map(numstr => Number(numstr));

        const endDateMs = Date.UTC(ey, em - 1, ed, 0, 0, 0, 0);
        const startDateMs = Date.UTC(sy, sm - 1, sd, 0, 0, 0, 0);

        return endDateMs > startDateMs;
    }
};

module.exports = BookingService;