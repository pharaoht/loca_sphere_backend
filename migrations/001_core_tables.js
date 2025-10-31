const up = async (knex) => {
	await knex.schema
		.createTable('Gender', (table) => {
			table.increments('id').primary();
			table.string('sex', 36).notNullable();
		})
		.createTable('Nationality', (table) => {
			table.increments('id').primary();
			table.string('countryName', 100).notNullable();
		})
		.createTable('Occupation', (table) => {
			table.increments('id').primary();
			table.string('occupationName', 100).notNullable().unique();
		})
		.createTable('Users', (table) => {
			table.string('id', 21).primary();
			table.string('googleId').notNullable();
			table.string('givenName').notNullable();
			table.string('surName').notNullable();
			table.string('secondSurName');
			table.string('email').notNullable().unique();
			table.string('pfp');
			table.integer('gender').unsigned().references('id').inTable('Gender').onDelete('CASCADE');
			table.date('birthday');
			table.string('countryCode', 10);
			table.string('phoneNumber', 20);
			table.integer('nationality').unsigned().references('id').inTable('Nationality').onDelete('CASCADE');
			table.integer('occupation').unsigned().references('id').inTable('Occupation').onDelete('CASCADE');
			table.string('placeOfWork');
			table.timestamp('createdAt').defaultTo(knex.fn.now());
			table.timestamp('updatedAt').defaultTo(knex.fn.now());
		});
}

const down = async (knex) => {
	await knex.schema
		.dropTableIfExists('Users')
		.dropTableIfExists('Occupation')
		.dropTableIfExists('Nationality')
		.dropTableIfExists('Gender');
}

module.exports = {
	up,
	down
}