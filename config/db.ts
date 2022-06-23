import mongoose from "mongoose";

const connectDB = async (db: string) => {
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

export default connectDB;
