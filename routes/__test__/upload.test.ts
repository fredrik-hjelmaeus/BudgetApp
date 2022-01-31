import request from 'supertest';
import app from '../../app';
import path from 'path';

describe('file upload', () => {
  it('Successfull upload', async () => {
    // Relies on Signup to get token
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' })
      .expect(201);

    // send the formdata
    const res = await request(app)
      .post('/api/userpreset/upload')
      .set('x-auth-token', response.body.token)
      .set('Content-Type', 'multipart/form-data')
      .attach('handelsbanken', path.resolve(__dirname, '../../_data/csv_testfiles/handelsbanken.csv'))
      .expect(200);
    // check that some data from the converted file exist
    expect(res.body[0].number).toEqual('-188752.33');
  });
  it('fails upload when not logged in', async () => {
    // send the formdata
    const res = await request(app)
      .post('/api/userpreset/upload')
      .set('Content-Type', 'multipart/form-data')
      .attach('handelsbanken', path.resolve(__dirname, '../../_data/csv_testfiles/handelsbanken.csv'))
      .expect(401);

    expect(res.body.msg).toEqual('No token, authorization denied');
  });
});
