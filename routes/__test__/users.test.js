const app = require('../../app');
const request = require('supertest');

describe('User SignUp', () => {
  /*   beforeEach(async () => {
    server = await app.listen(4030);
    //global.agent = request.agent(server);
  });
  afterEach(async () => {
    await server.close();
  }); */

  it('smoketest', async () => {
    await request(app)
      .post('/api/users/test')
      .send({
        //<-- body
        email: 'eeeeeefredagfesaat@test.com',
        name: 'fredags',
        password: 'password',
      })
      .expect(201); //<--statusCode
  });

  it('returns a 201 on successful signup', async () => {
    await request(app)
      .post('/api/users/') //<-- endpoint is found
      .set('my_user-agent', 'react')
      .send({
        email: 'gris@test.com',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(201);
  });
});

/* test("responds with status 200 the GET method", () => {
  return request(server)
    .get("/scoops")
    .then((response) => {
      expect(response.statusCode).toBe(200);
    });
}); */
