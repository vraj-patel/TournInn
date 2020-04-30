const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");
const GamesController = require("../controllers/games");

router.get("/", GamesController.getAllGames);

router.post(
  "/",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  GamesController.postGame
);

router.get("/:gameId", GamesController.getGame);

router.patch(
  "/:gameId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  GamesController.patchGame
);

router.delete(
  "/:gameId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  GamesController.deleteGame
);

module.exports = router;
