const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose'); //used to validate mongo _id

// prevents sendEmail from sending mail
jest.mock('../../utils/sendEmail');
const sendEmail = require('../../utils/sendEmail');

describe('authorization flow', () => {
  describe('GET api/auth', () => {
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
    it('does no get user data with expired token', async () => {
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMmM0YzE2ZTg3NGQ0ODQwZGJlZjZhIn0sImlhdCI6MTY0MjI1MTQ1NywiZXhwIjoxNjQyMjU1MDU3fQ.K6rAO-UBKow2saWSFVOMn1Q6ezDZcJdQKlOGzKz_Wc0';
      // prettier-ignore
      await request(app)
        .get('/api/auth/')
        .set('my_user-agent', 'react')
        .set('x-auth-token', expiredToken)
        .expect(401);
    });
  });
  describe('POST api/auth', () => {
    it('Auth user & get token web', async () => {
      // NOTE dependant on signup working.
      // signup new user to retrieve a valid token
      await request(app)
        .post('/api/users/')
        .set('my_user-agent', 'react')
        .send({
          email: 'gris@test.com',
          name: 'fredags',
          password: 'Passw0rd!',
        })
        .expect(201);

      //login user with email and password
      const response = await request(app)
        .post('/api/auth')
        .set('my_user-agent', 'react')
        .send({
          email: 'gris@test.com',
          password: 'Passw0rd!',
        })
        .expect(200);
      expect(response.body.token).toBeDefined();
    });
    it('Auth user & get token mobile', async () => {
      // NOTE dependant on signup working.
      // signup new user to retrieve a valid token
      await request(app)
        .post('/api/users/')
        .send({
          email: 'gris@test.com',
          name: 'fredags',
          password: 'Passw0rd!',
        })
        .expect(201);

      //login user with email and password
      const response = await request(app)
        .post('/api/auth')
        .send({
          email: 'gris@test.com',
          password: 'Passw0rd!',
        })
        .expect(200);
      expect(response.body.token).toBeDefined();
    });
    it('fails with valid email but no user in database', async () => {
      const response = await request(app)
        .post('/api/auth')
        .send({
          email: 'gris@test.com',
          password: 'Passw0rd!',
        })
        .expect(400);
      expect(response.body.token).toBeUndefined();
    });
    it('fails with invalid email', async () => {
      // NOTE dependant on signup working.
      // signup new user to retrieve a valid token
      await request(app)
        .post('/api/users/')
        .send({
          email: 'gris@test.com',
          name: 'fredags',
          password: 'Passw0rd!',
        })
        .expect(201);

      //login user with email and password
      const response = await request(app)
        .post('/api/auth')
        .send({
          email: 'griss@test.com',
          password: 'Passw0rd!',
        })
        .expect(400);
      expect(response.body.token).toBeUndefined();
    });
    it('fails with invalid password', async () => {
      // NOTE dependant on signup working.
      // signup new user to retrieve a valid token
      await request(app)
        .post('/api/users/')
        .send({
          email: 'gris@test.com',
          name: 'fredags',
          password: 'Passw0rd!',
        })
        .expect(201);

      //login user with email and password
      const response = await request(app)
        .post('/api/auth')
        .send({
          email: 'gris@test.com',
          password: 'Pasw0rd!',
        })
        .expect(400);
      // Check you recieved error message
      expect(response.body.errors[0].msg).toEqual('Invalid Credentials');
      // no token should be provided
      expect(response.body.token).toBeUndefined();
    });
  });
  describe('POST api/auth/forgotpassword', () => {
    afterEach(() => jest.resetAllMocks());
    it('sentEmail called when correct email is provided', async () => {
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

      // NOTE: dependent on sendEmail, does not actually test the function sendEmail
      // prettier-ignore
      await request(app)
      .post('/api/auth/forgotpassword')
      .set('x-auth-token', response.body.token)
      .send({ email: 'gris@test.com' })
      .expect(200)

      expect(sendEmail).toBeCalledTimes(1);
    });
    it('sentEmail NOT called when invalid email is provided', async () => {
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

      // NOTE: dependent on sendEmail, does not actually test the function sendEmail
      // prettier-ignore
      await request(app)
      .post('/api/auth/forgotpassword')
      .set('x-auth-token', response.body.token)
      .send({ email: 'gristest.com' })
      .expect(400)

      expect(sendEmail).toBeCalledTimes(0);
    });
    it('sentEmail NOT called when no email field is provided', async () => {
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

      // NOTE: dependent on sendEmail, does not actually test the function sendEmail
      // prettier-ignore
      await request(app)
      .post('/api/auth/forgotpassword')
      .set('x-auth-token', response.body.token)
      .send({})
      .expect(400)

      expect(sendEmail).toBeCalledTimes(0);
    });
  });
  describe('PUT /api/auth/resetpassword/:resettoken', () => {});
  describe('PUT /api/auth/updatedetails', () => {});
  describe('PUT /api/auth/updatepassword', () => {});
});
