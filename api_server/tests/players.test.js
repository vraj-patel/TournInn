const Player = require('../api/models/player')
const request = require("supertest");
const app = require('../app.js');
const mysqlConnection = require("../connection");

describe("testing player routes", () => {
  let newId;

  const playerObj = new Player({
    name: 'test player',
    teamId: 1,
  });
  
  it("POST /players", async () => {
    const { body } = await request(app).post("/players/").send(playerObj); 
    newId = body.id
    expect(body).toEqual({ message: 'Successfully inserted new player.', id: body.id });
  });

  it(`GET /players/${newId}`, async () => {
    const { body } = await request(app).get(`/players/${newId}`); 
    expect(body).toEqual(
      {
        id: newId,
        name: playerObj.name,
        teamId: playerObj.teamId,
      }
    );
  });

  it(`PATCH /players/${newId}`, async () => {
    newPlayerObj = {
      name: 'test player 2',
    }
    const { body } = await request(app).patch(`/players/${newId}`).send(newPlayerObj); 
    expect(body).toEqual({ message: "Successfully patched player." });
  });

  it(`DELETE /players/${newId}`, async () => {
    const { body } = await request(app).delete(`/players/${newId}`); 
    expect(body).toEqual({ message: "Successfully deleted player." });
  });
});

afterAll(() => { 
  mysqlConnection.end()
});