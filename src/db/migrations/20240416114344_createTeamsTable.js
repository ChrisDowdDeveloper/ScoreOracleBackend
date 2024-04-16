/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("teams", (table) => {
    table.increments("team_id").unsigned().notNullable();
    table.string("team_name");
    table.string("sport_type");
    table.string("league");
    table.string("logo_url");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("teams");
};
