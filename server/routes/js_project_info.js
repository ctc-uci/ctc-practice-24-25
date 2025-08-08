const express = require("express");

const jsProjectInfoRouter = express.Router();
const { keysToCamel } = require("../common/utils");
const db = require("../server/db-pgp");

jsProjectInfoRouter.use(express.json());

jsProjectInfoRouter.get("/npo-info", async (req, res) => {
    try {
        // Query database
        const data = await db.query(`
        SELECT np.name, np.description, js.start_year, js.end_year, js.project_leads
        FROM js_project_info AS js
        JOIN npo_info AS np ON js.npo_id = np.id
        ORDER BY js.start_year ASC
      `);

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

jsProjectInfoRouter.get("/", async (req, res) => {
    try {
        // Query database
        const data = await db.query("SELECT * FROM js_project_info");

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

jsProjectInfoRouter.post("/", async (req, res) => {
    try {
        // Destructure req.body
        const { npo_id, start_year, end_year, project_leads } = req.body;

        const data = await db.query(
            "INSERT INTO js_project_info (npo_id, start_year, end_year, project_leads) VALUES ($1, $2, $3, $4) RETURNING *",
            [npo_id, start_year, end_year, project_leads]
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

jsProjectInfoRouter.put("/", async (req, res) => {
    try {
        // Destructure req.body
        const { id, npo_id, start_year, end_year, project_leads } = req.body;

        const data = await db.query(
            "UPDATE js_project_info SET npo_id = $1, start_year = $2, end_year = $3, project_leads = $4 WHERE id = $5 RETURNING *",
            [npo_id, start_year, end_year, project_leads, id]
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

jsProjectInfoRouter.delete("/", async (req, res) => {
    try {
        // Destructure req.body
        const { id } = req.body;

        const data = await db.query(
            "DELETE FROM js_project_info WHERE id = $1 RETURNING *",
            [id]
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = jsProjectInfoRouter;
