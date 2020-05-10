const { PythonShell } = require("python-shell");
const mysqlConnection = require("../../connection");

getWinPerc = (teamId, tournId, seasonId) => {
  query = `
  SELECT 
    SUM(CASE WHEN (winnerId = ${teamId} AND tournamentId = ${tournId} AND seasonId=${seasonId}) then 1 end) as teamWins, 
    SUM(CASE when ((team1Id = ${teamId} OR team2Id=${teamId}) AND tournamentId = ${tournId} AND seasonId=${seasonId}) then 1 end) as totalGames 
  FROM games;
  SELECT wins, losses FROM teamStandings WHERE teamId = ${teamId};
  `;

  return new Promise((resolve, reject) => {
    mysqlConnection.query(query, (err, rows, fields) => {
      if (err) throw err;
      rows = JSON.parse(JSON.stringify(rows));
      result1 = rows[0];
      result2 = rows[1];

      currWinPerc = result1[0].teamWins / result1[0].totalGames;
      prevWinPerc = result2[0].wins / (result2[0].wins + result2[0].losses);
      winPerc = (prevWinPerc + 2 * currWinPerc) / 3;

      resolve(winPerc);
    });
  });
};

exports.predictGame = async (req, res, next) => {
  try {
    tm1WinPerc = await getWinPerc(req.params.team1Id, req.params.tournId, req.params.seasonId);
    tm2WinPerc = await getWinPerc(req.params.team2Id, req.params.tournId, req.params.seasonId);
  } catch (error) {
    res.status(500).json({ error });
  }

  const options = {
    args: [tm1WinPerc, tm2WinPerc, req.params.isTeam1Home === "true" ? 1 : 0],
  };

  PythonShell.run("./api/machine_learning/predict_games.py", options, function (err, results) {
    if (err) res.status(500).json({ error: err });
    prediction = results[0];
    parseInt(prediction) ? (prediction = req.params.team1Id) : (prediction = req.params.team2Id);
    return res.status(200).json(prediction);
  });
};
