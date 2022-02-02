exports.up = function (knex) {
  return knex.schema.createTable('accounts', (tbl) => {
    tbl.increments();

    tbl.text('name', 128).unique().notNullable();

    tbl.decimal('budget').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('accounts');
};
