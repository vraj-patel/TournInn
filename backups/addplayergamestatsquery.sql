CREATE TABLE TournInn.seasons (
	id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(32),
    description VARCHAR(256),
    PRIMARY KEY (id)
);

CREATE TABLE TournInn.playerGameStats (
	id INT NOT NULL AUTO_INCREMENT UNIQUE,
    playerId INT NOT NULL,
    playerAge INT,
    playerTeamId INT NOT NULL,
    opponentTeamId INT NOT NULL,
    seasonId INT NOT NULL,
    minutesPlayed INT NOT NULL,
    fieldGoals INT NOT NULL,
    fieldGoalAttempts INT NOT NULL,
    fieldGoalPercentage DECIMAL(6,3) NOT NULL,
    threePointers INT NOT NULL,
    threePointerAttempts INT NOT NULL,
    threePointPercentage DECIMAL(6,3) NOT NULL,
    freeThrows INT NOT NULL,
    freeThrowAttempts INT NOT NULL,
    freeThrowPercentage DECIMAL(6,3) NOT NULL,
    offensiveRebounds INT NOT NULL, 
    defensiveRebounds INT NOT NULL,
    totalRebouts INT NOT NULL,
    assists INT NOT NULL,
    steals INT NOT NULL,
    blocks INT NOT NULL,
    turnovers INT NOT NULL,
    personalFouls INT NOT NULL,
    points INT NOT NULL,
    gameScoreStat DECIMAL(6,3) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (playerId) REFERENCES players(id),
    FOREIGN KEY (playerTeamId) REFERENCES teams(id),
    FOREIGN KEY (opponentTeamId) REFERENCES teams(id),
    FOREIGN KEY (seasonId) REFERENCES seasons(id)
);

ALTER TABLE TournInn.teams ADD UNIQUE (name)




