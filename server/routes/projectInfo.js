const express = require("express");
const db = require("../server/db-pgp");

const projectInfoRouter = express.Router();
const { keysToCamel } = require("../common/utils");

projectInfoRouter.use(express.json());

projectInfoRouter.get("/", async (req, res) => {
    try {
        // Query database
        const data = await db.query("SELECT * FROM dl_project_info");

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

projectInfoRouter.post("/", async (req, res) => {
    try {
        // Destructure req.body
        const { startYear, endYear, npoId, projectLeads } = req.body;
        // Do something with request body
        const data = await db.query(
            "INSERT INTO dl_project_info (startYear,endYear,npoId,projectLeads) VALUES ($1, $2, $3, $4) RETURNING id;",
            [startYear, endYear, npoId, projectLeads]
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

projectInfoRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { startYear, endYear, npoId, projectLeads } = req.body;
        const updatedProjectInfo = await db.query(
            "UPDATE dl_project_info SET start_year = COALESCE($1, startYear) end_year = COALESCE($2, endYear) npo_id = COALESCE($3, npoId) project_leads = COALESCE($4, projectLeads) WHERE id = $6 RETURNING *;",
            [startYear, endYear, npoId, projectLeads, id]
        );
        res.status(200).send(keysToCamel(updatedProjectInfo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

projectInfoRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProjectInfo = await db.query(
            "DELETE FROM dl_project_info WHERE id = $1 RETURNING *;",
            [id]
        );
        res.status(200).send(keysToCamel(deletedProjectInfo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = projectInfoRouter;
