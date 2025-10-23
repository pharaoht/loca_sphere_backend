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


INSERT INTO Nationality (countryName) VALUES
('Afghanistan'),
('Åland Islands'),
('Albania'),
('Algeria'),
('American Samoa'),
('Andorra'),
('Angola'),
('Anguilla'),
('Antarctica'),
('Antigua and Barbuda'),
('Argentina'),
('Armenia'),
('Aruba'),
('Australia'),
('Austria'),
('Azerbaijan'),
('Bahamas'),
('Bahrain'),
('Bangladesh'),
('Barbados'),
('Belarus'),
('Belgium'),
('Belize'),
('Benin'),
('Bermuda'),
('Bhutan'),
('Bolivia'),
('Bonaire, Sint Eustatius and Saba'),
('Bosnia and Herzegovina'),
('Botswana'),
('Bouvet Island'),
('Brazil'),
('British Indian Ocean Territory'),
('Brunei'),
('Bulgaria'),
('Burkina Faso'),
('Burundi'),
('Cabo Verde'),
('Cambodia'),
('Cameroon'),
('Canada'),
('Cayman Islands'),
('Central African Republic'),
('Chile'),
('China'),
('Christmas Island'),
('Cocos (Keeling) Islands'),
('Colombia'),
('Comoros'),
('Congo, Republic of the'),
('Congo, the Democratic Republic of the'),
('Cook Islands'),
('Costa Rica'),
('Croatia'),
('Cuba'),
('Curaçao'),
('Cyprus'),
('Czech Republic'),
('Denmark'),
('Djibouti'),
('Dominica'),
('Dominican Republic'),
('Ecuador'),
('Egypt'),
('El Salvador'),
('Equatorial Guinea'),
('Eritrea'),
('Estonia'),
('Ethiopia'),
('Falkland Islands (Malvinas)'),
('Faroe Islands'),
('Fiji'),
('Finland'),
('France'),
('French Guiana'),
('French Polynesia'),
('French Southern Territories'),
('Gabon'),
('Gambia'),
('Georgia'),
('Germany'),
('Ghana'),
('Gibraltar'),
('Greece'),
('Greenland'),
('Grenada'),
('Guadeloupe'),
('Guam'),
('Guatemala'),
('Guernsey'),
('Guinea'),
('Guinea-Bissau'),
('Guyana'),
('Haiti'),
('Heard Island and McDonald Islands'),
('Holy See (Vatican City State)'),
('Honduras'),
('Hong Kong'),
('Hungary'),
('Iceland'),
('India'),
('Indonesia'),
('Iran'),
('Iraq'),
('Ireland'),
('Isle of Man'),
('Israel'),
('Italy'),
('Ivory Coast'),
('Jamaica'),
('Japan'),
('Jersey'),
('Jordan'),
('Kazakhstan'),
('Kenya'),
('Kiribati'),
('Korea, Democratic Peoples Republic of'),
('Korea, Republic of'),
('Kuwait'),
('Kyrgyzstan'),
('Laos'),
('Latvia'),
('Lebanon'),
('Lesotho'),
('Liberia'),
('Libya'),
('Liechtenstein'),
('Lithuania'),
('Luxembourg'),
('Macao'),
('Macedonia (FYROM)'),
('Madagascar'),
('Malawi'),
('Malaysia'),
('Maldives'),
('Mali'),
('Malta'),
('Marshall Islands'),
('Martinique'),
('Mauritania'),
('Mauritius'),
('Mayotte'),
('Mexico'),
('Micronesia, Federated States of'),
('Moldova'),
('Monaco'),
('Mongolia'),
('Montenegro'),
('Montserrat'),
('Morocco'),
('Mozambique'),
('Myanmar'),
('Namibia'),
('Nauru'),
('Nepal'),
('Netherlands'),
('Netherlands Antilles'),
('New Caledonia'),
('New Zealand'),
('Nicaragua'),
('Niger'),
('Nigeria'),
('Niue'),
('Norfolk Island'),
('Northern Mariana Islands'),
('Norway'),
('Oman'),
('Pakistan'),
('Palau'),
('Palestine, State of'),
('Panama'),
('Papua New Guinea'),
('Paraguay'),
('Peru'),
('Philippines'),
('Pitcairn'),
('Poland'),
('Portugal'),
('Puerto Rico'),
('Qatar'),
('Reunion Island'),
('Romania'),
('Russian Federation'),
('Rwanda'),
('Saint Barthélémy'),
('Saint Helena, Ascension and Tristan da Cunha'),
('Saint Kitts and Nevis'),
('Saint Lucia'),
('Saint Martin (French part)'),
('Saint Pierre and Miquelon'),
('Saint Vincent and the Grenadines'),
('Samoa'),
('San Marino'),
('Sao Tome and Principe'),
('Saudi Arabia'),
('Senegal'),
('Serbia'),
('Seychelles'),
('Sierra Leone'),
('Singapore'),
('Sint Maarten (Dutch part)'),
('Slovakia'),
('Slovenia'),
('Solomon Islands'),
('Somalia'),
('South Africa'),
('South Georgia and the South Sandwich Islands'),
('South Sudan'),
('Spain'),
('Sri Lanka'),
('Sudan'),
('Suriname'),
('Svalbard and Jan Mayen'),
('Swaziland'),
('Sweden'),
('Switzerland'),
('Syrian Arab Republic'),
('Taiwan'),
('Tajikistan'),
('Tanzania'),
('Thailand'),
('Timor-Leste'),
('Togo'),
('Tokelau'),
('Tonga'),
('Trinidad and Tobago'),
('Tunisia'),
('Turkey'),
('Turkmenistan'),
('Turks and Caicos Islands'),
('Tuvalu'),
('U.S. Virgin Islands'),
('Uganda'),
('Ukraine'),
('United Arab Emirates'),
('United Kingdom'),
('United States'),
('United States Minor Outlying Islands'),
('Uruguay'),
('Uzbekistan'),
('Vanuatu'),
('Venezuela'),
('Vietnam'),
('Virgin Islands, British'),
('Wallis and Futuna'),
('Western Sahara'),
('Yemen'),
('Zambia'),
('Zimbabwe');




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

