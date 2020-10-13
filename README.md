# TournInn

A RESTful API for completely managing a tournament of any sport and predicting new games.

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
