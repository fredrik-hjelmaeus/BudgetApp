import { rest } from 'msw';

// mocking backend/context responses: happy paths

export const handlers = [
  // success on getting token
  rest.post('http://localhost/api/auth', (req, res, ctx) => {
    return res(
      ctx.json({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDcyZDE2Zjg5NWIxMTAwZGJhYjY2In0sImlhdCI6MTY0MzgxMDg2OX0.QvfZLV0HBznOEIMFOMAQNIsEpWjmEKtz6EqUNh9D--s',
      })
    );
  }),

  rest.get('http://localhost/api/auth', (req, res, ctx) => {
    return res(
      ctx.json({
        _id: '61ed72d16f895b1100dbab66',
        name: 'dirk',
        email: 'nisse@manpower.se',
        date: '2022-01-23T15:22:57.772Z',
        __v: 0,
      })
    );
  }),

  rest.get('http://localhost/api/userpreset', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.post('http://localhost/api/users', (req, res, ctx) => {
    return res(
      ctx.json({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDcyZDE2Zjg5NWIxMTAwZGJhYjY2In0sImlhdCI6MTY0MzgxMDg2OX0.QvfZLV0HBznOEIMFOMAQNIsEpWjmEKtz6EqUNh9D--s',
      })
    );
  }),
  rest.post('http://localhost/api/auth/forgotpassword', (req, res, ctx) => {
    return res(ctx.json({ success: true, data: 'Email sent' }));
  }),
];

//fail to get token:
/*   rest.post('http://localhost/api/auth', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        errors: [
          {
            msg: 'No token, authorization denied',
          },
        ],
      })
    );
  }), */
// success on getting current user

//fail to get user
/*   rest.get('http://localhost/api/auth', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        errors: [
          {
            msg: 'Invalid Credentials',
          },
        ],
      })
    );
  }), */
// success on getting user presets
