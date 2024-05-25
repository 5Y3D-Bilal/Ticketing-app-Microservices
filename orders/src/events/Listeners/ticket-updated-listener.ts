import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketUpdatedEvent } from "@bilal567/common-code";
import { Ticket } from "../../models/ticket";
import { queueGroupname } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupname = queueGroupname;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEventVersion(data);

    if (!ticket) {
      throw new Error("Ticket Not Found");
    }

    const { title, price, version } = data;
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
