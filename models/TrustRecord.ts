import mongoose from "mongoose";

const TrustRecordSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },

    trust_score: {
      type: Number,
      required: true,
    },

    kyc_status: {
      type: Boolean,
      default: false,
    },

    ai_decision: {
      type: String,
      default: "pending",
    },

    blockchain_hash: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TrustRecord ||
  mongoose.model("TrustRecord", TrustRecordSchema);