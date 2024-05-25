import {
  ExpirationComplete,
  Listener,
  Subjects,
  OrderStatus,
} from "@bilal567/common-code";
import { Message } from "node-nats-streaming";
import { queueGroupname } from "./queue-group-name";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationComplete> {
  readonly subject = Subjects.ExpirationComplete;
  queueGroupname = queueGroupname;

  async onMessage(data: ExpirationComplete["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket')

    if (!order) {
      throw new Error("Order not find");
    }

    if(order.status === OrderStatus.Complete){
      return msg.ack()
    }

    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save()

    new OrderCancelledPublisher(this.client).publish({
        id: order.id,
        version: order.version,
        ticket:{
            id: order.ticket.id
        }
    })

    msg.ack()
  }
}
