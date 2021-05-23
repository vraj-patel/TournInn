const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");
const LocationsController = require("../controllers/locations");

router.get("/", LocationsController.getAllLocations);

router.post(
  "/",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  LocationsController.postLocation
);

router.get("/:locationId", LocationsController.getLocation);

router.patch(
  "/:locationId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  LocationsController.patchLocation
);

router.delete(
  "/:locationId",
  authenticate,
  authorize([Role.Admin, Role.Owner]),
  LocationsController.deleteLocation
);

module.exports = router;
