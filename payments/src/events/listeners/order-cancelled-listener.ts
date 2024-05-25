import {
  OrderCancelledEvent,
  Subjects,
  Listener,
  OrderCreatedEvent,
  OrderStatus,
} from "@bilal567/common-code";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupname = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = await Order.findOne({
        _id: data.id,
        version: data.version - 1
    })

    if(!order){
        throw new Error("Order not found")
    }

    order.set({status: OrderStatus.Cancelled})
    await order.save()

    msg.ack()
  }
}
