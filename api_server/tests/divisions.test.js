const Division = require('../api/models/division')
const request = require("supertest");
const app = require('../app.js');
const mysqlConnection = require("../connection");

describe("testing division routes", () => {
  let newId;

  const divisionObj = new Division({
    name: 'test division',
    tournamentId: 1,
  });
  
  it("POST /divisions", async () => {
    const { body } = await request(app).post("/divisions/").send(divisionObj); 
    newId = body.id
    expect(body).toEqual({ message: 'Successfully inserted new division.', id: body.id });
  });

  it(`GET /divisions/${newId}`, async () => {
    const { body } = await request(app).get(`/divisions/${newId}`); 
    expect(body).toEqual(
      {
        id: newId,
        tournamentId: divisionObj.tournamentId,
        name: divisionObj.name,
      }
    );
  });

  it("GET /3/teams", async () => {
    const { body } = await request(app).get("/divisions/3/teams"); 
    expect(body).toEqual([
      {
        id: 35,
        divisionId: 3,
        name: "Test Team",
      }
    ]);
  });
  
  it(`PATCH /divisions/${newId}`, async () => {
    newDivisionObj = {
      name: 'test division 2',
      tournamentId: divisionObj.tournamentId,
    }
    const { body } = await request(app).patch(`/divisions/${newId}`).send(newDivisionObj); 
    expect(body).toEqual({ message: "Successfully patched division." });
  });


  it(`DELETE /divisions/${newId}`, async () => {
    const { body } = await request(app).delete(`/divisions/${newId}`); 
    expect(body).toEqual({ message: "Successfully deleted division." });
  });
});

afterAll(() => { 
  mysqlConnection.end()
});