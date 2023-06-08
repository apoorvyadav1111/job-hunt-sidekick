import express from "express";

const ddlController = require("../controllers/ddl");

const router = express.Router();

router.get("/company",ddlController.getCompanyDDL);

router.get("/stack",ddlController.getStackDDL);

module.exports = router