const express = require("express");
const homeController = require("../controllers/home");

const router = express.Router();


router.delete("/:jobId", homeController.deleteApplication);

router.post("/", homeController.postApplication);

router.get("/", homeController.getApplication);

router.put("/:jobId", homeController.putApplication);

router.get("/due", homeController.getDueApplication);

module.exports = router;
