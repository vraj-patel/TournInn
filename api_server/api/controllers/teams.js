const mysqlConnection = require("../../connection");
const Team = require("../models/team");

exports.getAllTeams = (req, res, next) => {
  const query = "SELECT * FROM teams";
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting all teams failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received all teams.");
      res.status(200).json(rows);
    }
  });
};

exports.postTeam = (req, res, next) => {
  const newTeam = new Team({
    id: null,
    name: req.body.name,
    divisionId: req.body.divisionId,
  });
  const query = "INSERT INTO teams SET ?";

  mysqlConnection.query(query, newTeam, (err, result) => {
    if (err) {
      console.log("Inserting new team failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully inserted new team.");
      res.status(201).json({
        message: "Successfully inserted new team.",
        id: result.insertId
      });
    }
  });
};

exports.getTeam = (req, res, next) => {
  const query = "SELECT * FROM teams WHERE id = " + req.params.teamId;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting team failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received team.");
      res.status(200).json(rows[0]);
    }
  });
};

exports.getPlayersInTeam = (req, res, next) => {
  const query = "SELECT * FROM players WHERE teamId = " + req.params.teamId;
  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Getting players from team failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully received players from team.");
      res.status(200).json(rows);
    }
  });
};

exports.patchTeam = (req, res, next) => {
  const query = "UPDATE teams SET ? where id = " + req.params.teamId;

  mysqlConnection.query(query, req.body, (err, result) => {
    if (err) {
      console.log("Patching team failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully patched team.");
      res.status(200).json({
        message: "Successfully patched team.",
      });
    }
  });
};

exports.deleteTeam = (req, res, next) => {
  const query = "DELETE FROM teams WHERE id = " + req.params.teamId;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Deleting team failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully deleted team.");
      res.status(200).json({
        message: "Successfully deleted team.",
      });
    }
  });
};
