const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose'); //used to validate mongo _id

describe('authorization flow', () => {
  it('get logged in user data', async () => {
    // NOTE dependant on signup working.
    // signup new user to retrieve a valid token
    const response = await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'gris@test.com',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(201);

    // use token from above to get logged in user.
    // prettier-ignore
    await request(app)
    .get('/api/auth/')
    .set('my_user-agent', 'react')
    .set('x-auth-token', response.body.token)
    .expect(200);
  });
  it('user id is valid mongodb id', async () => {
    // NOTE dependant on signup working and mongoDB _id.
    // Will break if switching away from mongoDB database
    // signup new user to retrieve a valid token
    const response = await request(app)
      .post('/api/users/')
      .set('my_user-agent', 'react')
      .send({
        email: 'gris@test.com',
        name: 'fredags',
        password: 'Passw0rd!',
      })
      .expect(201);

    // use token from above to get logged in user.
    // prettier-ignore
    const userdata = await request(app)
    .get('/api/auth/')
    .set('my_user-agent', 'react')
    .set('x-auth-token', response.body.token)
    .expect(200);
    const isValid = mongoose.Types.ObjectId.isValid(userdata.body._id);
    expect(isValid).toEqual(true);
  });
  it('does no get user data when not logged in', async () => {
    await request(app).get('/api/auth/').set('my_user-agent', 'react').expect(401);
  });
  it('does no get user data when invalid token is provided', async () => {
    const invalidToken =
      'cyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMmUwNDIyMzNiZjYzYjUwM2M0NGM3In0sImlhdCI6MTY0MjI1ODQ5OCwiZXhwIjoxNjQyMjYyMDk4fQ.bSwhOuHZ5vSjBtsHW6R92Mru5-0eRo0ShvtHb-H5O6o';

    // prettier-ignore
    await request(app)
    .get('/api/auth/')
    .set('my_user-agent', 'react')
    .set('x-auth-token', invalidToken)
    .expect(401);
  });
  it('does no get user data with expired token is provided', () => {});
});
