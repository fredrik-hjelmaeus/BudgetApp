const app = require('../../app');
const request = require('supertest');

describe('User SignUp', () => {
  it('returns a 201 on successful signup using mobile-app', async () => {
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', '')
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
  it('fails when trying to signup with existing user', async () => {
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'gris@test.com',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(201);

    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'gris@test.com',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(400);
  });
  it('fails when no email is provided', async () => {
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: '',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(400);
  });
  it('fails when invalid email is provided ', async () => {
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'invalidemail.com',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(400);
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: '@invalidemail.com',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(400);
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'invalidemail@.com',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(400);
  });
  it('fails when no name is provided ', async () => {
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'valid@email.com',
        name: '',
        password: 'Passw0rd!',
      })
      .expect(400);
  });
  it('fails on invalid password', async () => {
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'valid@email.com',
        name: 'valid',
        password: '',
      })
      .expect(400);
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'valid@email.com',
        name: 'valid',
        password: 'a',
      })
      .expect(400);
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'valid@email.com',
        name: 'valid',
        password: 'abcde',
      })
      .expect(400);
    await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'valid@email.com',
        name: 'valid',
        password: 'password',
      })
      .expect(201);
  });
});
