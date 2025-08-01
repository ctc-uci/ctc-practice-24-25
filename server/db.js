require("dotenv").config();

const pgp = require("pg-promise")({});

const db = pgp({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: true,
});

// Optional: Test connection when the pool is created
db.connect()
    .then((client) => {
        console.log("PostgreSQL pool connected successfully!", client);
    })
    .catch((err) => {
        console.error("Error connecting to PostgreSQL pool:", err.stack);
    });
module.exports = db;
