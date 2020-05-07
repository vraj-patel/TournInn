const express = require("express");
const router = express.Router();

const PredictController = require("../controllers/predict");

router.get("/game/:tournId&:seasonId&:team1Id&:team2Id", PredictController.predictGame);

module.exports = router;
