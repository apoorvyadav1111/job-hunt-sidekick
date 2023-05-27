const express = require("express");
const homeController = require("../controllers/home");

const router = express.Router();

router.post("/application", homeController.postApplication);

router.get("/application", homeController.getApplication);

router.put("/application/:jobId", homeController.putApplication);

router.get("/application/due", homeController.getDueApplication);

module.exports = router;
