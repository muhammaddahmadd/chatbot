export interface IMessage {
  id: string;
  sessionId: string;
  userId: string;
  content: string;
  type: "user" | "bot";
  timestamp: Date;
  metadata?: {
    intent?: string;
    confidence?: number;
    entities?: any[];
  };
}
