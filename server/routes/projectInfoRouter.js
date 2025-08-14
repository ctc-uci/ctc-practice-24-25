const express = require("express");

const { db } = require("../server/db-pgp");

const projectInfoRouter = express.Router();

const { keysToCamel } = require("../common/utils");

projectInfoRouter.use(express.json());

projectInfoRouter.get("/", async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM ee_project_info");
        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

projectInfoRouter.get("/allProjectData", async (req, res) => {
    try {
        // implement mapping table
        const data = await db.query(`
            SELECT npo.name AS npo_name, npo.id, leads.name AS lead_name, proj.start_year, proj.end_year, description 
            FROM npo_info AS npo 
            JOIN ee_project_info AS proj ON npo.id = proj.id
            JOIN ee_project_leads AS leads ON leads.project_id = proj.id
            `);

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

projectInfoRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const data = await db.query(
            `SELECT * FROM ee_project_info WHERE id = $1`,
            [id]
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = projectInfoRouter;
