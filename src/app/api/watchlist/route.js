import connectDB from "@/lib/mongodb";
import Watchlist from "@/models/Watchlist";

// GET → load watchlist
export async function GET() {
  try {
    await connectDB();

    let watchlist = await Watchlist.findOne();

    if (!watchlist) {
      watchlist = await Watchlist.create({ items: [] });
    }

    return Response.json({ items: watchlist.items });
  } catch (error) {
    return Response.json(
      { message: "Failed to load watchlist" },
      { status: 500 }
    );
  }
}

// POST → add coin
export async function POST(request) {
  try {
    await connectDB();

    const { coinId, name, symbol, image, price, change24h } =
      await request.json();

    let watchlist = await Watchlist.findOne();

    if (!watchlist) {
      watchlist = await Watchlist.create({ items: [] });
    }

    // already added check
    const exists = watchlist.items.some((item) => item.coinId === coinId);
    if (exists) {
      return Response.json({ items: watchlist.items });
    }

    // max 5 limit
    if (watchlist.items.length >= 5) {
      return Response.json(
        { message: "Max 5 items allowed" },
        { status: 400 }
      );
    }

    watchlist.items.push({
      coinId,
      name,
      symbol,
      image,
    });

    await watchlist.save();

    return Response.json({ items: watchlist.items });
  } catch (error) {
    return Response.json(
      { message: "Failed to add item" },
      { status: 500 }
    );
  }
}

// DELETE → remove coin
export async function DELETE(request) {
  try {
    await connectDB();

    const { coinId } = await request.json();

    let watchlist = await Watchlist.findOne();
    if (!watchlist) return Response.json({ items: [] });

    watchlist.items = watchlist.items.filter(
      (item) => item.coinId !== coinId
    );

    await watchlist.save();

    return Response.json({ items: watchlist.items });
  } catch (error) {
    return Response.json(
      { message: "Failed to delete item" },
      { status: 500 }
    );
  }
}