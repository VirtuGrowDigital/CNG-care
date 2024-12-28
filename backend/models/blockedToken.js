import mongoose from "mongoose";

const blockedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: "24h" },
  },
});

const BlockedToken = mongoose.model("BlockedToken", blockedTokenSchema);
export default BlockedToken;
