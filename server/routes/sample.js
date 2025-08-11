// FIXME: delete sample router file

const express = require("express");
const { db } = require("../server/db-pgp");

const sampleRouter = express.Router();

const { keysToCamel } = require("../common/utils");

sampleRouter.use(express.json());

sampleRouter.get("/", async (req, res) => {
    try {
        // Query database
        const data = await db.query(
            "SELECT * FROM dl_project_info as pi INNER JOIN npo_info as ni ON pi.npo_id = ni.id"
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.post("/", async (req, res) => {
    try {
        // Destructure req.body

        // Do something with request body
        const data = {};

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = sampleRouter;
