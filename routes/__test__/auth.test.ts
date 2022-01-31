import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose'; //used to validate mongo _id
import User, { IUser } from '../../models/User';

// prevents sendEmail from sending mail
jest.mock('../../utils/sendEmail');
import sendEmail from '../../utils/sendEmail';

describe('authorization flow', () => {
  // Get Current User
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

    it('does no get user data when not logged in and no token provided', async () => {
      const res = await request(app).get('/api/auth/').set('my_user-agent', 'react').expect(401);
      expect(res.body.msg).toEqual('No token, authorization denied'); // <-- auth middleware
    });

    it('does no get user data when invalid token is provided', async () => {
      const invalidToken =
        'cyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMmUwNDIyMzNiZjYzYjUwM2M0NGM3In0sImlhdCI6MTY0MjI1ODQ5OCwiZXhwIjoxNjQyMjYyMDk4fQ.bSwhOuHZ5vSjBtsHW6R92Mru5-0eRo0ShvtHb-H5O6o';

      // prettier-ignore
      const res = await request(app)
    .get('/api/auth/')
    .set('my_user-agent', 'react')
    .set('x-auth-token', invalidToken)
    .expect(401);
      expect(res.body.msg).toEqual('Token is not valid'); // <-- auth middleware
    });

    it('does no get user data with expired token', async () => {
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlMmM0YzE2ZTg3NGQ0ODQwZGJlZjZhIn0sImlhdCI6MTY0MjI1MTQ1NywiZXhwIjoxNjQyMjU1MDU3fQ.K6rAO-UBKow2saWSFVOMn1Q6ezDZcJdQKlOGzKz_Wc0';
      // prettier-ignore
      const res = await request(app)
        .get('/api/auth/')
        .set('my_user-agent', 'react')
        .set('x-auth-token', expiredToken)
        .expect(401);
      expect(res.body.msg).toEqual('Token is not valid'); // <-- auth middleware
    });
  });
  // Login
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
  // Forgot Password
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
  // Reset Password
  describe('PUT /api/auth/resetpassword/:resettoken', () => {
    it('happy path', async () => {
      // create user
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

      // create resetpasswordtoken
      const user: IUser | null = await User.findOne({ email: 'gris@test.com' });
      if (!user) throw Error('fail');
      const resetToken = user.getResetPasswordToken();
      // save token to db
      await user.save({ validateBeforeSave: false });
      // create resetUrl-endpoint using token
      const resetUrl = `/api/auth/resetpassword/${resetToken}`;

      // hit the endpoint resetpassword
      const res = await request(app).put(resetUrl).send({ password: 'whatever4' }).expect(200);
      expect(res.body.data).toEqual('Password Changed');
    });
    it('The password must be 6+ chars long and contain a number', async () => {
      // create user
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

      // create resetpasswordtoken
      const user: IUser | null = await User.findOne({ email: 'gris@test.com' });
      if (!user) throw Error('fail');
      const resetToken = user.getResetPasswordToken();
      // save token to db
      await user.save({ validateBeforeSave: false });
      // create resetUrl-endpoint using token
      const resetUrl = `/api/auth/resetpassword/${resetToken}`;

      // hit the endpoint resetpassword
      const res = await request(app).put(resetUrl).send({ password: 'short' }).expect(400);
      expect(res.body.errors[0].msg).toEqual('must be at least 6 chars long');
      expect(res.body.errors[1].msg).toEqual('The password must be 6+ chars long and contain a number');
    });
    it('The password must be 6+ chars long', async () => {
      // create user
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

      // create resetpasswordtoken
      const user: IUser | null = await User.findOne({ email: 'gris@test.com' });
      if (!user) throw Error('fail');
      const resetToken = user.getResetPasswordToken();
      // save token to db
      await user.save({ validateBeforeSave: false });
      // create resetUrl-endpoint using token
      const resetUrl = `/api/auth/resetpassword/${resetToken}`;

      // hit the endpoint resetpassword
      const res = await request(app).put(resetUrl).send({ password: 'closebutnocigar' }).expect(400);
      expect(res.body.errors[0].msg).toEqual('The password must be 6+ chars long and contain a number');
    });
    it('The password has a numeric but too short fails', async () => {
      // create user
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

      // create resetpasswordtoken
      const user: IUser | null = await User.findOne({ email: 'gris@test.com' });
      if (!user) throw Error('fail');
      const resetToken = user.getResetPasswordToken();
      // save token to db
      await user.save({ validateBeforeSave: false });
      // create resetUrl-endpoint using token
      const resetUrl = `/api/auth/resetpassword/${resetToken}`;

      // hit the endpoint resetpassword
      const res = await request(app).put(resetUrl).send({ password: '4444s' }).expect(400);
      expect(res.body.errors[0].msg).toEqual('must be at least 6 chars long');
    });
  });
  // Update User Details
  describe('PUT /api/auth/updatedetails', () => {
    it('happy path with valid name and email', async () => {
      // signup new user to retrieve a valid token
      // NOTE dependant on signup working.
      const response = await request(app)
        .post('/api/users/')
        .set('my_user-agent', 'react')
        .send({
          email: 'gris@test.com',
          name: 'fredags',
          password: 'Passw0rd!',
        })
        .expect(201);

      await request(app)
        .put('/api/auth/updatedetails')
        .set('x-auth-token', response.body.token)
        .send({
          name: 'fredags',
          email: 'gris@test.com',
        })
        .expect(200);
    });
    it('fails with empty object provided', async () => {
      // signup new user to retrieve a valid token
      // NOTE dependant on signup working.
      const response = await request(app)
        .post('/api/users/')
        .set('my_user-agent', 'react')
        .send({
          email: 'gris@test.com',
          name: 'fredags',
          password: 'Passw0rd!',
        })
        .expect(201);

      // prettier-ignore
      const res = await request(app)
      .put('/api/auth/updatedetails')
      .set('x-auth-token', response.body.token)
      .send({})
      .expect(400);
    });
    it('Do not update name if name field is not provided', async () => {
      // signup new user to retrieve a valid token
      // NOTE dependant on signup working.
      const response = await request(app)
        .post('/api/users/')
        .set('my_user-agent', 'react')
        .send({
          email: 'gris@test.com',
          name: 'fredags',
          password: 'Passw0rd!',
        })
        .expect(201);

      const res = await request(app)
        .put('/api/auth/updatedetails')
        .set('x-auth-token', response.body.token)
        .send({ email: 'fris@test.com' })
        .expect(200);

      expect(res.body.data.name).toBe('fredags');
      expect(res.body.data.email).toBe('fris@test.com');
    });
    it('fails with no email', async () => {
      // signup new user to retrieve a valid token
      // NOTE dependant on signup working.
      const response = await request(app)
        .post('/api/users/')
        .set('my_user-agent', 'react')
        .send({
          email: 'gris@test.com',
          name: 'fredags',
          password: 'Passw0rd!',
        })
        .expect(201);

      const res = await request(app)
        .put('/api/auth/updatedetails')
        .set('x-auth-token', response.body.token)
        .send({ name: 'fris@test.com' })
        .expect(400);
      expect(res.body.errors[0].msg).toEqual('Please include a valid email');
      // prettier-ignore
      const res2 = await request(app)
      .put('/api/auth/updatedetails')
      .set('x-auth-token', response.body.token)
      .send({}).expect(400);
      expect(res2.body.errors[0].msg).toEqual('Please include a valid email');
    });
    it('fails with invalid email', async () => {
      // signup new user to retrieve a valid token
      // NOTE dependant on signup working.
      const response = await request(app)
        .post('/api/users/')
        .set('my_user-agent', 'react')
        .send({
          email: 'gris@test.com',
          name: 'fredags',
          password: 'Passw0rd!',
        })
        .expect(201);

      const res = await request(app)
        .put('/api/auth/updatedetails')
        .set('x-auth-token', response.body.token)
        .send({ email: 'fristest.com' })
        .expect(400);
      expect(res.body.errors[0].msg).toEqual('Please include a valid email');
    });
    it('fails when already taken email', async () => {
      // signup new user
      // NOTE dependant on signup working.
      await request(app)
        .post('/api/users/')
        .set('my_user-agent', 'react')
        .send({
          email: 'theother@test.com',
          name: 'another',
          password: 'Passw0rd!',
        })
        .expect(201);
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

      // try to change email to theother from gris@test.com
      const res = await request(app)
        .put('/api/auth/updatedetails')
        .set('x-auth-token', response.body.token)
        .send({ email: 'theother@test.com' })
        .expect(401);
      expect(res.body.errors[0].msg).toEqual('This email is already in use');
    });
    it('fails on xss-attempt', async () => {
      // signup new user to retrieve a valid token
      // NOTE dependant on signup working.
      const response = await request(app)
        .post('/api/users/')
        .set('my_user-agent', 'react')
        .send({
          email: 'gris@test.com',
          name: 'fredags',
          password: 'Passw0rd!',
        })
        .expect(201);

      await request(app)
        .put('/api/auth/updatedetails')
        .set('x-auth-token', response.body.token)
        .send({
          name: 'fredags',
          email: 'gris@test.com',
        })
        .expect(200);

      const res = await request(app)
        .put('/api/auth/updatedetails')
        .set('x-auth-token', response.body.token)
        .send({
          name: 'fredags"<script>(alert "test")</script>',
          email: 'gris@test.com',
        })
        .expect(200);
      expect(res.body.data.name).toEqual('fredags"&lt;script>(alert "test")&lt;/script>');
    });
  });
  // Update Password
  describe('PUT /api/auth/updatepassword', () => {
    it('updated password', async () => {
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

      const res = await request(app)
        .put('/api/auth/updatepassword')
        .set('x-auth-token', response.body.token)
        .send({ currentPassword: 'Passw0rd!', password: 'wat24master' })
        .expect(200);
      expect(res.body.msg).toEqual('Password Updated');
    });
    it('invalid current password', async () => {
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

      // currentPassword valid length and with number but wrong
      const res = await request(app)
        .put('/api/auth/updatepassword')
        .set('x-auth-token', response.body.token)
        .send({ currentPassword: 'assw0rd!', password: 'wat24master' })
        .expect(401);
      expect(res.body.errors[0].msg).toEqual('Current Password is incorrect');

      // currentPassword invalid length and wrong
      const res2 = await request(app)
        .put('/api/auth/updatepassword')
        .set('x-auth-token', response.body.token)
        .send({ currentPassword: 'w0rd!', password: 'wat24master' })
        .expect(401);
      expect(res2.body.errors[0].msg).toEqual('Current Password is incorrect');

      // currentPassword invalid length ,no number and wrong
      const res3 = await request(app)
        .put('/api/auth/updatepassword')
        .set('x-auth-token', response.body.token)
        .send({ currentPassword: 'w', password: 'wat24master' })
        .expect(401);
      expect(res3.body.errors[0].msg).toEqual('Current Password is incorrect');
    });
    it('The new password fails with no number provided', async () => {
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

      const res = await request(app)
        .put('/api/auth/updatepassword')
        .set('x-auth-token', response.body.token)
        .send({ currentPassword: 'Passw0rd!', password: 'watman' })
        .expect(400);
      expect(res.body.errors[0].msg).toEqual('The password must be 6+ chars long and contain a number');
    });
    it('The new password fails when to short', async () => {
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

      const res = await request(app)
        .put('/api/auth/updatepassword')
        .set('x-auth-token', response.body.token)
        .send({ currentPassword: 'Passw0rd!', password: 'wat' })
        .expect(400);
      expect(res.body.errors[0].msg).toEqual('must be at least 6 chars long');
    });
    it('The new password has a numeric but too short, fails', async () => {
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

      const res = await request(app)
        .put('/api/auth/updatepassword')
        .set('x-auth-token', response.body.token)
        .send({ currentPassword: 'Passw0rd!', password: 'w2at' })
        .expect(400);
      expect(res.body.errors[0].msg).toEqual('must be at least 6 chars long');
    });
  });
});
