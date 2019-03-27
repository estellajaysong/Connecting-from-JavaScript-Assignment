
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones', function (table) {
    table.integer('id').primary();
    table.string('description');
    table.date('date_achieved');
  });
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('milestones');
};
