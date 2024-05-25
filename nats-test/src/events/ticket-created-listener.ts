import { Listener } from "./base_Abstract-Class-listener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated; //This means Subject shloud be = TicketCreated
  queueGroupname = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event Data", data);

    console.log(data.id);

    msg.ack(); // Successfly parsed
  }
}
