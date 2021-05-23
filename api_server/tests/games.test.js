const Game = require('../api/models/game');
const request = require("supertest");
const app = require('../app.js');
const mysqlConnection = require("../connection");

describe("testing games routes", () => {
  let newId;

  const gameObj = new Game({
    sport: 'basketball',
    team1Id: 1,
    team2Id: 3,
    team1Score: 100,
    team2Score: 102,
    tournamentId: 1,
    seasonId: 1
  });
  
  it("POST /games", async () => {
    const { body } = await request(app).post("/games/").send(gameObj); 
    newId = body.id
    expect(body).toEqual({ message: 'Successfully inserted new game.', id: body.id });
  });

  it(`GET /games/${newId}`, async () => {
    const { body } = await request(app).get(`/games/${newId}`); 
    expect(body).toEqual(
      {
        id: newId,
        sport: 'basketball',
        team1Id: gameObj.team1Id,
        team2Id: gameObj.team2Id,
        team1Score: gameObj.team1Score,
        team2Score: gameObj.team2Score,
        tournamentId: gameObj.tournamentId,
        seasonId:gameObj.seasonId,
        endTime: null,
        homeTeamId: null,
        locationId: null,
        startTime: null,
        type: null,
        winnerId: null

      }
    );
  });

  it(`PATCH /games/${newId}`, async () => {
    newGameObj = {
        sport: 'soccer',
        team1Id: 1,
        team2Id: 3,
        team1Score: 2,
        team2Score: 3,
        tournamentId: 1,
        seasonId: 1
    }
    const { body } = await request(app).patch(`/games/${newId}`).send(newGameObj); 
    expect(body).toEqual({ message: "Successfully patched game." });
  });

  it(`DELETE /games/${newId}`, async () => {
    const { body } = await request(app).delete(`/games/${newId}`); 
    expect(body).toEqual({ message: "Successfully deleted game." });
  });
});

afterAll(() => { 
  mysqlConnection.end()
});