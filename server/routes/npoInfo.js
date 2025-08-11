const express = require("express");
const db = require("../server/db-pgp");

const npoInfoRouter = express.Router();
const { keysToCamel } = require("../common/utils");

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
        // Do something with request body
        const data = await db.query(
            "INSERT INTO npo_info (name,description) VALUES ($1, $2) RETURNING id;",
            [name, description]
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

npoInfoRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedProjectInfo = await db.query(
            "UPDATE npo_info SET name, description WHERE id = $3 RETURNING *;",
            [name, description, id]
        );
        res.status(200).send(keysToCamel(updatedProjectInfo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

npoInfoRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProjectInfo = await db.query(
            "DELETE FROM npo_info WHERE id = $1 RETURNING *;",
            [id]
        );
        res.status(200).send(keysToCamel(deletedProjectInfo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = npoInfoRouter;
