const express = require("express");
const { keysToCamel } = require("../common/utils");
const { db } = require("../server/db-pgp");

const npoRouter = express.Router();

// GET - gets all the NPOs in the table
npoRouter.get("/", async (req, res) => {
    try {
        const allNpos = await db.query(`SELECT * FROM npo_info;`);
        res.status(200).json(keysToCamel(allNpos));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET - gets the single NPO's id
npoRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const npo = await db.query(`SELECT * FROM npo_info WHERE id = $1;`, id);
        res.status(200).json(keysToCamel(npo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST - adds a new NPO to the table
npoRouter.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;
        const npo = await db.query(
            `INSERT INTO npo_info (name, description) VALUES ($1, $2) RETURNING id;`,
            [name, description]
        );

        res.status(200).json(keysToCamel(npo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT - updates an existing NPO with relevant data
npoRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const npo = await db.query(
            `UPDATE npo_info SET name = COALESCE($1, name), description = COALESCE($2, description)
             WHERE id = $3 RETURNING *;`,
            [name, description, id]
        );

        res.status(200).json(keysToCamel(npo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE - deletes and existing NPO from the table
npoRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteNpo = await db.query(
            `DELETE FROM npo_info WHERE id = $1 RETURNING *;`,
            [id]
        );
        res.status(200).json(keysToCamel(deleteNpo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = npoRouter;
