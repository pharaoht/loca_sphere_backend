INSERT INTO HouseRules (ruleName, icon) VALUES 
('Smoking Allowed', '/smoking.png'),
('Pets Allowed', '/pets.png'),
('Overnight Guests Allowed', '/guests.png'),
('City Hall Registration Supported', '/registration.png'),
('Couples Allowed', '/couples.png');

INSERT INTO AmenitiesTypes (name) VALUES 
('Kitchen'),
('Living Room'),
('Bathroom'),
('Dining Room'),
('Balcony'),
('Bedroom'),
('Exterior'),
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
('Toilet'),
('Sink'),
('Shower'),
('Bathtub'),
('Sofa'),
('Coffee table'),
('TV'),
('Sofa bed'),
('Chairs'),
('Table'),
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

INSERT INTO BookingStatuses (statusName) 
VALUES ('pending'), ('confirmed'), ('cancelled'), ('completed'), ('declined'), ('created'), ('ongoing');

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



-- New unique IDs
SET @userIdLondon6 = 'usrlnd006abc987xyz321';
SET @listingIdLondon6 = 'lstlnd006xyz321abc987';

-- Create new user (host)
INSERT INTO Users (id, givenName, surName, secondSurName)
VALUES (@userIdLondon6, 'Oliver', 'Smith', NULL);

-- Create the listing
INSERT INTO Listing (
  id, userId, title, monthlyRent, currencyId, description,
  bedrooms, beds, bathrooms, roomAreaSqM, placeAreaSqM,
  minimumStayDays, maxStayDays, listingTypeId, peopleAllowed, isChecked,
  createdAt, updatedAt
) VALUES (
  @listingIdLondon6, @userIdLondon6, 'Bright Camden Flat with Garden Access',
  2200.00, 2,
  'Spacious and well-lit flat in the heart of Camden. Quiet neighborhood with private garden access, ideal for young professionals or couples.',
  2, 2, 1.5, 40.00, 60.00,
  30, 180, 1, 2, TRUE,
  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- Address
INSERT INTO Address (
  listingId, streetAddress, houseNumber, postalCode, city,
  stateOrProvince, countryCode, latitude, longitude, extraInfo
) VALUES (
  @listingIdLondon6, 'Camden Road', '121B', 'NW1 9HA', 'London',
  'Greater London', 'GB', 51.5433, -0.1428, 'Private garden access, ground floor'
);

-- House rules
INSERT INTO ListingHouseRules (listingId, ruleId, isAllowed)
VALUES 
  (@listingIdLondon6, 1, FALSE),  -- Smoking
  (@listingIdLondon6, 2, TRUE),   -- Pets
  (@listingIdLondon6, 3, TRUE),   -- Overnight guests
  (@listingIdLondon6, 4, TRUE);   -- City Hall registration supported

-- Amenities
INSERT INTO ListingAmenities (listingId, amenityTypeId, roomNumber, amenityId)
VALUES 
  -- Kitchen
  (@listingIdLondon6, 1, NULL, 6),  -- Fridge
  (@listingIdLondon6, 1, NULL, 8),  -- Stove
  (@listingIdLondon6, 1, NULL, 9),  -- Oven
  (@listingIdLondon6, 1, NULL, 10), -- Microwave
  (@listingIdLondon6, 1, NULL, 11), -- Washing machine
  (@listingIdLondon6, 1, NULL, 13), -- Pots and pans
  
  -- Living Room
  (@listingIdLondon6, 2, NULL, 1),  -- Wi-Fi
  (@listingIdLondon6, 2, NULL, 3),  -- Central heating
  (@listingIdLondon6, 2, NULL, 20), -- Coffee table
  (@listingIdLondon6, 2, NULL, 21), -- TV
  
  -- Bathroom
  (@listingIdLondon6, 3, NULL, 14), -- Toilet
  (@listingIdLondon6, 3, NULL, 15), -- Sink
  (@listingIdLondon6, 3, NULL, 16), -- Shower
  
  -- Balcony/Outdoor
  (@listingIdLondon6, 5, NULL, 25), -- Air conditioning
  (@listingIdLondon6, 5, NULL, 13); -- Balcony

-- Bedroom amenities
INSERT INTO ListingBedroomAmenities (listingId, bedroomAmenityId)
VALUES 
  (@listingIdLondon6, 1),  -- Wardrobe
  (@listingIdLondon6, 2),  -- Desk/Table
  (@listingIdLondon6, 3),  -- Chairs
  (@listingIdLondon6, 7);  -- Double Bed

-- Utilities
INSERT INTO Utility (
  listingId, waterIncluded, electricIncluded, gasIncluded,
  internetIncluded, cleaningIncluded, cleaningFee
) VALUES (
  @listingIdLondon6, TRUE, TRUE, FALSE, TRUE, TRUE, 30
);

-- Restrictions
INSERT INTO ListingRestrictions (
  listingId, maxTenants, extraCostPerTenant
) VALUES (
  @listingIdLondon6, 2, 20.00
);

-- Availability
INSERT INTO ListingAvailability (
  listingId, startDate, endDate, isAvailable
) VALUES (
  @listingIdLondon6, '2025-09-01', '2026-03-01', TRUE
);

-- Host Info
INSERT INTO ListingHostInfo (
  listingId, livesInProperty, hostGender, hostAgeRange,
  livesWithFamily, hasPets, isVerified,
  genderAllowedId, peopleHosted, userId
) VALUES (
  @listingIdLondon6, FALSE, TRUE, '26-30 years',
  FALSE, TRUE, TRUE, 1, 1, @userIdLondon6
);

-- Photos
INSERT INTO ListingPhotos (
  listingId, url, isPrimary, amenityTypeId
) VALUES 
  (@listingIdLondon6, 'https://example.com/photos/camden-flat-garden.jpg', TRUE, 5);

