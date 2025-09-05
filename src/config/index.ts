export const config = {
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || 'user-management-secret-key',
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3006",
};

// Log configuration on startup
console.log('🔧 Chatbot Configuration:');
console.log(`   Port: ${config.port}`);
console.log(`   Environment: ${config.nodeEnv}`);
console.log(`   CORS Origin: ${config.corsOrigin}`);
console.log(`   JWT Secret: ${config.jwtSecret ? '***configured***' : 'NOT SET'}`);
