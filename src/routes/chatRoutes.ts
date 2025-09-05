import { Router } from "express";
import { ChatController } from "../controllers/ChatController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const chatController = new ChatController();

// Apply authentication middleware to all chat routes
router.use(authenticateToken);

// Chat routes
router.post("/session", chatController.createSession);
router.post("/message", chatController.sendMessage);
router.get("/messages/:sessionId", chatController.getMessages);

export default router;
