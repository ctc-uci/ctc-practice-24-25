// FIXME: delete sample router file

const express = require("express");

const npoRouter = express.Router();

const { db } = require("../server/db-pgp");

const { keysToCamel } = require("../common/utils");

npoRouter.use(express.json());

npoRouter.get("/", async (req, res) => {
    try {
        // Get all projects in the DB
        const data = await db.query(`
            SELECT npo_info.*, project.npo_id, project.start_year, project.end_year, project.project_leads
            FROM npo_info
            INNER JOIN np_project_info AS project ON npo_info.id=project.npo_id;
        `);
        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

npoRouter.post("/", async (req, res) => {
    try {
        // Create a new NPO project
        const { npoId, startYear, endYear, projectLeads } = req.body;

        const newEntry = await db.query(
            `INSERT INTO np_project_info (
                npo_id, start_year, end_year, project_leads
            ) 
            VALUES ($1, $2, $3, $4)
            RETURNING id;`,
            [npoId, startYear, endYear, projectLeads]
        );

        res.status(201).json({
            status: "Success",
            id: newEntry[0].id,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = npoRouter;
