import { Publisher, Subjects, TicketUpdatedEvent } from "@bilal567/common-code";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
