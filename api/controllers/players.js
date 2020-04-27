const mysqlConnection = require("../../connection");
const Player = require("../models/player");

exports.getAllPlayers = (req, res, next) => {
  const query = "SELECT * FROM players";
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting all players failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received all players.");
      res.status(200).json(rows);
    }
  });
};

exports.postPlayer = (req, res, next) => {
  const newPlayer = new Player({
    id: null,
    name: req.body.name,
    teamId: req.body.teamId,
  });
  const query = "INSERT INTO players SET ?";

  mysqlConnection.query(query, newPlayer, (err, result) => {
    if (err) {
      console.log("Inserting new player failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully inserted new player.");
      res.status(201).json({
        message: "Successfully inserted new player.",
      });
    }
  });
};

exports.getPlayer = (req, res, next) => {
  const query = "SELECT * FROM players WHERE id = " + req.params.playerId;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting player failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received player.");
      res.status(200).json(rows[0]);
    }
  });
};

exports.patchPlayer = (req, res, next) => {
  const query = "UPDATE players SET ? where id = " + req.params.playerId;

  mysqlConnection.query(query, req.body, (err, result) => {
    if (err) {
      console.log("Patching player failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully patched player.");
      res.status(200).json({
        message: "Successfully patched player.",
      });
    }
  });
};

exports.deletePlayer = (req, res, next) => {
  const query = "DELETE FROM players WHERE id = " + req.params.playerId;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Deleting player failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully deleted player.");
      res.status(200).json({
        message: "Successfully deleted player.",
      });
    }
  });
};
