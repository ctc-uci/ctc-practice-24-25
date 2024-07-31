const express = require('express');
const { keysToCamel } = require('../common/utils');
const { db } = require('../server/db-pgp');
const NPORouter = express.Router();


// GET - returns all NPOs in table
NPORouter.get('/', async (req, res) => {
    try {
        const npos = await db.query(`SELECT * FROM npo_info;`);
        res.status(200).json(keysToCamel(npos));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET - returns NPO by id
NPORouter.get('/:id', async (req, res) => {
    try {
        const { npo_id } = req.params;
        const npo = await db.query(
            `SELECT * FROM npo_info WHERE id = $1;`, 
            [npo_id]
        );
        res.status(200).json(keysToCamel(npo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST - adds new NPO to table
NPORouter.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        const npo = await db.query(
            `INSERT INTO npo_info (name, description) VALUES ($1, $2) RETURNING id;`, 
            [name, description]
        );
        res.status(201).json({status: 'Success', id: npo[0].id})
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT - updates existing NPO in table
NPORouter.put('/:id', async(req, res) => {
    try {
        const { npo_id } = req.params;
        const { name, description } = req.body;
        const npo = await db.query(
            `UPDATE npo_info SET name = COALESCE($1, name), description = COALESCE($2, description) 
            WHERE id = $3 RETURNING *;`, 
            [name, description, npo_id]
        );
        res.status(200).json(keysToCamel(npo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE - deletes NPO from tables
NPORouter.delete('/:id', async (req, res) => {
    try {
        const { npo_id } = req.params;
        const npo = await db.query(
            `DELETE FROM npo_info WHERE id = $1 RETURNING *;`, 
            [npo_id]
        );
        res.status(200).json(keysToCamel(npo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});
module.exports = NPORouter;