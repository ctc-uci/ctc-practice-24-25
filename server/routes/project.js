const express = require('express');
const { keysToCamel } = require('../common/utils');
const { db } = require('../server/db-pgp');
const ProjectsRouter = express.Router();

// GET - get all projects in table
ProjectsRouter.get('/', async (req, res) => {
    try {
        const projects = await db.query(`SELECT * FROM eh_project_info;`);
        res.status(200).json(keysToCamel(projects));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET - get all projects in table, along with NPO data
ProjectsRouter.get('/npo-projects', async (req, res) => {
    try {
        const projects = await db.query(
            `SELECT * FROM eh_project_info, npo_info WHERE eh_project_info.npo_id = npo_info.id;`
        );
        res.status(200).json(keysToCamel(projects));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET - get project by id
ProjectsRouter.get('/:id', async (req, res) => {
    try {
        const { proj_id } = req.params;
        const project = await db.query(
            `SELECT * FROM eh_project_info WHERE id = $1;`, 
            [proj_id]
        );
        res.status(200).json(keysToCamel(project));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST - insert new project in table
ProjectsRouter.post('/', async (req, res) => {
    try {
        const { npo_id, start_year, end_year, project_leads } = req.body;
        const project = await db.query(
            `INSERT INTO eh_project_info (npo_id, start_year, end_year, project_leads)
             VALUES ($1, $2, $3, $4) RETURNING id;`, 
             [npo_id, start_year, end_year, project_leads]
        );
        res.status(201).json({status: 'Success', id: project[0].id});
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// PUT - update existing project in table
ProjectsRouter.put('/:id', async (req, res) => {
    try {
        const { proj_id } = req.params;
        const { npo_id, start_year, end_year, project_leads } = req.body;
        const project = await db.query(
            `UPDATE eh_project_info SET 
                npo_id = COALESCE($1, npo_id),
                start_year = COALESCE($2, start_year),
                end_year = COALESCE($3, end_year),
                project_leads = COALESCE($4, project_leads)
            WHERE id = $5 RETURNING *;`
            [npo_id, start_year, end_year, project_leads, proj_id]
        );
        res.status(200).json(keysToCamel(project));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE - delete existing project from table
ProjectsRouter.delete('/:id', async (req, res) => {
    try {
        const { proj_id } = req.params;
        const project = await db.query(
            `DELETE FROM eh_project_info WHERE id = $1 RETURNING *;`,
            [proj_id]
        );
        res.status(200.).json(keysToCamel(project));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = ProjectsRouter;