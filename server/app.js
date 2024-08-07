const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser"); // FIXME: Keep only if using cookies
// const schedule = require("node-schedule"); // FIXME: Keep only if scheduling cronjobs
require("dotenv").config();

// Routes
const npoRouter = require("./routes/npoRouter"); // FIXME: delete sample router

// schedule.scheduleJob("0 0 0 0 0", () => console.log("Hello Cron Job!")); // FIXME: delete sample cronjob

const app = express();

const CLIENT_HOSTNAME =
    process.env.NODE_ENV === "DEVELOPMENT"
        ? `${process.env.DEV_CLIENT_HOSTNAME}:${process.env.DEV_CLIENT_PORT}`
        : process.env.PROD_CLIENT_HOSTNAME;

const SERVER_PORT =
    (process.env.NODE_ENV === "DEVELOPMENT"
        ? process.env.DEV_SERVER_PORT
        : process.env.PROD_SERVER_PORT) ?? 3001;


console.log(process.env.DEV_CLIENT_HOSTNAME);
console.log(process.env.DEV_CLIENT_PORT);
console.log('SERVER_PORT:', SERVER_PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

app.use(
    cors({
        origin: CLIENT_HOSTNAME,
        credentials: true,
    })
);


// app.use(cookieParser());

app.use(express.json()); // for req.body
app.use("/npo", npoRouter); // FIXME: delete sample endpoint

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on ${SERVER_PORT}`);
    console.log(process.env.NODE_ENV);
});
