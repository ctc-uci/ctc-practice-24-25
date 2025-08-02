const express = require("express");

const db = require("../db");

const sampleRouter = express.Router();

const { keysToCamel } = require("../common/utils");

sampleRouter.use(express.json());

sampleRouter.get("/np_info", async (req, res) => {
    try {
        const data = await db.any("SELECT * FROM np_info");
        res.json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.post("/np_info", async (req, res) => {
    try {
        const { name, description } = req.body;
        const data = await db.one(
            `INSERT INTO np_info
            (name, description)
            VALUES($1, $2) 
            RETURNING *`,
            [name, description]
        );

        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.put("/np_info/:id", async (req, res) => {
    try {
        const { name, description } = req.body;
        const data = await db.one(
            `UPDATE np_info 
            SET name = $1, description = $2
            WHERE id = $3
            RETURNING *`,
            [name, description, req.params.id]
        );
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.delete("/np_info/:id", async (req, res) => {
    try {
        const data = await db.one(
            `DELETE FROM np_info
            WHERE id = $1
            RETURNING *`,
            [req.params.id]
        );
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = sampleRouter;
