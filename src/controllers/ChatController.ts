import { Request, Response } from "express";
import { ChatbotService } from "../services/chatbotService";
import { ChatPresenter } from "../presenters/ChatPresenter";
import { MessageRepository } from "../models/repositories/MessageRepository";

export class ChatController {
  private chatbotService: ChatbotService;
  private messageRepository: MessageRepository;

  constructor() {
    this.chatbotService = new ChatbotService();
    this.messageRepository = new MessageRepository();
  }

  createSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      
      // Generate a unique session ID
      const sessionId = `session_${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      res.json({
        success: true,
        data: {
          sessionId,
          userId,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      res
        .status(500)
        .json(ChatPresenter.formatError("Failed to create chat session"));
    }
  };

  sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { message, sessionId } = req.body;
      const userId = (req as any).user.id;

      if (!message || !sessionId) {
        res
          .status(400)
          .json(
            ChatPresenter.formatError("Message and sessionId are required")
          );
        return;
      }

      const result = await this.chatbotService.processMessage(
        userId,
        sessionId,
        message
      );

      res.json(
        ChatPresenter.formatChatResponse(result.userMessage, result.botResponse)
      );
    } catch (error) {
      res
        .status(500)
        .json(ChatPresenter.formatError("Failed to process message"));
    }
  };

  getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const messages = await this.messageRepository.findBySessionId(sessionId);

      res.json({
        success: true,
        data: ChatPresenter.formatMessages(messages),
      });
    } catch (error) {
      res
        .status(500)
        .json(ChatPresenter.formatError("Failed to fetch messages"));
    }
  };
}
