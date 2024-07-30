const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Routes
const projectInfoRouter = require("./routes/projectInfoRouter");

const app = express();

const CLIENT_HOSTNAME =
    process.env.NODE_ENV === "DEVELOPMENT"
        ? `${process.env.DEV_CLIENT_HOSTNAME}:${process.env.DEV_CLIENT_PORT}`
        : process.env.PROD_CLIENT_HOSTNAME;

const SERVER_PORT =
    (process.env.NODE_ENV === "DEVELOPMENT"
        ? process.env.DEV_SERVER_PORT
        : process.env.PROD_SERVER_PORT) ?? 3001;

app.use(
    cors({
        origin: CLIENT_HOSTNAME,
        credentials: true,
    })
);

app.use(express.json()); // for req.body
app.use("/projects", projectInfoRouter);

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on ${SERVER_PORT}`);
});
