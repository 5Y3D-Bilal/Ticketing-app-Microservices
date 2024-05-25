import { Subjects, ExpirationComplete, Publisher } from "@bilal567/common-code";

export class ExpirationCompletePublisher extends Publisher<ExpirationComplete> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
