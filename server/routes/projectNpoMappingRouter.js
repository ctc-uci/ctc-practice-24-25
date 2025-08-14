const express = require("express");

const { db } = require("../server/db-pgp");

const projectNpoMappingRouter = express.Router();

const { keysToCamel } = require("../common/utils");

projectNpoMappingRouter.use(express.json());

projectNpoMappingRouter.get("/", async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM ee_proj_npo_mapping");
        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

projectNpoMappingRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const data = await db.query(
            `SELECT * FROM ee_proj_npo_mapping WHERE id = $1`,
            [id]
        );

        res.status(200).json(keysToCamel(data));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = projectNpoMappingRouter;
