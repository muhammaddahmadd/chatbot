import { IMessage } from "../models/interfaces/IMessage";
import { MessageRepository } from "../models/repositories/MessageRepository";

export class ChatbotService {
  private messageRepository: MessageRepository;

  constructor() {
    this.messageRepository = new MessageRepository();
  }

  async processMessage(
    userId: string,
    sessionId: string,
    message: string
  ): Promise<{ userMessage: IMessage; botResponse: IMessage }> {
    // Save user message
    const userMessage = await this.messageRepository.create({
      sessionId,
      userId,
      content: message,
      type: "user",
      timestamp: new Date(),
    });

    // Generate bot response (implement your chatbot logic here)
    const botResponse = await this.generateBotResponse(message);

    // Save bot message
    const botMessage = await this.messageRepository.create({
      sessionId,
      userId: "bot",
      content: botResponse.content,
      type: "bot",
      timestamp: new Date(),
      metadata: botResponse.metadata,
    });

    return {
      userMessage,
      botResponse: botMessage,
    };
  }

  private async generateBotResponse(message: string): Promise<{
    content: string;
    metadata?: any;
  }> {
    // MVP: Simple mock responses for testing
    const responses = [
      "Hello! I'm your AI assistant. How can I help you today?",
      "That's an interesting question. Let me help you with that.",
      "I understand you're looking for assistance. What specific information do you need?",
      "Thanks for reaching out! I'm here to help with your queries.",
      "I'm processing your request. Could you provide more details?",
    ];

    // Simple keyword-based responses for MVP
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return {
        content: "Hello! Welcome to our support chat. How can I assist you today?",
        metadata: { intent: "greeting", confidence: 0.9 }
      };
    }
    
    if (lowerMessage.includes('help')) {
      return {
        content: "I'm here to help! You can ask me about our services, products, or any general questions. What would you like to know?",
        metadata: { intent: "help", confidence: 0.8 }
      };
    }
    
    if (lowerMessage.includes('thank')) {
      return {
        content: "You're welcome! Is there anything else I can help you with?",
        metadata: { intent: "gratitude", confidence: 0.9 }
      };
    }

    // Default response
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return {
      content: randomResponse,
      metadata: {
        intent: "general",
        confidence: 0.7,
      },
    };
  }
}
