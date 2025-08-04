const express = require("express");

const nnProjectInfoRouter = express.Router();
const { db } = require("../server/db-pgp");

const { keysToCamel } = require("../common/utils");

nnProjectInfoRouter.use(express.json());

// RETREIVES ALL NPO AND PROJECT INFORMATION
nnProjectInfoRouter.get("/", async (req, res) => {
    try {
        const projectInfo = await db.query(`SELECT *
                                            FROM nn_project_info AS pi
	                                        INNER JOIN npo_info AS npo ON npo.id = pi.npo_id;`);
        res.status(200).json(keysToCamel(projectInfo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// RETREIVES NPO AND PROJECT INFORMATION BY ID
nnProjectInfoRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const projectInfo = await db.query(
            `SELECT *
                                            FROM nn_project_info AS pi
	                                        INNER JOIN npo_info AS npo ON npo.id = pi.npo_id
                                            WHERE npo_id = $1`,
            [id]
        );
        res.status(200).json(keysToCamel(projectInfo));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// INSERTS NEW NPO AND PROJECT
nnProjectInfoRouter.post("/", async (req, res) => {
    try {
        const { name, description, startYear, endYear, projectLeads } =
            req.body;

        const producedIdResult = await db.query(
            `INSERT INTO npo_info (name, description)
            VALUES ($1, $2)
            RETURNING id
            `,
            [name, description]
        );

        const producedId = producedIdResult[0]?.id;

        const producedNpoId = await db.query(
            `INSERT INTO nn_project_info (npo_id, start_year, end_year, project_leads)
            VALUES ($1, $2, $3, $4)
            RETURNING npo_id
            `,
            [producedId, startYear, endYear, projectLeads]
        );

        res.status(200).json(keysToCamel(producedNpoId[0]));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// UPDATES A NPO AND PROJECT BY ID
nnProjectInfoRouter.put("/:id", async (req, res) => {
    try {
        const { name, description, startYear, endYear, projectLeads } =
            req.body;
        const { id } = req.params;

        const npoData = await db.query(
            `
            UPDATE npo_info
            SET
                name = COALESCE($1, name),
                description = COALESCE($2, description)
            WHERE id = $3
            RETURNING id;
            `,
            [name, description, id]
        );

        const projectData = await db.query(
            `
            UPDATE nn_project_info
            SET
                start_year = COALESCE($1, start_year),
                end_year = COALESCE($2, end_year),
                project_leads = COALESCE($3, project_leads)
            WHERE npo_id = $4
            RETURNING npo_id;
            `,
            [startYear, endYear, projectLeads, id]
        );

        res.status(200).json(keysToCamel({ npoData, projectData }));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETES A NPO AND PROJECT BY ID
nnProjectInfoRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await db.query("DELETE FROM nn_project_info WHERE npo_id = $1", [id]);
        await db.query("DELETE FROM npo_info WHERE id = $1", [id]);

        res.status(200).json();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = nnProjectInfoRouter;
