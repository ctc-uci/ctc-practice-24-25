const express = require("express");

const db = require("../db");

const sampleRouter = express.Router();

const { keysToCamel } = require("../common/utils");

sampleRouter.use(express.json());

sampleRouter.get("/ay_project_info", async (req, res) => {
    try {
        const data = await db.any("SELECT * FROM ay_project_info");
        res.json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.get("/", async (req, res) => {
    try {
        const data = await db.any(`SELECT *
            FROM ay_project_info AS a, npo_info AS n
            WHERE a.npo_id = n.id`);
        res.json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.post("/ay_project_info", async (req, res) => {
    try {
        const { npoId, startYear, endYear, projectLeads } = req.body;
        const data = await db.one(
            `INSERT INTO ay_project_info
            (npo_id, start_year, end_year, project_leads)
            VALUES($1, $2, $3, $4) 
            RETURNING *`,
            [npoId, startYear, endYear, projectLeads]
        );

        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.put("/ay_project_info/:id", async (req, res) => {
    try {
        const { npoId, startYear, endYear, projectLeads } = req.body;
        const data = await db.one(
            `UPDATE ay_project_info 
            SET npo_id = $1, start_year = $2, end_year = $3, project_leads = $4
            WHERE id = $5
            RETURNING *`,
            [npoId, startYear, endYear, projectLeads, req.params.id]
        );
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.delete("/ay_project_info/:id", async (req, res) => {
    try {
        const data = await db.one(
            `DELETE FROM ay_project_info
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
