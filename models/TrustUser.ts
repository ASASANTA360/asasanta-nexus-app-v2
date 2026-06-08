import mongoose from "mongoose";

const TrustUserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,

    ninVerified: {
      type: Boolean,
      default: false,
    },

    bvnVerified: {
      type: Boolean,
      default: false,
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    walletAgeDays: {
      type: Number,
      default: 0,
    },

    transactions: {
      type: Number,
      default: 0,
    },

    trustScore: {
      type: Number,
      default: 0,
    },

    aiDecision: {
      type: String,
      default: "Unknown",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TrustUser ||
  mongoose.model("TrustUser", TrustUserSchema);