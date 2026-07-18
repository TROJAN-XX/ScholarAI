import { Request, Response, NextFunction } from "express";

interface RequestRecord {
  count: number;
  resetTime: number;
}

const ipRequests = new Map<string, RequestRecord>();

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutes window
  const MAX_LIMIT = 50; // Max 50 requests per window per IP

  const record = ipRequests.get(ip);

  if (!record || now > record.resetTime) {
    ipRequests.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return next();
  }

  record.count++;
  if (record.count > MAX_LIMIT) {
    res.status(429).json({
      success: false,
      message: "Too many requests from this IP. Please try again after 15 minutes.",
    });
    return;
  }

  next();
};
