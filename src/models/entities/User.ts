import { IUser } from "../interfaces/IUsers";

export class User implements IUser {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public avatar?: string
  ) {}

  static fromJSON(data: any): User {
    return new User(
      data.id,
      data.email,
      data.name,
      data.isActive,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.avatar
    );
  }

  toJSON(): Partial<IUser> {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
