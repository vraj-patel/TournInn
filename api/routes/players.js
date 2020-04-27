const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");
const PlayersController = require("../controllers/players");

router.get("/", PlayersController.getAllPlayers);

router.post(
  "/",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  PlayersController.postPlayer
);

router.get("/:playerId", PlayersController.getPlayer);

router.patch(
  "/:playerId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  PlayersController.patchPlayer
);

router.delete(
  "/:playerId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  PlayersController.deletePlayer
);

module.exports = router;
