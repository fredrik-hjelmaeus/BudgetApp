const request = require('supertest');
const app = require('../../app');

it('guide happy path', async () => {
  // Signup user
  const response = await request(app)
    .post('/api/users')
    .set('my_user-agent', 'react')
    .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' })
    .expect(201);

  return await request(app).get('/api/guide').set('x-auth-token', response.body.token).expect(200);
});
it('fails to get guide when not logged in', async () => {
  return request(app).get('/api/guide').expect(401);
});
