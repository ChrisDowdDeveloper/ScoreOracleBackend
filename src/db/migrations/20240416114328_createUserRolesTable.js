/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("user_roles", (table) => {
    table.increments("user_role_id").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id")
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
    table.string("role").notNullable().defaultTo("user");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("user_roles");
};
