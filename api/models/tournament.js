class Tournament {
  constructor(tournament) {
    this.id = tournament.id;
    this.startTime = tournament.startTime;
    this.endTime = tournament.endTime;
    this.roundRobinDuration = tournament.roundRobinDuration;
    this.playoffDuration = tournament.playoffDuration;
    this.quarterFinalDuration = tournament.quarterFinalDuration;
    this.semiFinalDuration = tournament.semiFinalDuration;
    this.finalDuration = tournament.finalsDuration;
  }
}

module.exports = Tournament;
