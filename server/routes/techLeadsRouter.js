const express = require("express");

const { db } = require("../server/db-pgp");

const techLeadsRouter = express.Router();

const { keysToCamel } = require("../common/utils");

techLeadsRouter.use(express.json());

techLeadsRouter.get("/", async (req, res) => {
    try {
        const allProjectLeads = await db.query(
            "SELECT * FROM ee_project_leads"
        );
        res.status(200).json(keysToCamel(allProjectLeads));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

techLeadsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const projectLead = await db.query(
            `SELECT * FROM ee_project_leads WHERE id = $1`,
            [id]
        );

        res.status(200).json(keysToCamel(projectLead));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = techLeadsRouter;
