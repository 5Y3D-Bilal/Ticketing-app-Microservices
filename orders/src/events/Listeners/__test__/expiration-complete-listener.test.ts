import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompleteListener } from "../expiration-compelete-listener";
import { Order } from "../../../models/order";
import { Ticket } from "../../../models/ticket";
import mongoose from "mongoose";
import { OrderStatus, ExpirationComplete } from "@bilal567/common-code";
import { Message } from "node-nats-streaming";

const setup = async () => {
  // Listener
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  // Making an order and Ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "ewa",
    price: 234,
  });
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    userId: "ewaewaea",
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: ExpirationComplete["data"] = {
    orderId: order.id,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, order, ticket, msg };
};

it("updates to order status to cancelled", async () => {
  const { listener, data, msg, order, ticket } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emaits an OrderCancelled event", async () => {
  const { listener, data, msg, order, ticket } = await setup();
  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(eventData.id);
});

it("ack the message", async () => {
  const { listener, data, msg, order, ticket } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
