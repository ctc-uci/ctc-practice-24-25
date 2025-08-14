const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Routes
const techLeadsRouter = require("./routes/techLeadsRouter");
const npoInfoRouter = require("./routes/npoInfoRouter");
const projectInfoRouter = require("./routes/projectInfoRouter");
const projectNpoMappingRouter = require("./routes/projectNpoMappingRouter");

const app = express();

const CLIENT_HOSTNAME =
    process.env.NODE_ENV === "development"
        ? `${process.env.DEV_CLIENT_HOSTNAME}:${process.env.DEV_CLIENT_PORT}`
        : process.env.PROD_CLIENT_HOSTNAME;

const SERVER_PORT =
    (process.env.NODE_ENV === "development"
        ? process.env.DEV_SERVER_PORT
        : process.env.PROD_SERVER_PORT) ?? 3001;

app.use(
    cors({
        origin: CLIENT_HOSTNAME,
        credentials: true,
    })
);

app.use(express.json()); // for req.body

// added by zotgpt
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
});

app.use("/projectLeads", techLeadsRouter);
app.use("/npoInfo", npoInfoRouter);
app.use("/projectInfo", projectInfoRouter);
app.use("/projectNpoMapping", projectNpoMappingRouter);

// added by zotgpt
app.use((err, req, res) => {
    console.error("🚨 Server Error:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({ error: err.message });
});

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on ${SERVER_PORT}`);
    console.log(CLIENT_HOSTNAME);
    console.log(SERVER_PORT);
});
