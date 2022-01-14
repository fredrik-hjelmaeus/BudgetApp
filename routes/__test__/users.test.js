const app = require('../../app');
const request = require('supertest');

describe('User SignUp', () => {
  it('returns a 201 on successful signup using mobile-app', async () => {
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'gris@test.com',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(201);
  });
  it('returns a 201 on successful signup using web-app', async () => {
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'gris@test.com',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(201);
  });
  it('fails when trying to signup with existing user', async () => {});
  it('fails when no email is provided', async () => {});
  it('fails when invalid email is provided ', async () => {});
  it('fails when no name is provided ', async () => {});
  it('fails on invalid password', async () => {});
});
