import { Listener, OrderCreatedEvent, Subjects } from "@bilal567/common-code";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupname = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.id);

    // If no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    // Mark the as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    // save that ticket
    await ticket.save();

    // Publishing the event and telling all other services that the order is resreved now!
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      version: ticket.version,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    //  ack the message
    msg.ack();
  }
}
