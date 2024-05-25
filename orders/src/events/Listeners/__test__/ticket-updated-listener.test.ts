import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@bilal567/common-code";

const setup = async () => {
  // create a ticket
  const listener = new TicketCreatedListener(natsWrapper.client);

  // create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 23,
  });
  await ticket.save();

  // create a fake data object and increment the vserion number becase we are updating the ticket
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    title: "new title",
    price: 234,
    version: ticket.version + 1,
    userId: "123",
  };

  // create a  fale msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all this stuff
  return { listener, data, msg, ticket };
};

it("finds, update, and saves a ticket", async () => {
  const { data, msg, listener, ticket } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});
it("it acks the message", async () => {
  const { data, msg, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
it("dose not call the ack if the event version number is skipped", async () => {
  const { data, msg, listener, ticket } = await setup();
  data.version = 20; // Because the ticket has a version and now we assigned 20 to the version the events is now out of orders and the ack will not be called on.

  try {
    await listener.onMessage(data, msg);
  } catch (error) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
