// FIXME: keep file only if using postgresql

const pgp = require("pg-promise")({});
require("dotenv").config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT;

const db = pgp({
    host,
    user,
    password,
    database,
    port,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = { db, pgp };
