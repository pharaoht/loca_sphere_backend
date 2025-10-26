export async function up(knex) {
	await knex.schema
		.createTable('BookingStatuses', (t) => {
			t.increments('id').primary();
			t.string('statusName', 50).unique().notNullable();
		})
		.createTable('Bookings', (t) => {
			t.string('id', 21).primary();
			t.string('listingId', 21).notNullable()
				.references('id').inTable('Listing').onDelete('CASCADE');
			t.string('hostId', 21).notNullable()
				.references('id').inTable('Users').onDelete('CASCADE');
			t.string('guestId', 21).notNullable()
				.references('id').inTable('Users').onDelete('CASCADE');
			t.date('startDate').notNullable();
			t.date('endDate').notNullable();
			t.timestamp('createdAt').defaultTo(knex.fn.now());
			t.tinyint('statusId').unsigned().defaultTo(6)
				.references('id').inTable('BookingStatuses').onDelete('SET NULL');
			t.text('additionalInfo');
		});
}

export async function down(knex) {
	await knex.schema
		.dropTableIfExists('Bookings')
		.dropTableIfExists('BookingStatuses');
}
