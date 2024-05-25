"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    //  When the order has benn  created, but the
    //  Ticket it is trying to order has not been reserved
    OrderStatus["Created"] = "created";
    // The Ticket the order is trying to reserve has already
    //   been reserved , or when the has cancelled the order
    //   The order expires before payments 
    OrderStatus["Cancelled"] = "cancelled";
    //The Order has successfly reserved the ticket
    OrderStatus["AwaitingPayment"] = "awaiting:payment";
    //   The Order has reserved the ticket and the user has
    //  Provided payment successfly
    OrderStatus["Complete"] = "complete";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
