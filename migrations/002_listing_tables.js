const up = async (knex) => {
	await knex.schema
		.createTable('HouseRules', (t) => {
			t.increments('id').primary();
			t.string('ruleName').unique().notNullable();
			t.string('icon');
		})
		.createTable('Amenities', (t) => {
			t.increments('id').primary();
			t.string('amenityName').unique().notNullable();
		})
		.createTable('AmenitiesTypes', (t) => {
			t.increments('id').primary();
			t.string('name').unique().notNullable();
		})
		.createTable('BedroomAmenities', (t) => {
			t.increments('id').primary();
			t.string('name').unique().notNullable();
			t.string('icon');
		})
		.createTable('ListingTypes', (t) => {
			t.increments('id').primary();
			t.string('name').unique().notNullable();
		})
		.createTable('Currencies', (t) => {
			t.increments('id').primary();
			t.string('code', 3).unique().notNullable();
			t.string('symbol', 10);
			t.timestamp('created_at').defaultTo(knex.fn.now());
		})
		.createTable('Listing', (t) => {
			t.string('id', 21).primary();
			t.string('userId', 21).notNullable()
				.references('id').inTable('Users').onDelete('CASCADE');
			t.string('title').unique().notNullable();
			t.decimal('monthlyRent', 10, 2).notNullable().defaultTo(0.0);
			t.integer('currencyId').unsigned().notNullable()
				.references('id').inTable('Currencies');
			t.string('description', 1000);
			t.tinyint('bedrooms').unsigned().defaultTo(0);
			t.tinyint('beds').unsigned().defaultTo(1);
			t.decimal('bathrooms', 3, 1).unsigned().defaultTo(0.0);
			t.decimal('roomAreaSqM', 6, 2).unsigned().defaultTo(0.0);
			t.decimal('placeAreaSqM', 6, 2).unsigned().defaultTo(0.0);
			t.integer('minimumStayDays').unsigned().defaultTo(0);
			t.integer('maxStayDays').unsigned().defaultTo(0);
			t.integer('listingTypeId').unsigned().notNullable()
				.references('id').inTable('ListingTypes').onDelete('CASCADE');
			t.tinyint('peopleAllowed').unsigned().defaultTo(1);
			t.boolean('isChecked').defaultTo(false);
			t.boolean('isActive').defaultTo(false);
			t.timestamp('createdAt').defaultTo(knex.fn.now());
			t.timestamp('updatedAt').defaultTo(knex.fn.now());
		})
		.createTable('Address', (t) => {
			t.increments('id').primary();
			t.string('listingId', 21).unique().notNullable()
				.references('id').inTable('Listing').onDelete('CASCADE');
			t.string('streetAddress');
			t.string('houseNumber', 50);
			t.string('postalCode', 20).notNullable();
			t.string('city', 100);
			t.string('stateOrProvince', 100);
			t.string('countryCode', 2).notNullable();
			t.decimal('latitude', 10, 8);
			t.decimal('longitude', 11, 8);
			t.text('extraInfo');
		})
		.createTable('ListingBedroomAmenities', (t) => {
			t.increments('id').primary();
			t.string('listingId', 21).notNullable()
				.references('id').inTable('Listing').onDelete('CASCADE');
			t.integer('bedroomAmenityId').unsigned().notNullable()
				.references('id').inTable('BedroomAmenities').onDelete('CASCADE');
		})
		.createTable('ListingHouseRules', (t) => {
			t.increments('id').primary();
			t.string('listingId', 21).notNullable()
				.references('id').inTable('Listing').onDelete('CASCADE');
			t.tinyint('ruleId').unsigned().notNullable()
				.references('id').inTable('HouseRules').onDelete('CASCADE');
			t.boolean('isAllowed').notNullable();
		})
		.createTable('ListingAmenities', (t) => {
			t.increments('id').primary();
			t.string('listingId', 21).notNullable()
				.references('id').inTable('Listing').onDelete('CASCADE');
			t.tinyint('amenityTypeId').unsigned().notNullable()
				.references('id').inTable('AmenitiesTypes').onDelete('CASCADE');
			t.integer('roomNumber');
			t.tinyint('amenityId').unsigned().notNullable()
				.references('id').inTable('Amenities').onDelete('CASCADE');
		})
		.createTable('ListingAvailability', (t) => {
			t.increments('id').primary();
			t.string('listingId', 21).notNullable()
				.references('id').inTable('Listing').onDelete('CASCADE');
			t.date('startDate').notNullable();
			t.date('endDate').notNullable();
			t.boolean('isAvailable').defaultTo(true);
		})
		.createTable('ListingRestrictions', (t) => {
			t.increments('id').primary();
			t.string('listingId', 21).notNullable()
				.references('id').inTable('Listing').onDelete('CASCADE');
			t.tinyint('maxTenants').unsigned().notNullable();
			t.decimal('extraCostPerTenant', 10, 2).defaultTo(0.0);
		})
		.createTable('Utility', (t) => {
			t.increments('id').primary();
			t.string('listingId', 21).notNullable()
				.references('id').inTable('Listing').onDelete('CASCADE');
			t.boolean('waterIncluded').defaultTo(false);
			t.boolean('electricIncluded').defaultTo(false);
			t.boolean('gasIncluded').defaultTo(false);
			t.boolean('internetIncluded').defaultTo(false);
			t.boolean('cleaningIncluded').defaultTo(false);
			t.integer('cleaningFee');
		})
		.createTable('ListingPhotos', (t) => {
			t.increments('id').primary();
			t.string('listingId', 21).notNullable()
				.references('id').inTable('Listing').onDelete('CASCADE');
			t.string('url').notNullable();
			t.boolean('isPrimary').defaultTo(false);
			t.tinyint('amenityTypeId').unsigned().notNullable()
				.references('id').inTable('AmenitiesTypes').onDelete('CASCADE');
			t.timestamp('createdAt').defaultTo(knex.fn.now());
		})
		.createTable('ListingHostInfo', (t) => {
			t.increments('id').primary();
			t.string('listingId', 21).notNullable()
				.references('id').inTable('Listing').onDelete('CASCADE');
			t.boolean('livesInProperty').defaultTo(false);
			t.boolean('hostGender').defaultTo(false);
			t.enu('hostAgeRange', ['18-25 years', '26-30 years', '31-40 years', '41+ years']);
			t.boolean('livesWithFamily').defaultTo(false);
			t.boolean('hasPets').defaultTo(false);
			t.boolean('isVerified').defaultTo(false);
			t.timestamp('createdAt').defaultTo(knex.fn.now());
			t.integer('genderAllowedId').unsigned()
				.references('id').inTable('Gender').onDelete('CASCADE');
			t.integer('peopleHosted').defaultTo(0);
			t.string('userId', 21).notNullable()
				.references('id').inTable('Users').onDelete('CASCADE');
		})
		.createTable('Landlords', (t) => {
			t.string('userId', 21).primary()
				.references('id').inTable('Users').onDelete('CASCADE');
			t.decimal('rating', 3, 2).defaultTo(0.0);
			t.integer('responseTimeMinutes');
			t.boolean('verified').defaultTo(false);
			t.timestamp('createdAt').defaultTo(knex.fn.now());
			t.timestamp('updatedAt').defaultTo(knex.fn.now());
		});
}

const down = async (knex) => {
	await knex.schema
		.dropTableIfExists('Landlords')
		.dropTableIfExists('ListingHostInfo')
		.dropTableIfExists('ListingPhotos')
		.dropTableIfExists('Utility')
		.dropTableIfExists('ListingRestrictions')
		.dropTableIfExists('ListingAvailability')
		.dropTableIfExists('ListingAmenities')
		.dropTableIfExists('ListingHouseRules')
		.dropTableIfExists('ListingBedroomAmenities')
		.dropTableIfExists('Address')
		.dropTableIfExists('Listing')
		.dropTableIfExists('Currencies')
		.dropTableIfExists('ListingTypes')
		.dropTableIfExists('BedroomAmenities')
		.dropTableIfExists('AmenitiesTypes')
		.dropTableIfExists('Amenities')
		.dropTableIfExists('HouseRules');
}

module.exports = {
	up,
	down
}