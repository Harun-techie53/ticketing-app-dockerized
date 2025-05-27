import mongoose from "mongoose";
import { app } from "./app";
import { natsClient } from "./nats-client";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
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

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS Cluster ID not defined yet");
  }

  if (!process.env.NATS_CLIENT_URL) {
    throw new Error("NATS Client URL not defined yet");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS Client ID not defined yet");
  }

  try {
    await natsClient.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_CLIENT_URL
    );
    natsClient.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsClient.client.close());
    process.on("SIGTERM", () => natsClient.client.close());

    new OrderCreatedListener(natsClient.client).listen();
    new OrderCancelledListener(natsClient.client).listen();
    await mongoose.connect(
      `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}?authSource=admin`
    );
    console.log("Connected to database");
  } catch (error) {
    console.log("Database error", error);
    process.exit(1);
  }

  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!!!!`);
  });
};

start();
