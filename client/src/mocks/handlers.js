import { rest } from 'msw';

// mocking backend/context responses: happy paths

export const handlers = [
  /*   rest.post('http://localhost/api/auth', (req, res, ctx) => {
    return res(
      ctx.json({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDcyZDE2Zjg5NWIxMTAwZGJhYjY2In0sImlhdCI6MTY0MzgxMDg2OX0.QvfZLV0HBznOEIMFOMAQNIsEpWjmEKtz6EqUNh9D--s',
      })
    );
  }), */
  //fail to get token:
  rest.post('http://localhost/api/auth', (req, res, ctx) => {
    return res(
      ctx.json({
        msg: 'No token, authorization denied',
      })
    );
  }),
  /*   rest.get('http://localhost/api/auth', (req, res, ctx) => {
    return res(
      ctx.json({
        _id: '61ed72d16f895b1100dbab66',
        name: 'dirk',
        email: 'nisse@manpower.se',
        date: '2022-01-23T15:22:57.772Z',
        __v: 0,
      })
    );
  }), */

  //fail to get user
  rest.get('http://localhost/api/auth', (req, res, ctx) => {
    return res(
      ctx.json({
        errors: [
          {
            msg: 'Invalid Credentials',
          },
        ],
      })
    );
  }),
  rest.get('http://localhost/api/userpreset', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
];
