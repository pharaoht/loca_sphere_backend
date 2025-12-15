CREATE INDEX idx_address_latitude ON Address (latitude);
CREATE INDEX idx_address_longitude ON Address (longitude);
CREATE INDEX idx_bookings_listing_dates ON Bookings (listingId, startDate, endDate);

