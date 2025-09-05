import { IMessage } from "../models/interfaces/IMessage";

export class ChatPresenter {
  static formatMessage(message: IMessage) {
    return {
      id: message.id,
      content: message.content,
      type: message.type,
      timestamp: message.timestamp.toISOString(),
      metadata: message.metadata,
    };
  }

  static formatMessages(messages: IMessage[]) {
    return messages.map((message) => this.formatMessage(message));
  }

  static formatChatResponse(userMessage: IMessage, botMessage: IMessage) {
    return {
      success: true,
      data: {
        userMessage: this.formatMessage(userMessage),
        botResponse: this.formatMessage(botMessage),
      },
    };
  }

  static formatError(message: string, code?: string) {
    return {
      success: false,
      error: {
        message,
        code: code || "CHAT_ERROR",
      },
    };
  }
}
