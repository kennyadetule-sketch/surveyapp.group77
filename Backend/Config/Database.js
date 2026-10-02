const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    const mongoDbName =
      process.env.MONGO_DB_NAME || process.env.MONGODB_NAME || "SurveyHub";

    if (!mongoUri) {
      console.error(
        "MongoDB URI is missing. Set MONGO_URI or MONGODB_URI in the .env file."
      );
      return false;
    }

    const conn = await mongoose.connect(mongoUri, {
      dbName: mongoDbName,
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`
    );

    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return false;
  }
};

module.exports = connectDB;