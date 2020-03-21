const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../connection");
const Division = require("../models/division");

router.get("/", (req, res, next) => {
  const query = "SELECT * FROM divisions";
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting all divisions failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully received all divisions.");
      res.status(200).json(rows);
    }
  });
});

router.post("/", (req, res, next) => {
  const newDivision = new Division({
    id: null,
    name: req.body.name,
    tournamentId: req.body.tournamentId
  });
  const query = "INSERT INTO divisions SET ?";

  mysqlConnection.query(query, newDivision, (err, result) => {
    if (err) {
      console.log("Inserting new division failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully inserted new division.");
      res.status(201).json({
        message: "Successfully inserted new division."
      });
    }
  });
});

router.get("/:divisionId", (req, res, next) => {
  const query = "SELECT * FROM divisions WHERE id = " + req.params.divisionId;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting division failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully received division.");
      res.status(200).json(rows[0]);
    }
  });
});

router.patch("/:divisionId", (req, res, next) => {
  const query = "UPDATE divisions SET ? where id = " + req.params.divisionId;

  mysqlConnection.query(query, req.body, (err, result) => {
    if (err) {
      console.log("Patching division failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully patched division.");
      res.status(200).json({
        message: "Successfully patched division."
      });
    }
  });
});

router.delete("/:divisionId", (req, res, next) => {
  const query = "DELETE FROM divisions WHERE id = " + req.params.divisionId;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Deleting division failed.");
      res.status(500).json({
        error: err
      });
    } else {
      console.log("Successfully deleted division.");
      res.status(200).json({
        message: "Successfully deleted division."
      });
    }
  });
});

module.exports = router;
