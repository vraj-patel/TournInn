# TournInn

A API for completely managing a tournament of any sport and predicting the results of new games.

## Setup

1. Clone project
2. run `cd api_server & npm install`
3. Start mysql server and create TournInn DB
4. Copy-paste queries from createTables.sql to define schemas
5. Create and place nodemon.json (environment variable file) in the /api_server directory and populate it as follows:

```json
{
  "env": {
    "JWT_KEY": "CHOOSE YOUR KEY",
    "DB_PASSWORD": "YOUR MYSQL PASSWORD",
    "AUTH_TOKEN": "LOGIN AS OWNER USING ENDPOINT AND PASTE AUTH_TOKEN HERE",
    "TEST_USER_PASSWORD": "CHOOSE YOUR PASSWORD FOR TEST USER"
  }
}
```

## TournInn API (api_server)

Installation:

Run `npm install` to install the required libraries.

Division Endpoints `/divisions`:

`GET /`

`POST /`

`GET /:divisionId`

`PATCH /:divisionId`

`DELETE /:divisionId`

`GET /:divisionId/teams`

Game Endpoints `/games`:

`GET /`

`POST /`

`GET /:gameId`

`PATCH /:gameId`

`DELETE /:gameId`

Location Endpoints `/locations`:

`GET /`

`POST /`

`GET /:locationId`

`PATCH /:locationId`

`DELETE /:locationId`

Player Endpoints `/players`:

`GET /`

`POST /`

`GET /:playerId`

`PATCH /:playerId`

`DELETE /:playerId`

Team Endpoints `/teams`:

`GET /`

`POST /`

`GET /:teamId`

`PATCH /:teamId`

`DELETE /:teamId`

`GET /:teamId/players`

Tournament Endpoints `/tournaments`:

`GET /`

`POST /`

`GET /:tournamentId`

`PATCH /:tournamentId`

`DELETE /:tournamentId`

`GET /:tournamentId/divisions`

User Endpoints `/users`:

`POST /signup`

`POST /login`

`DELETE /:userId`

Predict Endpoints `/predict`:

`GET /game/:tournId&:seasonId&:team1Id&:team2Id&:isTeam1Home`
