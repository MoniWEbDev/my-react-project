import mongoose from 'mongoose';

export const connectDatabase = async ({ mongoUri, dbName }) => {
  await mongoose.connect(mongoUri, { dbName });
  return mongoose.connection;
};
