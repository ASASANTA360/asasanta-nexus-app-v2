import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema(
  {
    businessName: String,
    amount: Number,
    purpose: String,
    duration: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Loan ||
  mongoose.model("Loan", LoanSchema);