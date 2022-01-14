//const MongoMemoryServer = require('mongodb-memory-server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../app');

let mongo;
// Setup hook for memory server
beforeAll(async () => {
  //<-- beforeAll is jest
  //mongo = await MongoMemoryServer.create();
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  console.log(mongoUri);
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  /*   await connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); */
});

// Reset collections/data before testing
beforeEach(async () => {
  //<-- beforeEach is jest
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// After testing is complete, stop the mongo memory server and tell mongoose to disconnect.
afterAll(async () => {
  //<-- afterAll is jest
  await mongo.stop();
  await mongoose.connection.close();
});

//module.exports = mongo;
