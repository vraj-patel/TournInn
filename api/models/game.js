class Game {
  constructor(game) {
    this.id = game.id;
    this.sport = game.sport;
    this.startTime = game.startTime;
    this.endTime = game.endTime;
    this.winner = game.winner;
    this.type = game.type;
    this.team1Id = game.team1Id;
    this.team2Id = game.team2Id;
    this.team1Score = game.team1Score;
    this.team2Score = game.team2Score;
  }
}

module.exports = Game;
