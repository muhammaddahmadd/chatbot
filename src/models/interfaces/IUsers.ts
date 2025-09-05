export interface IUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
