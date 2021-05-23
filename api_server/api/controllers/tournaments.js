const mysqlConnection = require("../../connection");
const Tournament = require("../models/tournament");

exports.getAllTournaments = (req, res, next) => {
  const query = "SELECT * FROM tournaments";
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting all tournaments failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received all tournaments.");
      res.status(200).json(rows);
    }
  });
};

exports.postTournament = (req, res, next) => {
  const newTournament = new Tournament({
    id: null,
    name: req.body.name,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    roundRobinDuration: req.body.roundRobinDuration,
    playoffDuration: req.body.playoffDuration,
    quarterFinalDuration: req.body.quarterFinalDuration,
    semiFinalDuration: req.body.semiFinalDuration,
    finalDuration: req.body.finalDuration,
  });
  const query = "INSERT INTO tournaments SET ?";

  mysqlConnection.query(query, newTournament, (err, result) => {
    if (err) {
      console.log("Inserting new tournament failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully inserted new tournament.");
      res.status(201).json({
        message: "Successfully inserted new tournament.",
        id: result.insertId
      });
    }
  });
};

exports.getTournament = (req, res, next) => {
  const query =
    "SELECT * FROM tournaments WHERE id = " + req.params.tournamentId;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting tournament failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received tournament.");
      res.status(200).json(rows[0]);
    }
  });
};

exports.getDivisionsInTournament = (req, res, next) => {
  const query =
    "SELECT * FROM divisions WHERE tournamentId = " + req.params.tournamentId;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting divisions from tournament failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received divisions from tournament.");
      res.status(200).json(rows);
    }
  });
};

exports.patchTournament = (req, res, next) => {
  const query =
    "UPDATE tournaments SET ? where id = " + req.params.tournamentId;

  mysqlConnection.query(query, req.body, (err, result) => {
    if (err) {
      console.log("Patching tournament failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully patched tournament.");
      res.status(200).json({
        message: "Successfully patched tournament.",
      });
    }
  });
};

exports.deleteTournament = (req, res, next) => {
  const query = "DELETE FROM tournaments WHERE id = " + req.params.tournamentId;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Deleting tournament failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully deleted tournament.");
      res.status(200).json({
        message: "Successfully deleted tournament.",
      });
    }
  });
};
