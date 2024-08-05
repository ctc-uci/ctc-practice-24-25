const express = require("express");
const { db } = require("../server/db-pgp");
const { keysToCamel } = require("../common/utils");

const npoRouter = express.Router();

npoRouter.use(express.json());

// GET - returns all npos in the table
npoRouter.get("/", async (req, res) => {
    try {
        const allNpos = await db.query(
            `SELECT npo.name, npo.description, bm.start_year, bm.end_year, bm.project_leads
            FROM bm_project_info AS bm
            INNER JOIN npo_info AS npo
            ON npo.id = bm.npo_id`
        );
        res.status(200).json(keysToCamel(allNpos));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST - creates a new npo in the table
npoRouter.post("/", async (req, res) => {
    const { start_year, end_year, project_leads, npo_id } = req.body;
    try {
        const returnedData = await db.query(
            `INSERT INTO bm_project_info (start_year, end_year, project_leads, npo_id)
            VALUES ($1, $2, $3, $4);`,
            [start_year, end_year, project_leads, npo_id]
        );
        res.status(200).json({ status: "Success" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT - updates the npo by the specific id
npoRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { start_year, end_year, project_leads, npo_id } = req.body;

    try {
        const { count } = (
            await db.query(
                `SELECT COUNT(*) FROM bm_project_info WHERE id = $1;`,
                [id]
            )
        )[0];

        if (count === "1") {
            const updatedNpo = await db.query(
                `UPDATE bm_project_info SET 
                start_year = $1,
                end_year = $2,
                project_leads = $3,
                npo_id = $4
                WHERE id = $5;`,
                [start_year, end_year, project_leads, npo_id, id]
            );
        }

        res.status(200).json({ status: "Successful put" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE - deletes the specific npo by id
npoRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deleteNpo = await db.query(
            `DELETE FROM bm_project_info WHERE id = $1;`,
            [id]
        );
        res.status(200).json({ status: "Success" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = npoRouter;
