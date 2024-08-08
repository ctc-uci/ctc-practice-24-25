// FIXME: keep file only if using postgresql

const pgp = require("pg-promise")({});
require("dotenv").config();

const host =
    process.env.NODE_ENV === "DEVELOPMENT"
        ? process.env.DEV_DB_HOST
        : process.env.PROD_DB_HOST;
const user =
    process.env.NODE_ENV === "DEVELOPMENT"
        ? process.env.DEV_DB_USER
        : process.env.PROD_DB_USER;
const password =
    process.env.NODE_ENV === "DEVELOPMENT"
        ? process.env.DEV_DB_PASSWORD
        : process.env.PROD_DB_PASSWORD;
const database =
    process.env.NODE_ENV === "DEVELOPMENT"
        ? process.env.DEV_DB_NAME
        : process.env.PROD_DB_NAME;
const port =
    process.env.NODE_ENV === "DEVELOPMENT"
        ? process.env.DEV_DB_PORT
        : process.env.PROB_DB_PORT;

const db = pgp({
    host,
    user,
    password,
    database,
    port,
    ssl: true,
});

module.exports = { db, pgp };
