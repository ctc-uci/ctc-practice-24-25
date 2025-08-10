// FIXME: keep file only if using postgresql

const pgp = require("pg-promise")({});
require("dotenv").config();

const host =
    process.env.NODE_ENV === "development"
        ? process.env.DB_HOST
        : process.env.PROD_DB_HOSTNAME;
const user =
    process.env.NODE_ENV === "development"
        ? process.env.DB_USER
        : process.env.PROD_DB_USERNAME;
const password =
    process.env.NODE_ENV === "development"
        ? process.env.DB_PASSWORD
        : process.env.PROD_DB_PASSWORD;
const database =
    process.env.NODE_ENV === "development"
        ? process.env.DB_NAME
        : process.env.PROD_DB_NAME;
const port =
    process.env.NODE_ENV === "development"
        ? Number(process.env.DB_PORT)
        : process.env.PROD_DB_PORT;

const db = pgp({
    host: host,
    port: port,
    database: database,
    user: user,
    password: password,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = { db, pgp };
