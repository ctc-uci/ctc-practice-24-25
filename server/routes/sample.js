// FIXME: delete sample router file

const express = require("express");
const { db } = require("../server/db-pgp");

const sampleRouter = express.Router();

const { keysToCamel } = require("../common/utils");

sampleRouter.use(express.json());

sampleRouter.get("/", async (req, res) => {
    try {
        const data = await db.query(
            "SELECT * FROM in_project_info AS pi LEFT JOIN npo_info as ni ON pi.npo_id = ni.id"
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.post("/", async (req, res) => {
    try {
        const data = await db.query("INSERT INTO in_project_info (npo_id, start_year, end_year, project_leads) VALUES ($1, $2, $3, $4)", [req.body.npoId, req.body.startYear, req.body.endYear, req.body.projectLeads]);
        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.delete("/", async (req, res) => {
    try {
        const data = await db.query("DELETE FROM in_project_info WHERE id = $1", [req.body.id]);
        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

sampleRouter.put("/", async (req, res) => {
    try {
        const data = await db.query("UPDATE in_project_info SET npo_id = $1, start_year = $2, end_year = $3, project_leads = $4 WHERE id = $5", [req.body.npoId, req.body.startYear, req.body.endYear, req.body.projectLeads, req.body.id]);
        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = sampleRouter;
