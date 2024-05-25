import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/Listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/Listeners/ticket-updated-listener";
import { ExpirationCompleteListener } from "./events/Listeners/expiration-compelete-listener";

import { app } from "./app";
import { PaymentCreatedListener } from "./events/Listeners/payment-created-listener";

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.NATS_URL) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection lost");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close()); // If we press Ctrl + C our Channel will restart
    process.on("SIGTERM", () => natsWrapper.client.close()); // if we kill the process our Channel will restart

    // Wiring up the listeners
    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
