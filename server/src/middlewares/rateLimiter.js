// src/middlewares/rateLimiter.js
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
  points: 6,        // 6 requests
  duration: 10      // per 10 seconds
});

export default function rateLimiter(req, res, next) {
  
  // 🔥 Skip limiter completely if env says so
  if (process.env.DISABLE_RATE_LIMIT === "true") {
    console.log("[RateLimiter] DISABLED via .env — skipping check");
    return next();
  }

  console.log("[RateLimiter] Checking:", req.ip);

  limiter
    .consume(req.ip)
    .then(() => {
      console.log("[RateLimiter] Allowed:", req.ip);
      next();
    })
    .catch((err) => {
      console.log("[RateLimiter] BLOCKED:", req.ip, "msBeforeNext:", err.msBeforeNext);
      res.status(429).json({ message: "Too many requests" });
    });
}
