import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketCreatedEvent } from "@bilal567/common-code";
import { Ticket } from "../../models/ticket";
import { queueGroupname } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated; // Means this is a TicketCreated Event
  queueGroupname = queueGroupname;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
