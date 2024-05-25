import { Subjects } from "../classes/subjects";

export interface ExpirationComplete {
  subject: Subjects.ExpirationComplete;
  data: {
    orderId: string;
  };
}
