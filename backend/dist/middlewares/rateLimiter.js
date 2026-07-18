"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const ipRequests = new Map();
const rateLimiter = (req, res, next) => {
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
exports.rateLimiter = rateLimiter;
//# sourceMappingURL=rateLimiter.js.map