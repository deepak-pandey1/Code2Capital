import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema(
  {
    journalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Journal",
    },
    data: Object, // dynamic fields
  },
  { timestamps: true }
);

export default mongoose.models.JournalEntry ||
  mongoose.model("JournalEntry", EntrySchema);