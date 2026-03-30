// server/src/models/Session.js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // We store a hashed version of the refresh token (sha256). Storing a hash
  // prevents raw tokens leaking if DB is compromised.
  tokenHash: { type: String, required: true, index: true },

  // Top 4 movies for the user - captured at session creation and immutable
  topMovies: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      title: String,
      posterUrl: String,
      rating: Number,
      description: String
    }
  ],
   

  // Optional metadata for later UI (showing active sessions) or audit
  deviceName: { type: String, default: null },
  ip: { type: String, default: null },
  userAgent: { type: String, default: null },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },

  // Soft-revoke flag (allows logout / session invalidation)
  revoked: { type: Boolean, default: false },
  revokedAt: { type: Date, default: null }
});

// Index to quickly find session by tokenHash and to support expiry cleanups
sessionSchema.index({ tokenHash: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // optional: TTL index

export default mongoose.model("Session", sessionSchema);
