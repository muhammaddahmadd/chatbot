import { IMessage } from "../interfaces/IMessage";
import { Message } from "../entities/Message";

export class MessageRepository {
  async create(messageData: Omit<IMessage, "id">): Promise<Message> {
    // Implementation depends on your database choice
    // This is a mock implementation
    const message = new Message(
      this.generateId(),
      messageData.sessionId,
      messageData.userId,
      messageData.content,
      messageData.type,
      messageData.timestamp,
      messageData.metadata
    );

    // Save to database
    return message;
  }

  async findBySessionId(sessionId: string): Promise<Message[]> {
    // Fetch messages from database
    return [];
  }

  async findById(id: string): Promise<Message | null> {
    // Fetch message by ID
    return null;
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
