const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");
const TournamentsController = require("../controllers/tournaments");

router.get("/", TournamentsController.getAllTournaments);

router.post(
  "/",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  TournamentsController.postTournament
);

router.get("/:tournamentId", TournamentsController.getTournament);

router.get(
  "/:tournamentId/divisions",
  TournamentsController.getDivisionsInTournament
);

router.patch(
  "/:tournamentId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  TournamentsController.patchTournament
);

router.delete(
  "/:tournamentId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  TournamentsController.deleteTournament
);

module.exports = router;
