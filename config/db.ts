import mongoose from 'mongoose';
import config from 'config';
const db: string = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('MongoDB Connected...');
  } catch (err: unknown) {
    console.log('no connection to mongodb could be established');
    if (err instanceof Error) console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
