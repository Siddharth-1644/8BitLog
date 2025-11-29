// src/config/db.js
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;
    // DEBUG: show which URI we will attempt to connect to (before connecting)
    console.log("Attempting mongoose.connect to:", uri);
    await mongoose.connect(uri, { dbName: "8bitlog" });

    console.log("MongoDB connected");
    console.log("Connected to host:", mongoose.connection.host);
    console.log("Connected to DB name:", mongoose.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
