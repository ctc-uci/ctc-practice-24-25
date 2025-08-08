// FIXME: keep file only if using postgresql

const pgp = require("pg-promise")({});
require("dotenv").config();

const db = pgp({
    // NOTE: were using pgp to connect to the db here for some reason, different than the default code
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: true,
});

module.exports = db;
