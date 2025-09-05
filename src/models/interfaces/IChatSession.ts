export interface IChatSession {
  id: string;
  userId: string;
  title: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt?: Date;
}
