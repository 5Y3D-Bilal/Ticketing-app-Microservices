import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@bilal567/common-code";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
