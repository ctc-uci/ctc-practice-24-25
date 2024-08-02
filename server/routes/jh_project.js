const express = require("express");
const { keysToCamel } = require("../common/utils");
const { db } = require("../server/db-pgp");

const projectRouter = express.Router();

// GET - gets all the projects in the table
projectRouter.get("/", async (req, res) => {
    try {
        const allProjects = await db.query(`SELECT * FROM jh_project_info;`);
        res.status(200).json(keysToCamel(allProjects));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET - gets all the projects in the table with corresponding NPO data
projectRouter.get("/npo-projects", async (req, res) => {
    try {
        const npoProjects = await db.query(
            `SELECT * FROM jh_project_info, npo_info WHERE jh_project_info.npo_id = npo_info.id;`
        );
        res.status(200).json(keysToCamel(npoProjects));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET - gets the single project
projectRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const singleProj = await db.query(
            `SELECT * FROM jh_project_info WHERE id = $1;`,
            [id]
        );
        res.status(200).json(keysToCamel(singleProj));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST - adds a new project to the table
projectRouter.post("/", async (req, res) => {
    try {
        const { npoId, startYear, endYear, projectLeads } = req.body;
        const singleProj = await db.query(
            `INSERT INTO jh_project_info (npo_id, start_year,end_year, project_leads ) VALUES ($1, $2, $3, $4) RETURNING id;`,
            [npoId, startYear, endYear, projectLeads]
        );

        res.status(200).json({
            status: "Successfully added project",
            id: singleProj[0].id,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT - updates an existing project with relevant data
projectRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { npoId, startYear, endYear, projectLeads } = req.body;

        const singleProj = await db.query(
            `UPDATE jh_project_info SET
             npo_id = COALESCE($1, npo_id),
             start_year = COALESCE($2, start_year),
             end_year = COALESCE($3, end_year),
             project_leads = COALESCE($4, project_leads)
             WHERE id = $5 RETURNING *;`,
            [npoId, startYear, endYear, projectLeads, id]
        );

        res.status(200).json(keysToCamel(singleProj));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE - deletes an existing project from the table
projectRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProj = await db.query(
            `DELETE FROM jh_project_info WHERE id = $1 RETURNING *;`,
            [id]
        );
        res.status(200).json(keysToCamel(deleteProj));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = projectRouter;
