const express = require("express");

const npoInfoRouter = express.Router();
const { keysToCamel } = require("../common/utils");
const db = require("../server/db-pgp");

npoInfoRouter.use(express.json());

npoInfoRouter.get("/", async (req, res) => {
    try {
        // Query database
        const data = await db.query("SELECT * FROM npo_info");

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

npoInfoRouter.post("/", async (req, res) => {
    try {
        // Destructure req.body
        const { name, description } = req.body;

        const data = await db.query(
            "INSERT INTO npo_info (name, description) VALUES ($1, $2) RETURNING *",
            [name, description]
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

npoInfoRouter.put("/", async (req, res) => {
    try {
        // Destructure req.body
        const { id, name, description } = req.body;

        const data = await db.query(
            "UPDATE npo_info SET name = $1, description = $2 WHERE id = $3 RETURNING *",
            [name, description, id]
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

npoInfoRouter.delete("/", async (req, res) => {
    try {
        // Destructure req.body
        const { id } = req.body;

        const data = await db.query(
            "DELETE FROM npo_info WHERE id = $1 RETURNING *",
            [id]
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = npoInfoRouter;
