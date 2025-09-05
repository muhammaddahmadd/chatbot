import jwt from "jsonwebtoken";
import { IUser } from "../models/interfaces/IUsers";
import { config } from "../config";

export class AuthService {
  private jwtSecret: string;

  constructor() {
    // Use the same JWT secret as NestJS backend
    this.jwtSecret = config.jwtSecret;
  }

  async verifyToken(token: string): Promise<IUser | null> {
    try {
      // Verify JWT token using the same secret as NestJS
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      
      // Return user info from JWT payload (NestJS includes id, role, email)
      return {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name || (decoded.email ? decoded.email.split('@')[0] : 'User'), // Fallback to email prefix
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('JWT verification failed:', error);
      return null;
    }
  }
}
