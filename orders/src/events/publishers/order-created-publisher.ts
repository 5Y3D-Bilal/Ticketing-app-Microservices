import { Publisher, OrderCreatedEvent, Subjects } from "@bilal567/common-code";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
