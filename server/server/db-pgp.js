// FIXME: keep file only if using postgresql

const pgp = require("pg-promise")({});
require("dotenv").config();

// const host =
//     process.env.NODE_ENV === "development"
//         ? process.env.DEV_DB_HOSTNAME
//         : process.env.PROD_DB_HOSTNAME;
// const user =
//     process.env.NODE_ENV === "development"
//         ? process.env.DEV_DB_USERNAME
//         : process.env.PROD_DB_USERNAME;
// const password =
//     process.env.NODE_ENV === "development"
//         ? process.env.DEV_DB_PASSWORD
//         : process.env.PROD_DB_PASSWORD;
// const database =
//     process.env.NODE_ENV === "development"
//         ? process.env.DEV_DB_NAME
//         : process.env.PROD_DB_NAME;
// const port =
//     process.env.NODE_ENV === "development"
//         ? process.env.DEV_DB_PORT
//         : process.env.PROD_DB_PORT;

// const db = pgp({
//     host,
//     user,
//     password,
//     database,
//     port,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });

const db = pgp({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = { db, pgp };
