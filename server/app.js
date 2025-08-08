const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // FIXME: Keep only if using cookies
require("dotenv").config();

// Routes
const npoInfoRouter = require("./routes/npo_info");
const jsProjectInfoRouter = require("./routes/js_project_info");

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000", // NOTE: cors origin is just the client port
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json()); // for req.body
app.use("/npo_info", npoInfoRouter);
app.use("/js_project_info", jsProjectInfoRouter);

app.listen(3001, () => {
    // NOTE: ensure the port were listening on is different than the client port 3000 vs 3001
    console.log(`Server listening on 3001`);
});
