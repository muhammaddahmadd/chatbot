import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import chatRoutes from "./routes/chatRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { config } from "./config";

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    service: "chatbot",
    version: "1.0.0"
  });
});

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🤖 Chatbot service running on port ${config.port}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 CORS Origin: ${config.corsOrigin}`);
});

export default app;
