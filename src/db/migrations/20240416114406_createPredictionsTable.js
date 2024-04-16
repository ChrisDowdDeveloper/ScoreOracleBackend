/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("predictions", (table) => {
        table.increments("prediction_id").primary().notNullable();
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id")
            .references("user_id")
            .inTable("users")
            .onDelete("CASCADE");
        table.integer("match_id").unsigned().notNullable();
        table.foreign("match_id")
            .references("match_id")
            .inTable("matches")
            .onDelete("CASCADE");
        table.integer("predicted_winner_id").unsigned().notNullable();
        table.foreign("predicted_winner_id")
            .references("team_id")
            .inTable("teams")
            .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("predictions");
};
