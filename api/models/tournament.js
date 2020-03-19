class Tournament {
  constructor(tournament) {
    this.id = tournament.id;
    this.name = tournament.name;
    this.description = tournament.description;
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
