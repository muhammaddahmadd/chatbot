import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", error);

  // Default error response
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: error.code || "INTERNAL_ERROR",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    },
  });
};

