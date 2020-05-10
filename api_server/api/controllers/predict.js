const { PythonShell } = require("python-shell");
const mysqlConnection = require("../../connection");

exports.predictGame = (req, res, next) => {
  team1Query = `
  SELECT 
    SUM(CASE WHEN (winnerId = ${req.params.team1Id} AND tournamentId = ${req.params.tournId} AND seasonId=${req.params.seasonId}) then 1 end) as teamWins, 
    SUM(CASE when ((team1Id = ${req.params.team1Id} OR team2Id=${req.params.team1Id}) AND tournamentId = ${req.params.tournId} AND seasonId=${req.params.seasonId}) then 1 end) as totalGames 
  FROM games`;
  team2Query = `
  SELECT 
    SUM(CASE WHEN (winnerId = ${req.params.team2Id} AND tournamentId = ${req.params.tournId} AND seasonId=${req.params.seasonId}) then 1 end) as teamWins, 
    SUM(CASE when ((team1Id = ${req.params.team2Id} OR team2Id=${req.params.team2Id}) AND tournamentId = ${req.params.tournId} AND seasonId=${req.params.seasonId}) then 1 end) as totalGames 
  FROM games`;
  team1Query2 = `SELECT wins, losses FROM teamStandings WHERE teamId = ${req.params.team1Id};`;
  team2Query2 = `SELECT wins, losses FROM teamStandings WHERE teamId = ${req.params.team2Id};`;

  mysqlConnection.query(team1Query, (err, rows, fields) => {
    team1CurrWinPerc = rows[0].teamWins / rows[0].totalGames;

    mysqlConnection.query(team1Query2, (err, rows, fields) => {
      team1PrevWinPerc = rows[0].wins / (rows[0].wins + rows[0].losses);

      mysqlConnection.query(team2Query, (err, rows, fields) => {
        team2CurrWinPerc = rows[0].teamWins / rows[0].totalGames;

        mysqlConnection.query(team2Query2, (err, rows, fields) => {
          team2PrevWinPerc = rows[0].wins / (rows[0].wins + rows[0].losses);

          tm1WinPerc = (team1PrevWinPerc + 2 * team1CurrWinPerc) / 3;
          tm2WinPerc = (team2PrevWinPerc + 2 * team2CurrWinPerc) / 3;
          const options = {
            args: [tm1WinPerc, tm2WinPerc, req.params.isTeam1Home === "true" ? 1 : 0],
          };

          PythonShell.run("./api/machine_learning/predict_games.py", options, function (err, results) {
            if (err) res.status(500).json({ error: err });
            prediction = results[0];
            parseInt(prediction) ? (prediction = req.params.team1Id) : (prediction = req.params.team2Id);
            return res.status(200).json(prediction);
          });
        });
      });
    });
  });
};
