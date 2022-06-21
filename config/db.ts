import mongoose from "mongoose";
//import config from 'config';
const db: string | undefined = process.env.mongoURI; //config.get('mongoURI');

const connectDB = async () => {
  if (db) {
    try {
      await mongoose.connect(db);

      console.log("MongoDB Connected...");
    } catch (err: unknown) {
      console.log("no connection to mongodb could be established");
      if (err instanceof Error) console.error(err.message);
      process.exit(1);
    }
  } else {
    console.log("no connection string to mongodb could be found,exiting..");
    process.exit(1);
  }
};

module.exports = connectDB;
