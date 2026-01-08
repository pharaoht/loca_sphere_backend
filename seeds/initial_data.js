const moment = require('moment');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// First, clear existing data
	await knex('HouseRules').del();
	await knex('AmenitiesTypes').del();
	await knex('Amenities').del();
	await knex('BedroomAmenities').del();
	await knex('BookingStatuses').del();
	await knex('Gender').del();
	await knex('Currencies').del();
	await knex('ListingTypes').del();
	await knex('Nationality').del();
	await knex('Users').del();
	await knex('Listing').del();
	await knex('Address').del();
	await knex('ListingHouseRules').del();
	await knex('ListingBedroomAmenities').del();
	await knex('ListingAmenities').del();
	await knex('Utility').del();
	await knex('ListingPhotos').del();
	await knex('ListingHostInfo').del();
	await knex('Occupation').del();

	// Insert data
	await knex('HouseRules').insert([
		{ ruleName: 'Smoking Allowed', icon: '/smoking.png' },
		{ ruleName: 'Pets Allowed', icon: '/pets.png' },
		{ ruleName: 'Overnight Guests Allowed', icon: '/guests.png' },
		{ ruleName: 'City Hall Registration Supported', icon: '/registration.png' },
		{ ruleName: 'Couples Allowed', icon: '/couples.png' },
	]);

	await knex('Occupation').insert([
		{ occupationName: 'Software Engineer' },
		{ occupationName: 'Designer' },
		{ occupationName: 'Teacher' },
		{ occupationName: 'Doctor' },
		{ occupationName: 'Lawyer' },
		{ occupationName: 'Student' },
		{ occupationName: 'Entrepreneur' },
		{ occupationName: 'Freelancer' },
	]);

	await knex('AmenitiesTypes').insert([
		{ name: 'Kitchen' },
		{ name: 'Living Room' },
		{ name: 'Bathroom' },
		{ name: 'Dining Room' },
		{ name: 'Balcony' },
		{ name: 'Bedroom' },
		{ name: 'Exterior' },
		{ name: 'Other' },
	]);

	await knex('Amenities').insert([
		{ amenityName: 'Wi-Fi' },
		{ amenityName: 'Cable TV' },
		{ amenityName: 'Central heating' },
		{ amenityName: 'Elevator' },
		{ amenityName: 'Window' },
		{ amenityName: 'Fridge' },
		{ amenityName: 'Freezer' },
		{ amenityName: 'Stove' },
		{ amenityName: 'Oven' },
		{ amenityName: 'Microwave' },
		{ amenityName: 'Washing machine' },
		{ amenityName: 'Dishes and cutlery' },
		{ amenityName: 'Pots and pans' },
		{ amenityName: 'Toilet' },
		{ amenityName: 'Sink' },
		{ amenityName: 'Shower' },
		{ amenityName: 'Bathtub' },
		{ amenityName: 'Sofa' },
		{ amenityName: 'Coffee table' },
		{ amenityName: 'TV' },
		{ amenityName: 'Sofa bed' },
		{ amenityName: 'Chairs' },
		{ amenityName: 'Table' },
		{ amenityName: 'Bed linen and towels' },
		{ amenityName: 'Accessibility' },
		{ amenityName: 'Air conditioning' },
	]);

	await knex('BedroomAmenities').insert([
		{ name: 'Wardrobe', icon: '/wardrobe.png' },
		{ name: 'Desk/Table', icon: '/desk.png' },
		{ name: 'Chairs', icon: '/office_chair.png' },
		{ name: 'Sofa bed', icon: '/sofa.png' },
		{ name: 'Window', icon: '/window.png' },
		{ name: 'Balcony', icon: '/balcony.png' },
		{ name: 'Double bed', icon: '/bed.png' },
		{ name: 'Single bed', icon: '/bed.png' },
		{ name: 'Bunk bed', icon: '/bunk_bed.png' },
		{ name: 'Air conditioning', icon: null },
	]);

	await knex('BookingStatuses').insert([
		{ statusName: 'pending' },
		{ statusName: 'confirmed' },
		{ statusName: 'cancelled' },
		{ statusName: 'completed' },
		{ statusName: 'declined' },
		{ statusName: 'created' },
		{ statusName: 'ongoing' },
	]);

	await knex('Gender').insert([
		{ sex: 'Mixed Gender' },
		{ sex: 'Males' },
		{ sex: 'Females' },
	]);

	await knex('Currencies').insert([
		{ code: 'USD', symbol: '$' },
		{ code: 'EUR', symbol: '€' },
		{ code: 'GBP', symbol: '£' },
		{ code: 'JPY', symbol: '¥' },
	]);

	await knex('ListingTypes').insert([
		{ name: 'Apartment' },
		{ name: 'Studio' },
		{ name: 'Private Room' },
		{ name: 'Shared Room' },
	]);

	await knex('CountryCallingCodes').insert([
		{ countryName: 'Sint Maarte', callingCode: '+1' },
		{ countryName: 'Grenada', callingCode: '+1' },
		{ countryName: 'Dominican Republic', callingCode: '+1' },
		{ countryName: 'Spain', callingCode: '+34' },
		{ countryName: 'Hungary', callingCode: '+36' },
		{ countryName: 'Italy', callingCode: '+39' },
		{ countryName: 'Austria', callingCode: '+43' },
	])

	await knex('Nationality').insert([
		{ countryName: 'Afghanistan' },
		{ countryName: 'Åland Islands' },
		{ countryName: 'Albania' },
		{ countryName: 'Algeria' },
		{ countryName: 'American Samoa' },
		{ countryName: 'Andorra' },
		{ countryName: 'Angola' },
		{ countryName: 'Anguilla' },
		{ countryName: 'Antarctica' },
		{ countryName: 'Antigua and Barbuda' },
		{ countryName: 'Argentina' },
		{ countryName: 'Armenia' },
		{ countryName: 'Aruba' },
		{ countryName: 'Australia' },
		{ countryName: 'Austria' },
		{ countryName: 'Azerbaijan' },
		{ countryName: 'Bahamas' },
		{ countryName: 'Bahrain' },
		{ countryName: 'Bangladesh' },
		{ countryName: 'Barbados' },
		{ countryName: 'Belarus' },
		{ countryName: 'Belgium' },
		{ countryName: 'Belize' },
		{ countryName: 'Benin' },
		{ countryName: 'Bermuda' },
		{ countryName: 'Bhutan' },
		{ countryName: 'Bolivia' },
		{ countryName: 'Bonaire, Sint Eustatius and Saba' },
		{ countryName: 'Bosnia and Herzegovina' },
		{ countryName: 'Botswana' },
		{ countryName: 'Bouvet Island' },
		{ countryName: 'Brazil' },
		{ countryName: 'British Indian Ocean Territory' },
		{ countryName: 'Brunei' },
		{ countryName: 'Bulgaria' },
		{ countryName: 'Burkina Faso' },
		{ countryName: 'Burundi' },
		{ countryName: 'Cabo Verde' },
		{ countryName: 'Cambodia' },
		{ countryName: 'Cameroon' },
		{ countryName: 'Canada' },
		{ countryName: 'Cayman Islands' },
		{ countryName: 'Central African Republic' },
		{ countryName: 'Chile' },
		{ countryName: 'China' },
		{ countryName: 'Christmas Island' },
		{ countryName: 'Cocos (Keeling) Islands' },
		{ countryName: 'Colombia' },
		{ countryName: 'Comoros' },
		{ countryName: 'Congo, Republic of the' },
		{ countryName: 'Congo, the Democratic Republic of the'  },
		{ countryName: 'Cook Islands' },
		{ countryName: 'Costa Rica' },
		{ countryName: 'Croatia' },
		{ countryName: 'Cuba' },
		{ countryName: 'Curaçao' },
		{ countryName: 'Cyprus' },
		{ countryName: 'Czech Republic' },
		{ countryName: 'Denmark' },
		{ countryName: 'Djibouti' },
		{ countryName: 'Dominica' },
		{ countryName: 'Dominican Republic' },
		{ countryName: 'Ecuador' },
		{ countryName: 'Egypt' },
		{ countryName: 'El Salvador' },
		{ countryName: 'Equatorial Guinea' },
		{ countryName: 'Eritrea' },
		{ countryName: 'Estonia' },
		{ countryName: 'Ethiopia' },
		{ countryName: 'Falkland Islands (Malvinas)' },
		{ countryName: 'Faroe Islands' },
		{ countryName: 'Fiji' },
		{ countryName: 'Finland' },
		{ countryName: 'France' },
		{ countryName: 'French Guiana' },
		{ countryName: 'French Polynesia' },
		{ countryName: 'French Southern Territories' },
		{ countryName: 'Gabon' },
		{ countryName: 'Gambia' },
		{ countryName: 'Georgia' },
		{ countryName: 'Germany' },
		{ countryName: 'Ghana' },
		{ countryName: 'Gibraltar' },
		{ countryName: 'Greece' },
		{ countryName: 'Greenland' },
		{ countryName: 'Grenada' },
		{ countryName: 'Guadeloupe' },
		{ countryName: 'Guam' },
		{ countryName: 'Guatemala' },
		{ countryName: 'Guernsey' },
		{ countryName: 'Guinea' },
		{ countryName: 'Guinea-Bissau' },
		{ countryName: 'Guyana' },
		{ countryName: 'Haiti' },
		{ countryName: 'Heard Island and McDonald Islands' },
		{ countryName: 'Holy See (Vatican City State)' },
		{ countryName: 'Honduras' },
		{ countryName: 'Hong Kong' },
		{ countryName: 'Hungary' },
		{ countryName: 'Iceland' },
		{ countryName: 'India' },
		{ countryName: 'Indonesia' },
		{ countryName: 'Iran' },
		{ countryName: 'Iraq' },
		{ countryName: 'Ireland' },
		{ countryName: 'Isle of Man' },
		{ countryName: 'Israel' },
		{ countryName: 'Italy' },
		{ countryName: 'Ivory Coast' },
		{ countryName: 'Jamaica' },
		{ countryName: 'Japan' },
		{ countryName: 'Jersey' },
		{ countryName: 'Jordan' },
		{ countryName: 'Kazakhstan' },
		{ countryName: 'Kenya' },
		{ countryName: 'Kiribati' },
		{ countryName: 'Korea, Democratic Peoples Republic of' },
		{ countryName: 'Korea, Republic of' },
		{ countryName: 'Kuwait' },
		{ countryName: 'Kyrgyzstan' },
		{ countryName: 'Laos' },
		{ countryName: 'Latvia' },
		{ countryName: 'Lebanon' },
		{ countryName: 'Lesotho' },
		{ countryName: 'Liberia' },
		{ countryName: 'Libya' },
		{ countryName: 'Liechtenstein' },
		{ countryName: 'Lithuania' },
		{ countryName: 'Luxembourg' },
		{ countryName: 'Macao' },
		{ countryName: 'Macedonia (FYROM)' },
		{ countryName: 'Madagascar' },
		{ countryName: 'Malawi' },
		{ countryName: 'Malaysia' },
		{ countryName: 'Maldives' },
		{ countryName: 'Mali' },
		{ countryName: 'Malta' },
		{ countryName: 'Marshall Islands' },
		{ countryName: 'Martinique' },
		{ countryName: 'Mauritania' },
		{ countryName: 'Mauritius' },
		{ countryName: 'Mayotte' },
		{ countryName: 'Mexico' },
		{ countryName: 'Micronesia, Federated States of' },
		{ countryName: 'Moldova' },
		{ countryName: 'Monaco' },
		{ countryName: 'Mongolia' },
		{ countryName: 'Montenegro' },
		{ countryName: 'Montserrat' },
		{ countryName: 'Morocco' },
		{ countryName: 'Mozambique' },
		{ countryName: 'Myanmar' },
		{ countryName: 'Namibia' },
		{ countryName: 'Nauru' },
		{ countryName: 'Nepal' },
		{ countryName: 'Netherlands' },
		{ countryName: 'Netherlands Antilles' },
		{ countryName: 'New Caledonia' },
		{ countryName: 'New Zealand' },
		{ countryName: 'Nicaragua' },
		{ countryName: 'Niger' },
		{ countryName: 'Nigeria' },
		{ countryName: 'Niue' },
		{ countryName: 'Norfolk Island' },
		{ countryName: 'Northern Mariana Islands' },
		{ countryName: 'Norway' },
		{ countryName: 'Oman' },
		{ countryName: 'Pakistan' },
		{ countryName: 'Palau' },
		{ countryName: 'Palestine, State of' },
		{ countryName: 'Panama' },
		{ countryName: 'Papua New Guinea' },
		{ countryName: 'Paraguay' },
		{ countryName: 'Peru' },
		{ countryName: 'Philippines' },
		{ countryName: 'Pitcairn' },
		{ countryName: 'Poland' },
		{ countryName: 'Portugal' },
		{ countryName: 'Puerto Rico' },
		{ countryName: 'Qatar' },
		{ countryName: 'Reunion Island' },
		{ countryName: 'Romania' },
		{ countryName: 'Russian Federation' },
		{ countryName: 'Rwanda' },
		{ countryName: 'Saint Barthélémy' },
		{ countryName: 'Saint Helena, Ascension and Tristan da Cunha' },
		{ countryName: 'Saint Kitts and Nevis' },
		{ countryName: 'Saint Lucia' },
		{ countryName: 'Saint Martin (French part)' },
		{ countryName: 'Saint Pierre and Miquelon' },
		{ countryName: 'Saint Vincent and the Grenadines' },
		{ countryName: 'Samoa' },
		{ countryName: 'San Marino' },
		{ countryName: 'Sao Tome and Principe' },
		{ countryName: 'Saudi Arabia' },
		{ countryName: 'Senegal' },
		{ countryName: 'Serbia' },
		{ countryName: 'Seychelles' },
		{ countryName: 'Sierra Leone' },
		{ countryName: 'Singapore' },
		{ countryName: 'Sint Maarten (Dutch part)' },
		{ countryName: 'Slovakia' },
		{ countryName: 'Slovenia' },
		{ countryName: 'Solomon Islands' },
		{ countryName: 'Somalia' },
		{ countryName: 'South Africa' },
		{ countryName: 'South Georgia and the South Sandwich Islands' },
		{ countryName: 'South Sudan' },
		{ countryName: 'Spain' },
		{ countryName: 'Sri Lanka' },
		{ countryName: 'Sudan' },
		{ countryName: 'Suriname' },
		{ countryName: 'Svalbard and Jan Mayen' },
		{ countryName: 'Swaziland' },
		{ countryName: 'Sweden' },
		{ countryName: 'Switzerland' },
		{ countryName: 'Syrian Arab Republic' },
		{ countryName: 'Taiwan' },
		{ countryName: 'Tajikistan' },
		{ countryName: 'Tanzania' },
		{ countryName: 'Thailand' },
		{ countryName: 'Timor-Leste' },
		{ countryName: 'Togo' },
		{ countryName: 'Tokelau' },
		{ countryName: 'Tonga' },
		{ countryName: 'Trinidad and Tobago' },
		{ countryName: 'Tunisia' },
		{ countryName: 'Turkey' },
		{ countryName: 'Turkmenistan' },
		{ countryName: 'Turks and Caicos Islands' },
		{ countryName: 'Tuvalu' },
		{ countryName: 'U.S. Virgin Islands' },
		{ countryName: 'Uganda' },
		{ countryName: 'Ukraine' },
		{ countryName: 'United Arab Emirates' },
		{ countryName: 'United Kingdom' },
		{ countryName: 'United States' },
		{ countryName: 'United States Minor Outlying Islands' },
		{ countryName: 'Uruguay' },
		{ countryName: 'Uzbekistan' },
		{ countryName: 'Vanuatu' },
		{ countryName: 'Venezuela' },
		{ countryName: 'Vietnam' },
		{ countryName: 'Virgin Islands, British' },
		{ countryName: 'Wallis and Futuna' },
		{ countryName: 'Western Sahara' },
		{ countryName: 'Yemen' },
		{ countryName: 'Zambia' },
		{ countryName: 'Zimbabwe' },
	])

	await knex('Users').insert([
		{
			id: 'usrlnd006abc987xyz321',
			googleId: 'google_123456789',
			givenName: 'John',
			surName: 'Doe',
			secondSurName: 'Smith',
			email: 'john.doe@example.com',
			pfp: 'https://example.com/avatar.png',
			gender: 2,
			birthday: '1990-05-12',
			countryCode: '+1',
			phoneNumber: '5551234567',
			nationality: 1,
			occupation: 2,
			placeOfWork: 'Tech Corp',
			createdAt: knex.fn.now(),
			updatedAt: knex.fn.now(),
		},
		{
			id: 'usrlnd006abc987xyz555',
			googleId: 'google_123456744',
			givenName: 'Jame',
			surName: 'Doe',
			secondSurName: 'Smith',
			email: 'jane.doe@example.com',
			pfp: 'https://example.com/avatar.png',
			gender: 3,
			birthday: '1995-06-11',
			countryCode: '+1',
			phoneNumber: '5557254162',
			nationality: 1,
			occupation: 2,
			placeOfWork: 'Tech Corp',
			createdAt: knex.fn.now(),
			updatedAt: knex.fn.now(),
		}
	])

	await knex('Listing').insert([
		{
			id: 'lstlnd006xyz321abc987',
			userId: 'usrlnd006abc987xyz321',
			title: 'Cozy Apartment in Downtown',
			monthlyRent: 1500.00,
			currencyId: 1,
			description: 'A comfortable one-bedroom apartment located in the heart of the city.',
			bedrooms: 1,
			beds: 1,
			bathrooms: 1.0,
			roomAreaSqM: 35.5,
			placeAreaSqM: 80.0,
			minimumStayDays: 90,
			maxStayDays: 365,
			listingTypeId: 1,
			peopleAllowed: 2,
			isChecked: true,
			isActive: true,
			createdAt: knex.fn.now(),
			updatedAt: knex.fn.now(),
		}
	])

	await knex('Address').insert([
		{
			listingId: 'lstlnd006xyz321abc987',
			streetAddress: '123 Main Street',
			houseNumber: 'A1',
			postalCode: '90210',
			city: 'Los Angeles',
			stateOrProvince: 'California',
			countryCode: 'US',
			latitude: 34.052235,
			longitude: -118.243683,
			extraInfo: 'Near downtown, close to public transport.',
		}
	])

	await knex('ListingHouseRules').insert([
		{
			listingId: 'lstlnd006xyz321abc987',
			ruleId: 1, // Smoking Allowed
			isAllowed: false,
		},
		{
			listingId: 'lstlnd006xyz321abc987',
			ruleId: 2, // Pets Allowed
			isAllowed: true,
		},
		{
			listingId: 'lstlnd006xyz321abc987',
			ruleId: 3, // Overnight Guests Allowed
			isAllowed: true,
		},
		{
			listingId: 'lstlnd006xyz321abc987',
			ruleId: 4, // City Hall Registration Supported
			isAllowed: false,
		},
		{
			listingId: 'lstlnd006xyz321abc987',
			ruleId: 5, // Couples Allowed
			isAllowed: true,
		},
	]);

	await knex('ListingBedroomAmenities').insert([
		{ listingId: 'lstlnd006xyz321abc987', bedroomAmenityId: 1 },
		{ listingId: 'lstlnd006xyz321abc987', bedroomAmenityId: 2 },
		{ listingId: 'lstlnd006xyz321abc987', bedroomAmenityId: 7 }, 
		{ listingId: 'lstlnd006xyz321abc987', bedroomAmenityId: 10 } 
	]);

	await knex('ListingAmenities').insert([
		{
			listingId: 'lstlnd006xyz321abc987',
			amenityTypeId: 1, // Kitchen
			roomNumber: null,
			amenityId: 6, // Fridge
		},
		{
			listingId: 'lstlnd006xyz321abc987',
			amenityTypeId: 1, // Kitchen
			roomNumber: null,
			amenityId: 8, // Stove
		},
		{
			listingId: 'lstlnd006xyz321abc987',
			amenityTypeId: 2, // Living Room
			roomNumber: null,
			amenityId: 18, // Sofa
		},
		{
			listingId: 'lstlnd006xyz321abc987',
			amenityTypeId: 2, // Living Room
			roomNumber: null,
			amenityId: 20, // TV
		},
	]);

	await knex('Utility').insert([
		{
		listingId: 'lstlnd006xyz321abc987',
		waterIncluded: true,
		electricIncluded: true,
		gasIncluded: false,
		internetIncluded: true,
		cleaningIncluded: false,
		cleaningFee: 50,
		},
	]);

	await knex('ListingPhotos').insert([
		{
			listingId: 'lstlnd006xyz321abc987',
			url: '/photos/livingroom.jpg',
			isPrimary: true,
			amenityTypeId: 2, // Living Room
		},
		{
			listingId: 'lstlnd006xyz321abc987',
			url: '/photos/kitchen.jpg',
			isPrimary: false,
			amenityTypeId: 1, // Kitchen
		},
		{
			listingId: 'lstlnd006xyz321abc987',
			url: '/photos/bedroom.jpg',
			isPrimary: false,
			amenityTypeId: 6, // Bedroom
		},
	]);

	await knex('ListingHostInfo').insert([
		{
			listingId: 'lstlnd006xyz321abc987',
			livesInProperty: false,
			hostGender: true, 
			hostAgeRange: '26-30 years',
			livesWithFamily: false,
			hasPets: false,
			isVerified: true,
			genderAllowedId: 1,
			peopleHosted: 12,
			userId: 'usrlnd006abc987xyz321',
		}
	])

	await knex('Bookings').insert([
		{
			id: 'bktlnd006xyz555abc555',
			listingId: 'lstlnd006xyz321abc987',
			hostId: 'usrlnd006abc987xyz321',
			guestId: 'usrlnd006abc987xyz555',
			startDate: moment(new Date()).format('YYYY-MM-DD'),
			endDate: moment(new Date()).add(13, 'days').format('YYYY-MM-DD'),
			createdAt: knex.fn.now(),
			statusId: 2,
			guests: 1,
			additionalInfo: 'Test, test, testing'
		},
	])
};
