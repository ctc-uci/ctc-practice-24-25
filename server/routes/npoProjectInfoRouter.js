const express = require('express');
const { db } = require('../server/db-pgp');

const npoProjectInfoRouter = express.Router();

npoProjectInfoRouter.get('/', async (req, res) => {
  try {
    const results = await db.query(`SELECT * from npo_info as npo INNER JOIN sz_project_info as szp ON npo.id = szp.npo_id;`);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = npoProjectInfoRouter;
