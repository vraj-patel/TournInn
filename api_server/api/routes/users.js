const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const Role = require("../models/role");
const UsersController = require("../controllers/users");

router.post(
  "/signup",
  authenticate,
  authorize([Role.Owner]),
  UsersController.signUp
);

router.post("/login", UsersController.login);

router.delete(
  "/:userId",
  authenticate,
  authorize([Role.Owner]),
  UsersController.deleteUser
);

module.exports = router;
