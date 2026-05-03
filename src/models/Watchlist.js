import mongoose from "mongoose";

const WatchlistItemSchema = new mongoose.Schema(
  {
    coinId: String,
    name: String,
    symbol: String,
    image: String,
    price: Number,
    change24h: Number,
  },
  { _id: false }
);

const WatchlistSchema = new mongoose.Schema(
  {
    items: [WatchlistItemSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Watchlist ||
  mongoose.model("Watchlist", WatchlistSchema);