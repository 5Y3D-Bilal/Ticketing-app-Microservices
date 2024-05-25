import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@bilal567/common-code";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
