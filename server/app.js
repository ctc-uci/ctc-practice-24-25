const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
// Routes
const sampleRouter = require("./routes/ay_project_info");

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.use("/", sampleRouter);

app.listen(3001, () => {
    console.log(`Server listening on ${3001}`);
    if (db.isConnected) {
        console.log("Database connected");
    } else {
        console.error("Database connection failed");
    }
});
