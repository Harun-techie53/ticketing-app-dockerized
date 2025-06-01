import mongoose, { mongo } from "mongoose";
import { app } from "./app";
import config from "./config";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT not defined yet");
  }

  if (!process.env.MONGO_USER) {
    throw new Error("MONGO_USER not defined yet");
  }

  if (!process.env.MONGO_PASSWORD) {
    throw new Error("MONGO_PASSWORD not defined yet");
  }

  const mongoUri = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.kcvr2uw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(
      mongoUri
    );
    console.log("Connected to database");
  } catch (error) {
    console.log("Database error", error);
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!!!!`);
  });
};

start();
