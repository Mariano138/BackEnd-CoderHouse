import { messageModel } from "../models/message.model.js";

export default class MessageManager {
  constructor() {
    this.model = messageModel;
  }
  async addMessage(newMessage) {
    return await this.model.create(newMessage);
  }
  async allMessage() {
    return await this.model.find().lean();
  }
}