import { Publisher, Subjects, TicketCreatedEvent } from "@bilal567/common-code";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
