INSERT INTO HouseRules (ruleName) VALUES 
('Smoking Allowed'),
('Pets Allowed'),
('Overnight Guests Allowed'),
('City Hall Registration Supported'),
('Couples Allowed');

INSERT INTO AmenitiesTypes (name) VALUES 
('Kitchen'),
('Living Room'),
('Bathroom'),
('Dining Room'),
('Balcony'),
('Bedroom'),
('Exterior'),
('Floor Plan')
('Other');

INSERT INTO Amenities (amenityName) VALUES
('Wi-Fi'),
('Cable TV'),
('Central heating'),
('Elevator'),
('Window'),
('Fridge'),
('Freezer'),
('Stove'),
('Oven'),
('Microwave'),
('Washing machine'),
('Dishes and cutlery'),
('Pots and pans'),
('Balcony'),
('Toilet'),
('Sink'),
('Shower'),
('Bathtub'),
('Sofa'),
('Coffee table'),
('TV'),
('Sofa bed'),
('Dining room'),
('Chairs'),
('Table'),
('Outdoor area'),
('Bed linen and towels'),
('Accessibility'),
('Air conditioning');


INSERT INTO BedroomAmenities (name, icon) VALUES
('Wardrobe', '/wardrobe.png'),
('Desk/Table', '/desk.png'),
('Chairs', '/office_chair.png'),
('Sofa bed', '/sofa.png'),
('Window', '/window.png'),
('Balcony', '/balcony.png'),
('Double bed', '/bed.png'),
('Single bed', '/bed.png'),
('Bunk bed', '/bunk_bed.png'),
('Air conditioning', NULL);


INSERT INTO Utilities (name) VALUES 
('Water'),
('Electricity'),
('Internet'),
('Gas'),
('All bills included');

INSERT INTO BookingStatuses (statusName) 
VALUES ('pending'), ('confirmed'), ('cancelled'), ('completed');

INSERT INTO PhotoTypes (name) VALUES
('kitchen'),
('living_room'),
('bedroom'),
('bathroom'),
('exterior'),
('dining_room'),
('balcony'),
('floor_plan'),
('other');

INSERT INTO Gender (sex) VALUES
('Mixed Gender'),
('Males'),
('Females');

INSERT INTO Currencies (code, symbol) VALUES
('USD', '$'),
('EUR', '€'),
('GBP', '£'),
('JPY', '¥');

INSERT INTO ListingTypes (name) VALUES 
('Apartment'),
('Studio'),
('Private Room'),
('Shared Room');
