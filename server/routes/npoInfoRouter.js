const express = require("express");

const { db } = require("../server/db-pgp");

const npoInfoRouter = express.Router();

const { keysToCamel } = require("../common/utils");

npoInfoRouter.use(express.json());

npoInfoRouter.get("/", async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM npo_info");
        res.status(200).json(keysToCamel(data));
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

npoInfoRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const data = await db.query(`SELECT * FROM npo_info WHERE id = $1`, [
            id,
        ]);

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = npoInfoRouter;
