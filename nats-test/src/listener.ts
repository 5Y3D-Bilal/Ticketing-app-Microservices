import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connect to nats");

  stan.on("close", () => {
    console.log("NATS connection lost");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close()); // If we press Ctrl + C our Channel will restart
process.on("SIGTERM", () => stan.close()); // if we kill the process our Channel will restart
