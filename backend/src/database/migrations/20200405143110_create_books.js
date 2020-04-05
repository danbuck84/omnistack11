
exports.up = function(knex) {
    return knex.schema.createTable('books', function (table) {
        table.increments();
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('sebo_id').notNullable();

        table.foreign('sebo_id').references('id').inTable('sebo');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('books');
  };
