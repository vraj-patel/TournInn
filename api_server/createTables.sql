CREATE TABLE TournInn.users (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    email VARCHAR(320) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE TournInn.tournaments (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    startTime DATETIME,
    endTime DATETIME,
    roundRobinDuration INT,
    playoffDuration INT,
    quarterFinalDuration INT,
    semiFinalDuration INT,
    finalDuration INT,
    PRIMARY KEY (id)
);

CREATE TABLE TournInn.divisions (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    tournamentId INT NOT NULL,
    FOREIGN KEY (tournamentId) REFERENCES TournInn.Tournaments(id)
);

CREATE TABLE TournInn.teams (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    divisionId INT NOT NULL,
    FOREIGN KEY (divisionId) REFERENCES TournInn.divisions(id)
);

CREATE TABLE TournInn.players (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    teamId INT NOT NULL,
    FOREIGN KEY (teamId) REFERENCES TournInn.teams(id)
);

CREATE TABLE TournInn.locations (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE TournInn.games (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    sport VARCHAR(50) NOT NULL,
    startTime DATETIME,
    endTime DATETIME,
    winnerId INT NOT NULL,
    type VARCHAR(50),
    team1Id INT NOT NULL,
    team2Id INT NOT NULL,
    team1Score INT NOT NULL,
    team2Score INT NOT NULL,
    locationId INT,
    tournamentId INT,
    seasonId INT,
    homeTeamId INT,
    FOREIGN KEY (winnerId) REFERENCES TournInn.teams(id),
    FOREIGN KEY (team1Id) REFERENCES TournInn.teams(id),
    FOREIGN KEY (team2Id) REFERENCES TournInn.teams(id),
    FOREIGN KEY (homeTeamId) REFERENCES TournInn.teams(id),
    FOREIGN KEY (locationId) REFERENCES TournInn.locations(id),
    FOREIGN KEY (tournamentId) REFERENCES TournInn.tournaments(id)
);