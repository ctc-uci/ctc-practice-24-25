const express = require("express");
const { db } = require("../server/db-pgp");
const { keysToCamel } = require("../common/utils");

const projectInfoRouter = express.Router();

projectInfoRouter.use(express.json());

projectInfoRouter.get("/", async (req, res) => {
    try {
        const allProjects = await db.query(`SELECT * FROM sk_project_info;`);
        res.status(200).json(keysToCamel(allProjects));
    } catch (err) {
      res.status(500).send(err.message);
    }
});

projectInfoRouter.post("/", async (req, res) => {
    try {
        const { npoId, startYear, endYear, projectLeads } = req.body;

        const newProject = await db.query(
          `INSERT INTO sk_project_info (
            npo_id,
            start_year,
            end_year,
            project_leads
          ) VALUES (
            $1, $2, $3, $4
          ) RETURNING id;
          `,
          [npoId, startYear, endYear, projectLeads],
        );

        res.status(200).json({
          status: 'Success',
          id: newProject[0].id,
        });
    } catch (err) {
      res.status(500).send(err.message);
    }
});

projectInfoRouter.put("/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const { npoId, startYear, endYear, projectLeads } = req.body;

    const updateProject = await db.query(
      `
      UPDATE sk_project_info
      SET
        npo_id = COALESCE($1, npo_id),
        start_year = COALESCE($2, start_year),
        end_year = COALESCE($3, end_year),
        project_leads = COALESCE($4, project_leads)
      WHERE id = $5
      RETURNING *;
      `,
      [npoId, startYear, endYear, projectLeads, id],
    );
    res.status(200).send(keysToCamel(updateProject));
  } catch (err) {
    res.status(500)
  }
});

projectInfoRouter.delete("/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const deletedDay = await db.query(`DELETE FROM sk_project_info WHERE id = $1 RETURNING *;`, [id]);
    res.status(200).send(keysToCamel(deletedDay));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = projectInfoRouter;
