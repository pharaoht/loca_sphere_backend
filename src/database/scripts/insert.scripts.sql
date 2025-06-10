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
('Floor Plan'),
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

INSERT INTO BookingStatuses (statusName) 
VALUES ('pending'), ('confirmed'), ('cancelled'), ('completed');

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



-- Sample new IDs
SET @userIdLondon5 = 'usrlnd005abc321def654';
SET @listingIdLondon5 = 'lstlnd005def654abc321';

-- Create a new user (host)
INSERT INTO Users (id, givenName, surName, secondSurName)
VALUES (@userIdLondon5, 'Charlotte', 'Green', 'Morgan');

-- Create the listing
INSERT INTO Listing (
	id, userId, title, monthlyRent, currencyId, description,
	bedrooms, beds, bathrooms, roomAreaSqM, placeAreaSqM,
	minimumStayDays, maxStayDays, listingTypeId, isChecked
) VALUES (
	@listingIdLondon5, @userIdLondon5, 'Compact Soho Studio with Modern Amenities', 1750.00, 2,
	'Cozy and fully equipped studio in vibrant Soho, perfect for professionals or students. Near Leicester Square & public transport.',
	1, 1, 1.0, 20.00, 25.00,
	30, 180, 2, TRUE
);

-- Add address
INSERT INTO Address (
	listingId, streetAddress, houseNumber, postalCode, city,
	stateOrProvince, countryCode, latitude, longitude
) VALUES (
	@listingIdLondon5, 'Wardour Street', '88C', 'W1F 0TR', 'London', 'Greater London', 'GB', 51.5136, -0.1330
);

-- House rules
INSERT INTO ListingHouseRules (listingId, ruleId, isAllowed)
VALUES 
	(@listingIdLondon5, 1, FALSE),  -- Smoking Allowed
	(@listingIdLondon5, 2, TRUE),   -- Pets Allowed
	(@listingIdLondon5, 3, TRUE);   -- Overnight Guests Allowed

-- Amenities
INSERT INTO ListingAmenities (listingId, amenityTypeId, roomNumber, amenityId)
VALUES 
	-- Kitchen
	(@listingIdLondon5, 1, NULL, 6),   -- Fridge
	(@listingIdLondon5, 1, NULL, 7),   -- Freezer
	(@listingIdLondon5, 1, NULL, 8),   -- Stove
	(@listingIdLondon5, 1, NULL, 9),   -- Oven
	(@listingIdLondon5, 1, NULL, 10),  -- Microwave
	(@listingIdLondon5, 1, NULL, 11),  -- Washing machine
	(@listingIdLondon5, 1, NULL, 12),  -- Dishes and cutlery
	(@listingIdLondon5, 1, NULL, 13),  -- Pots and pans
	
	-- Bathroom
	(@listingIdLondon5, 3, NULL, 14),  -- Toilet
	(@listingIdLondon5, 3, NULL, 15),  -- Sink
	(@listingIdLondon5, 3, NULL, 16),  -- Shower

	-- Living Area
	(@listingIdLondon5, 2, NULL, 1),   -- Wi-Fi
	(@listingIdLondon5, 2, NULL, 3),   -- Central heating
	(@listingIdLondon5, 2, NULL, 20),  -- Coffee table
	(@listingIdLondon5, 2, NULL, 21),  -- TV
	(@listingIdLondon5, 2, NULL, 22),  -- Sofa bed

	-- General
	(@listingIdLondon5, 5, NULL, 13),  -- Balcony
	(@listingIdLondon5, 8, NULL, 27);  -- Bed linen and towels

-- Bedroom amenities
INSERT INTO ListingBedroomAmenities (listingId, bedroomAmenityId)
VALUES 
	(@listingIdLondon5, 1),  -- Wardrobe
	(@listingIdLondon5, 2),  -- Desk/Table
	(@listingIdLondon5, 3),  -- Chairs
	(@listingIdLondon5, 5),  -- Window
	(@listingIdLondon5, 7);  -- Double Bed

-- Utilities
INSERT INTO Utility (listingId, waterIncluded, electricIncluded, gasIncluded, internetIncluded, cleaningIncluded, cleaningFee )
VALUES 
	(@listingIdLondon5, 1, 1, 1, 1, 1, null);

-- Restrictions
INSERT INTO ListingRestrictions (listingId, maxTenants, extraCostPerTenant)
VALUES 
	(@listingIdLondon5, 1, 0.00);

-- Availability
INSERT INTO ListingAvailability (listingId, startDate, endDate, isAvailable)
VALUES 
	(@listingIdLondon5, '2025-10-01', '2026-04-01', TRUE);

-- Host info
INSERT INTO ListingHostInfo (
	listingId, livesInProperty, hostGender, hostAgeRange,
	livesWithFamily, hasPets, isVerified, genderAllowedId, userId
) VALUES (
	@listingIdLondon5, FALSE, FALSE, '31-40 years',
	FALSE, TRUE, TRUE, 1, @userIdLondon5
);

-- Listing photo
INSERT INTO ListingPhotos (listingId, url, isPrimary, amenityTypeId)
VALUES 
	(@listingIdLondon5, 'https://example.com/photos/compact-soho-studio.jpg', TRUE, 1);  -- Bedroom
