exports.predictGame = (req, res, next) => {
  console.log(req.params.team1Id + " vs. " + req.params.team2Id);
  res.status(200).json(req.params.team1Id);
};
