/* eslint-env node */
import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/db.js';

dotenv.config();

const runtimeProcess = globalThis.process;
const PORT = runtimeProcess?.env?.PORT || 5000;
const MONGO_URI = runtimeProcess?.env?.MONGO_URI || 'mongodb://127.0.0.1:27017/my-react-project';
const MONGO_DB_NAME = runtimeProcess?.env?.MONGO_DB_NAME || 'foss_project_app';

const startServer = async () => {
  try {
    await connectDatabase({
      mongoUri: MONGO_URI,
      dbName: MONGO_DB_NAME,
    });

    console.log(`MongoDB connected to database: ${MONGO_DB_NAME}`);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    runtimeProcess?.exit?.(1);
  }
};

startServer();
