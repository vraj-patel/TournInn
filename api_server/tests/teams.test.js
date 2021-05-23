const Team = require('../api/models/team')
const request = require("supertest");
const app = require('../app.js');
const mysqlConnection = require("../connection");

describe("testing team routes", () => {
  let newId;

  const teamObj = new Team({
    name: 'test team',
    divisionId: 2,
  });
  
  it("POST /teams", async () => {
    const { body } = await request(app).post("/teams/").send(teamObj); 
    newId = body.id
    expect(body).toEqual({ message: 'Successfully inserted new team.', id: body.id });
  });

  it(`GET /teams/${newId}`, async () => {
    const { body } = await request(app).get(`/teams/${newId}`); 
    expect(body).toEqual(
      {
        id: newId,
        name: teamObj.name,
        divisionId: teamObj.divisionId,
      }
    );
  });

  it(`PATCH /teams/${newId}`, async () => {
    newTeamObj = {
      name: 'test team 2',
    }
    const { body } = await request(app).patch(`/teams/${newId}`).send(newTeamObj); 
    expect(body).toEqual({ message: "Successfully patched team." });
  });

  it(`DELETE /teams/${newId}`, async () => {
    const { body } = await request(app).delete(`/teams/${newId}`); 
    expect(body).toEqual({ message: "Successfully deleted team." });
  });

  it("GET /3/players", async () => {
    const { body } = await request(app).get("/teams/3/players"); 
    expect(body).toEqual([
      {
        id: 4,
        name: 'player2',
        teamId: 3,
      }
    ]);
  });
});

afterAll(() => { 
  mysqlConnection.end()
});