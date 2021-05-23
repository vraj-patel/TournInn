const Tournament = require('../api/models/tournament')
const request = require("supertest");
const app = require('../app.js');
const mysqlConnection = require("../connection");

describe("testing tournament routes", () => {
  let newId;

  const tournamentObj = new Tournament({
    name: 'test tournament',
    description: 'test description'
  });
  
  it("POST /tournaments", async () => {
    const { body } = await request(app).post("/tournaments/").send(tournamentObj); 
    newId = body.id
    expect(body).toEqual({ message: 'Successfully inserted new tournament.', id: body.id });
  });

  it(`GET /tournaments/${newId}`, async () => {
    const { body } = await request(app).get(`/tournaments/${newId}`); 
    expect(body).toEqual(
      {
        id: newId,
        name: tournamentObj.name,
        description: tournamentObj.description,
        startTime: null,
        endTime: null,
        roundRobinDuration: null,
        playoffDuration: null,
        quarterFinalDuration: null,
        semiFinalDuration: null,
        finalDuration: null,
      }
    );
  });

  it(`PATCH /tournaments/${newId}`, async () => {
    newLocationObj = {
      name: 'test tournament 2',
      description: 'test description 2',
    }
    const { body } = await request(app).patch(`/tournaments/${newId}`).send(newLocationObj); 
    expect(body).toEqual({ message: "Successfully patched tournament." });
  });


  it(`DELETE /tournaments/${newId}`, async () => {
    const { body } = await request(app).delete(`/tournaments/${newId}`); 
    expect(body).toEqual({ message: "Successfully deleted tournament." });
  });

  it("GET /2/divisions", async () => {
    const { body } = await request(app).get("/tournaments/2/divisions"); 
    expect(body).toEqual([
      {
        id: 12,
        tournamentId: 2,
        name: "some division",
      }
    ]);
  });
});

afterAll(() => { 
  mysqlConnection.end()
});