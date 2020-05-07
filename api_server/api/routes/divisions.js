const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");
const DivisionsController = require("../controllers/divisions");

router.get("/", DivisionsController.getAllDivisions);

router.post("/", authenticate, authorize([Role.Admin, Role.Owner]), DivisionsController.postDivision);

router.get("/:divisionId", DivisionsController.getDivision);

router.get("/:divisionId/teams", DivisionsController.getTeamsInDivision);

router.patch("/:divisionId", authenticate, authorize([Role.Admin, Role.Owner]), DivisionsController.patchDivision);

router.delete("/:divisionId", authenticate, authorize([Role.Admin, Role.Owner]), DivisionsController.deleteDivision);

module.exports = router;
