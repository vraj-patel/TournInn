const User = require('../api/models/user')
const request = require("supertest");
const app = require('../app.js');
const mysqlConnection = require("../connection");

describe("testing tournament routes", () => {
  let newId;

  const userObj = new User({
    email: 'test@test.com',
    password: require('../nodemon.json').env.TEST_USER_PASSWORD,
    role: 'admin'
  });
  
  it("POST /users/signup", async () => {
    const { body } = await request(app).post("/users/signup/").send(userObj); 
    newId = body.id
    expect(body).toEqual({ message: 'Successfully inserted new user.', id: body.id });
  });

  it("POST /users/login", async () => {
    const { body } = await request(app).post("/users/login/").send(userObj); 
    expect(body).toEqual({ 
        message: "Login successful.",
        token: body.token,
    });
  });

  it(`DELETE /users/${newId}`, async () => {
    const { body } = await request(app).delete(`/users/${newId}/`); 
    newId = body.id
    expect(body).toEqual({ 
        message: "User was successfully deleted.",
    });
  });
});

afterAll(() => { 
  mysqlConnection.end()
})