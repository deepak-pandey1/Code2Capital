import mongoose from "mongoose";

const CoreRuleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CoreRule ||
  mongoose.model("CoreRule", CoreRuleSchema);