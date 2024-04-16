/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("teams", (table) => {
      table.increments("team_id").unsigned().notNullable();
      table.string("team_name").notNullable();
      table.string("sport_type").notNullable();
      table.string("league").notNullable(); 
      table.string("logo_url"); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("teams");
  };
  