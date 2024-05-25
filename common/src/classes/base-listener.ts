import { Stan, Message } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

//& Adstract Class for Listener
export abstract class Listener<T extends Event> {
  abstract subject: T['subject']; // So SubClasses have to assgine a Channel Name
  abstract queueGroupname: string; // So SubClasses have to assgine a Queue Group Name
  abstract onMessage(data: T['data'], msg: Message): void;

  protected client: Stan;
  protected ackWait = 5 * 1000; // Which will be 5 seconds got ack timeframe.

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupname);
  }

  // Subcription Listener Function
  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupname,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message recevied: ${this.subject} / ${this.queueGroupname}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"));
  }
}
