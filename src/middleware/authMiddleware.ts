import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Access token required" });
      return;
    }

    const user = await authService.verifyToken(token);
    if (!user) {
      res.status(403).json({ error: "Invalid or expired token" });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
};
