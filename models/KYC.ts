import mongoose from "mongoose";

const KYCSchema = new mongoose.Schema(
  {
    fullName: String,
    nin: String,
    email: String,
    phone: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.KYC ||
  mongoose.model("KYC", KYCSchema);