const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../connection");
const Team = require("../models/team");

router.get("/", (req, res, next) => {
  const query = "SELECT * FROM teams";
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting all teams failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully received all teams.");
      res.status(200).json(rows);
    }
  });
});

router.post("/", (req, res, next) => {
  const newTeam = new Team({
    id: null,
    name: req.body.name,
    divisionId: req.body.divisionId
  });
  const query = "INSERT INTO teams SET ?";

  mysqlConnection.query(query, newTeam, (err, result) => {
    if (err) {
      console.log("Inserting new team failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully inserted new team.");
      res.status(201).json({
        message: "Successfully inserted new team."
      });
    }
  });
});

router.get("/:teamId", (req, res, next) => {
  const query = "SELECT * FROM teams WHERE id = " + req.params.teamId;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting team failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully received team.");
      res.status(200).json(rows[0]);
    }
  });
});

router.patch("/:teamId", (req, res, next) => {
  const query = "UPDATE teams SET ? where id = " + req.params.teamId;

  mysqlConnection.query(query, req.body, (err, result) => {
    if (err) {
      console.log("Patching team failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully patched team.");
      res.status(200).json({
        message: "Successfully patched team."
      });
    }
  });
});

router.delete("/:teamId", (req, res, next) => {
  const query = "DELETE FROM teams WHERE id = " + req.params.teamId;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Deleting team failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully deleted team.");
      res.status(200).json({
        message: "Successfully deleted tournament."
      });
    }
  });
});

module.exports = router;
