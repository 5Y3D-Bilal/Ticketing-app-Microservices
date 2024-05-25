import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const stan = nats.connect("ticketing", "adc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("hello world");

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: "123",
      title: "Boom concert",
      price: 23,
    });
  } catch (error) {
    console.log(error)
  }

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "conect",
  //   price: 23,
  // });

  // stan.publish("ticket:created", data, () => {
  //   console.log("A Ticket is been created :> lets gooooooo -> Event Published");
  // });
});
