/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const { join } = require("path");

const {
  DATABASE_URL = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_DEVELOPMENT = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_TEST = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_PREVIEW = "postgresql://postgres@localhost/postgres",
  DEBUG,
} = process.env;

const development = {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
        directory: join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
        directory: join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
};

const test = {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
        directory: join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
        directory: join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
};

const preview = {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
        directory: join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
        directory: join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
};

const production = {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
        directory: join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
        directory: join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
};

module.exports = { development, test, preview, production };
