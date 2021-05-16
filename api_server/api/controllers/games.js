const mysqlConnection = require("../../connection");
const Game = require("../models/game");

exports.getAllGames = (req, res, next) => {
  const query = "SELECT * FROM games";
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting all games failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received all games.");
      res.status(200).json(rows);
    }
  });
};

exports.postGame = (req, res, next) => {
  const newGame = new Game({
    id: null,
    sport: req.body.sport,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    winnerId: req.body.winnerId,
    type: req.body.type,
    team1Id: req.body.team1Id,
    team2Id: req.body.team2Id,
    team1Score: req.body.team1Score,
    team2Score: req.body.team2Score,
    locationId: req.body.locationId,
    tournamentId: req.body.tournamentId,
    seasonId: req.body.seasonId
  });
  const query = "INSERT INTO games SET ?";

  mysqlConnection.query(query, newGame, (err, result) => {
    if (err) {
      console.log("Inserting new game failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully inserted new game.");
      res.status(201).json({
        message: "Successfully inserted new game.",
      });
    }
  });
};

exports.getGame = (req, res, next) => {
  const query = "SELECT * FROM games WHERE id = " + req.params.gameId;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting game failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received game.");
      res.status(200).json(rows[0]);
    }
  });
};

exports.patchGame = (req, res, next) => {
  const query = "UPDATE games SET ? where id = " + req.params.gameId;

  mysqlConnection.query(query, req.body, (err, result) => {
    if (err) {
      console.log("Patching game failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully patched game.");
      res.status(200).json({
        message: "Successfully patched game.",
      });
    }
  });
};

exports.deleteGame = (req, res, next) => {
  const query = "DELETE FROM games WHERE id = " + req.params.gameId;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Deleting game failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully deleted game.");
      res.status(200).json({
        message: "Successfully deleted game.",
      });
    }
  });
};
