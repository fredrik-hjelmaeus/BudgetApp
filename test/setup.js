const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

jest.setTimeout(30000); // 30 seconds to finish tests

let mongoTestServer;
// Setup hook for memory server
beforeAll(async () => {
  mongoTestServer = await MongoMemoryServer.create();
  const mongoUri = mongoTestServer.getUri();

  await mongoose.connect(mongoUri, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    //  useFindAndModify: false,
    useUnifiedTopology: true,
  });
});

// Reset collections/data before testing
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// After testing is complete, stop the mongo memory server and tell mongoose to disconnect.
afterAll(async () => {
  await mongoTestServer.stop();
  await mongoose.connection.close();
});
