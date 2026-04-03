import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["text", "number", "select", "date"],
    },
    options: [{ type: String }],
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const JournalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    assetType: { type: String, required: true },
    customAsset: { type: String, default: "" },
    columns: { type: [ColumnSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Journal || mongoose.model("Journal", JournalSchema);