const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser"); // FIXME: Keep only if using cookies
// const schedule = require("node-schedule"); // FIXME: Keep only if scheduling cronjobs
require("dotenv").config();

// Routes
const npoRouter = require("./routes/npo");
const projectRouter = require("./routes/jh_project");

// schedule.scheduleJob("0 0 0 0 0", () => console.log("Hello Cron Job!")); // FIXME: delete sample cronjob

const app = express();

// const CLIENT_HOSTNAME =
//     process.env.NODE_ENV === "DEVELOPMENT"
//         ? `${process.env.DEV_CLIENT_HOSTNAME}:${process.env.DEV_CLIENT_PORT}`
//         : process.env.PROD_CLIENT_HOSTNAME;

// const SERVER_PORT =
//     (process.env.NODE_ENV === "DEVELOPMENT"
//         ? process.env.DEV_SERVER_PORT
//         : process.env.PROD_SERVER_PORT) ?? 3001;

app.use(
    cors({
        origin: `${process.env.CLIENT_HOSTNAME}:${process.env.CLIENT_PORT}`,
        credentials: true,
    })
);

// app.use(cookieParser());

app.use(express.json()); // for req.body
app.use("/npo", npoRouter);
app.use("/project", projectRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on ${process.env.SERVER_PORT}`);
});
