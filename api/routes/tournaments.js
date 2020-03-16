const express = require("express");
const router = express.Router();
const mysqlConnection = require("../../connection");

router.get("/", (req, res, next) => {
  const query = "SELECT * FROM tournaments";
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("There was an error: ", err);
    } else {
      res.send(rows);
    }
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handling POST request to tournaments"
  });
});

router.get("/:tournamentId", (req, res, next) => {
  const id = req.params.tournamentId;
  if (id === "special") {
    res.status(200).json({
      message: "You selected the special id"
    });
  } else {
    res.status(200).json({
      message: "You passed a normal id"
    });
  }
});

router.patch("/:tournamentId", (req, res, next) => {
  res.status(200).json({
    message: "PATCHED a tournament"
  });
});

router.delete("/:tournamentId", (req, res, next) => {
  res.status(200).json({
    message: "DELETED a tournament"
  });
});

module.exports = router;
