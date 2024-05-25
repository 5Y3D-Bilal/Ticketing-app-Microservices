export enum OrderStatus {
  //  When the order has benn  created, but the
  //  Ticket it is trying to order has not been reserved
  Created = "created",
  // The Ticket the order is trying to reserve has already
  //   been reserved , or when the has cancelled the order
  //   The order expires before payments 
  Cancelled = "cancelled",
  //The Order has successfly reserved the ticket
  AwaitingPayment = "awaiting:payment",
  //   The Order has reserved the ticket and the user has
  //  Provided payment successfly
  Complete = "complete",
}
