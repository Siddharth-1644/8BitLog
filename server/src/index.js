// src/index.js (HEADER — replace the top of the file up through imports)
import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make a robust .env path (use process.cwd() so nodemon/start context doesn't matter)
const envPath = path.resolve(process.cwd(), ".env");

// DEBUG: show where we expect .env to be and whether it exists
console.log("Looking for .env at:", envPath);
console.log(".env exists?:", fs.existsSync(envPath));

// Load dotenv from that explicit path and log results
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.log("dotenv config error:", result.error.message || result.error);
} else {
  // result.parsed contains parsed keys (or empty)
  console.log("dotenv parsed keys count:", result.parsed ? Object.keys(result.parsed).length : 0);
}

// ALSO print the value Node sees for MONGO_URI (may be undefined)
console.log("process.env.MONGO_URI (preview):", process.env.MONGO_URI ? process.env.MONGO_URI.slice(0, 80) + "..." : process.env.MONGO_URI);

// --- then your normal imports that depend on env ---
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import errorHandler from "./middlewares/errorHandler.js";



const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


app.use((req, res, next) => {
  console.log(`\n[INCOMING] ${req.method} ${req.originalUrl} from ${req.ip}`);
  console.log("  Headers:", {
    origin: req.headers.origin,
    host: req.headers.host,
    authorization: !!req.headers.authorization,
    "content-type": req.headers["content-type"]
  });
  next();
});

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Apply rate limiter (will auto-disable if DISABLE_RATE_LIMIT=true)
app.use("/api/auth", rateLimiter);

// Routes
app.use("/api/auth", authRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
