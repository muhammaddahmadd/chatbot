import { IMessage } from "../interfaces/IMessage";

export class Message implements IMessage {
  constructor(
    public id: string,
    public sessionId: string,
    public userId: string,
    public content: string,
    public type: "user" | "bot",
    public timestamp: Date,
    public metadata?: {
      intent?: string;
      confidence?: number;
      entities?: any[];
    }
  ) {}

  static fromJSON(data: any): Message {
    return new Message(
      data.id,
      data.sessionId,
      data.userId,
      data.content,
      data.type,
      new Date(data.timestamp),
      data.metadata
    );
  }

  toJSON(): Partial<IMessage> {
    return {
      id: this.id,
      sessionId: this.sessionId,
      userId: this.userId,
      content: this.content,
      type: this.type,
      timestamp: this.timestamp,
      metadata: this.metadata,
    };
  }
}

