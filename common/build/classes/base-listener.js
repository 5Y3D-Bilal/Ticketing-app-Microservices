"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
//& Adstract Class for Listener
class Listener {
    constructor(client) {
        this.ackWait = 5 * 1000; // Which will be 5 seconds got ack timeframe.
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
        const subscription = this.client.subscribe(this.subject, this.queueGroupname, this.subscriptionOptions());
        subscription.on("message", (msg) => {
            console.log(`Message recevied: ${this.subject} / ${this.queueGroupname}`);
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === "string"
            ? JSON.parse(data)
            : JSON.parse(data.toString("utf-8"));
    }
}
exports.Listener = Listener;
