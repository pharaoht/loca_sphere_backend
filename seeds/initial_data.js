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

	// Insert data
	await knex('HouseRules').insert([
		{ ruleName: 'Smoking Allowed', icon: '/smoking.png' },
		{ ruleName: 'Pets Allowed', icon: '/pets.png' },
		{ ruleName: 'Overnight Guests Allowed', icon: '/guests.png' },
		{ ruleName: 'City Hall Registration Supported', icon: '/registration.png' },
		{ ruleName: 'Couples Allowed', icon: '/couples.png' },
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
};
