import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
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

    // Setting the Listener for orderCreated Event
    new OrderCreatedListener(natsWrapper.client).listen()
  } catch (err) {
    console.error(err);
  }
};

start();
