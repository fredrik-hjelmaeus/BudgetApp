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
  rest.get('http://localhost/api/guide', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: '61ffc16219c0a7a8173c7f2d',
          user: '61ed72d16f895b1100dbab66',
          name: 'Guide preset',
          number: 123456789,
          month: 'September',
          year: 2021,
          category: 'Housing',
          type: 'overhead',
          piggybank: [
            {
              month: 'September',
              year: 2021,
              savedAmount: 0,
              _id: '61ffc16219c0a7a8173c7f2e',
            },
          ],
          date: '2022-02-06T12:38:58.720Z',
          __v: 0,
        },
      ])
    );
  }),
  rest.get('http://localhost/api/userpreset', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: '61ffc16219c0a7a8173c7f2d',
          user: '61ed72d16f895b1100dbab66',
          name: 'En inkomst',
          number: 666666,
          month: 'September',
          year: 2021,
          category: 'Housing',
          type: 'overhead',
          piggybank: [
            {
              month: 'September',
              year: 2021,
              savedAmount: 0,
              _id: '61ffc16219c0a7a8173c7f2e',
            },
          ],
          date: '2022-02-06T12:38:58.720Z',
          __v: 0,
        },
        {
          _id: '61ffc14719c0a7a8173c7f16',
          user: '61ed72d16f895b1100dbab66',
          name: 'saving',
          number: 456788,
          month: 'April',
          year: 2021,
          category: 'Salary',
          type: 'savings',
          piggybank: [
            {
              month: 'April',
              year: 2021,
              savedAmount: 0,
              _id: '61ffc14719c0a7a8173c7f17',
            },
          ],
          date: '2022-02-06T12:38:31.061Z',
          __v: 0,
        },
        {
          _id: '61fc0bdffdfe6258d87f5359',
          user: '61ed72d16f895b1100dbab66',
          name: '232',
          number: 323232,
          month: 'February',
          year: 2021,
          category: 'Food',
          type: 'overhead',
          piggybank: [
            {
              month: 'February',
              year: 2021,
              savedAmount: 0,
              _id: '61fc0bdffdfe6258d87f535a',
            },
          ],
          date: '2022-02-03T17:07:43.744Z',
          __v: 0,
        },
        {
          _id: '6203c32b8015507e05a926cd',
          user: '61ed72d16f895b1100dbab66',
          name: 'Resa',
          number: 55000,
          month: 'January',
          year: 2021,
          category: 'Travel',
          type: 'purchase',
          piggybank: [
            {
              month: 'January',
              year: 2021,
              savedAmount: 0,
              _id: '6203c32b8015507e05a926ce',
            },
          ],
          date: '2022-02-09T13:35:39.173Z',
          __v: 0,
        },
        {
          _id: '61edb2af5e11343d1268fa24',
          user: '61ed72d16f895b1100dbab66',
          name: '6776',
          number: 6767,
          month: 'February',
          year: 2022,
          category: 'Travel',
          type: 'overhead',
          piggybank: [
            {
              month: 'February',
              year: 2022,
              savedAmount: 0,
              _id: '61edb2af5e11343d1268fa25',
            },
          ],
          date: '2022-01-23T19:55:27.501Z',
          __v: 0,
        },
        {
          _id: '61ffc13019c0a7a8173c7f01',
          user: '61ed72d16f895b1100dbab66',
          name: 'En inkomst',
          number: 4455,
          month: 'June',
          year: 2021,
          category: 'Food',
          type: 'capital',
          piggybank: [
            {
              month: 'June',
              year: 2021,
              savedAmount: 0,
              _id: '61ffc13019c0a7a8173c7f02',
            },
          ],
          date: '2022-02-06T12:38:08.883Z',
          __v: 0,
        },
        {
          _id: '61edb19ec557568270d9349a',
          user: '61ed72d16f895b1100dbab66',
          name: 'sadas',
          number: 444,
          month: 'January',
          year: 2021,
          category: 'Car',
          type: 'overhead',
          piggybank: [
            {
              month: 'January',
              year: 2021,
              savedAmount: 0,
              _id: '61edb19ec557568270d9349b',
            },
          ],
          date: '2022-01-23T19:50:54.267Z',
          __v: 0,
        },
        {
          _id: '62039bb18015507e05a926a3',
          user: '61ed72d16f895b1100dbab66',
          name: 'dsfs',
          number: 355,
          month: 'January',
          year: 2021,
          category: 'Commute',
          type: 'overhead',
          piggybank: [
            {
              month: 'January',
              year: 2021,
              savedAmount: 0,
              _id: '62039bb18015507e05a926a4',
            },
          ],
          date: '2022-02-09T10:47:13.627Z',
          __v: 0,
        },
        {
          _id: '61edb2a15e11343d1268fa15',
          user: '61ed72d16f895b1100dbab66',
          name: 'gty',
          number: 77,
          month: 'April',
          year: 2021,
          category: 'Car',
          type: 'overhead',
          piggybank: [
            {
              month: 'April',
              year: 2021,
              savedAmount: 0,
              _id: '61edb2a15e11343d1268fa16',
            },
          ],
          date: '2022-01-23T19:55:13.813Z',
          __v: 0,
        },
        {
          _id: '61ed73196f895b1100dbab72',
          name: 'wew',
          number: 44,
          month: 'November',
          year: 2021,
          category: 'Commute',
          type: 'overhead',
          piggybank: [
            {
              _id: '61ed73196f895b1100dbab73',
              month: 'November',
              year: 2021,
              savedAmount: 0,
            },
          ],
          user: '61ed72d16f895b1100dbab66',
          date: '2022-01-23T15:24:09.301Z',
          __v: 0,
        },
        {
          _id: '61ed73256f895b1100dbab75',
          name: 'dsfds',
          number: -20,
          month: 'November',
          year: 2021,
          category: 'Commute',
          type: 'overhead',
          piggybank: [
            {
              _id: '61ed73256f895b1100dbab76',
              month: 'November',
              year: 2021,
              savedAmount: 0,
            },
          ],
          user: '61ed72d16f895b1100dbab66',
          date: '2022-01-23T15:24:21.152Z',
          __v: 0,
        },
        {
          _id: '61edb1a5c557568270d9349d',
          user: '61ed72d16f895b1100dbab66',
          name: 'sfdc',
          number: -255,
          month: 'January',
          year: 2021,
          category: 'Travel',
          type: 'overhead',
          piggybank: [
            {
              month: 'January',
              year: 2021,
              savedAmount: 0,
              _id: '61edb1a5c557568270d9349e',
            },
          ],
          date: '2022-01-23T19:51:01.383Z',
          __v: 0,
        },
      ])
    );
  }),
  rest.post('http://localhost/api/userpreset', (req, res, ctx) => {
    return res(
      ctx.json({
        _id: '6203e22b2bdb63c78b35b672',
        user: '6203e2152bdb63c78b35b670',
        name: 'testtest',
        number: 1000,
        month: 'January',
        year: 2021,
        category: 'Travel',
        type: 'overhead',
        piggybank: [
          {
            month: 'January',
            year: 2021,
            savedAmount: 0,
            _id: '61edb1a5c557568270d9349e',
          },
        ],
        date: '2022-02-09T15:47:55.671Z',
        __v: 0,
      })
    );
  }),
  rest.delete(`http://localhost/api/userpreset/61edb19ec557568270d9349a`, (req, res, ctx) => {
    return res(
      ctx.json({
        msg: 'Preset removed',
      })
    );
  }),
  rest.post('http://localhost/api/userpreset/upload', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          row: {
            Year: '1997',
            Make: 'Ford',
            Model: 'E350',
            Month: 'feb',
            Day: '12',
            Saldo: '556',
            Color: 'green',
            Speed: 'fast',
            Title: 'Test',
            last: 'yes',
            first: 'no',
          },
          id: 'e9657b67-5316-4ea6-9b12-c853d9e8f5dd',
        },
        {
          row: {
            Year: '2000',
            Make: 'Mercury',
            Model: 'Cougar',
            Month: 'REALLY LONG MONTH NAME JANUARY',
            Day: '5',
            Saldo: '777',
            Color: 'blue',
            Speed: 'slow',
            Title: 'two',
            last: 'no',
            first: 'yes',
          },
          id: '91e7c4cc-16b4-4600-ae42-b029448764b7',
        },
      ])
    );
  }),
  rest.put(`http://localhost/api/userpreset/:_id`, (req, res, ctx) => {
    const { _id } = req.console.log(_id);
    return res(ctx.json({}));
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
