const app = require('../../app');
const request = require('supertest');

it('smoketest', async () => {
  await request(app)
    .post('/api/users/test') //<-- endpoint
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
    .post('/api/users/')
    .send({
      email: 'gris@test.com',
      name: 'fredags',
      password: 'password',
    })
    .expect(201);
});
