const express = require("express");
const { db } = require("../server/db-pgp");
const { keysToCamel } = require("../common/utils");

const bmRouter = express.Router();

bmRouter.use(express.json());

bmRouter.get('/', async (req, res) => {
    try {
        console.log("yes")
        const allNpos = await db.query(`SELECT * FROM bm_project_info;`)
        res.status(200).json(keysToCamel(allNpos)) 
    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = bmRouter;