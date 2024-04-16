/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("matches", (table) => {
      table.increments("match_id").unsigned().notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id")
          .references("user_id")
          .inTable("users")
          .onDelete("CASCADE");
      table.timestamp("match_date");
      table.string("league");
      table.integer("home_team").unsigned().notNullable();
      table.foreign("home_team")
          .references("team_id")
          .inTable("teams")
          .onDelete("CASCADE");
      table.integer("away_team").unsigned().notNullable();
      table.foreign("away_team")
          .references("team_id")
          .inTable("teams")
          .onDelete("CASCADE");
      table.string("location");
      table.string("status").notNullable().defaultTo("upcoming");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("matches");
  };
  