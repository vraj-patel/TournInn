const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");
const TeamsController = require("../controllers/teams");

router.get("/", TeamsController.getAllTeams);

router.post(
  "/",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  TeamsController.postTeam
);

router.get("/:teamId", TeamsController.getTeam);

router.get("/:teamId/players", TeamsController.getPlayersInTeam);

router.patch(
  "/:teamId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  TeamsController.patchTeam
);

router.delete(
  "/:teamId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  TeamsController.deleteTeam
);

module.exports = router;
