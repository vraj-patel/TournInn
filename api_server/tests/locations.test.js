const Location = require('../api/models/location')
const request = require("supertest");
const app = require('../app.js');
const mysqlConnection = require("../connection");

describe("testing location routes", () => {
  let newId;

  const locationObj = new Location({
    name: 'test location',
    description: 'test description',
  });
  
  it("POST /locations", async () => {
    const { body } = await request(app).post("/locations/").send(locationObj); 
    newId = body.id
    expect(body).toEqual({ message: 'Successfully inserted new location.', id: body.id });
  });

  it(`GET /locations/${newId}`, async () => {
    const { body } = await request(app).get(`/locations/${newId}`); 
    expect(body).toEqual(
      {
        id: newId,
        name: locationObj.name,
        description: locationObj.description,
      }
    );
  });

  it(`PATCH /locations/${newId}`, async () => {
    newLocationObj = {
      name: 'test location 2',
      description: 'test description 2',
    }
    const { body } = await request(app).patch(`/locations/${newId}`).send(newLocationObj); 
    expect(body).toEqual({ message: "Successfully patched location." });
  });


  it(`DELETE /locations/${newId}`, async () => {
    const { body } = await request(app).delete(`/locations/${newId}`); 
    expect(body).toEqual({ message: "Successfully deleted location." });
  });
});

afterAll(() => { 
  mysqlConnection.end()
});