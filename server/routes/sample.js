// FIXME: delete sample router file

const express = require("express");
const { db } = require("../server/db-pgp");

const sampleRouter = express.Router();

const { keysToCamel } = require("../common/utils");

sampleRouter.use(express.json());

sampleRouter.get("/", async (req, res) => {
    try {
        const data = await db.query(
            "SELECT * FROM in_project_info AS pi LEFT JOIN npo_info as ni ON pi.npo_id = ni.id"
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = sampleRouter;
