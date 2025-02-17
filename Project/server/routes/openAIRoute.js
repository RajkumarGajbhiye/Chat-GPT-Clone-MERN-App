const express = require("express");
const { summaryController } = require("../controllers/openAIController.js");

const router = express.Router();

router.post("/summary",summaryController);

module.exports = router;