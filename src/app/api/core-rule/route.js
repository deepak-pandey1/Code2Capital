import connectDB from "@/lib/mongodb";
import CoreRule from "@/models/CoreRule";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json({ message: "userId is required" }, { status: 400 });
    }

    const rule = await CoreRule.findOne({ userId }).sort({ createdAt: -1 });

    return Response.json({ rule });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch core rule" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { text, userId } = await request.json();

    if (!userId) {
      return Response.json({ message: "userId is required" }, { status: 400 });
    }

    const rule = await CoreRule.create({ text, userId });

    return Response.json({ rule }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Failed to create core rule" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const { text, userId } = await request.json();

    if (!userId) {
      return Response.json({ message: "userId is required" }, { status: 400 });
    }

    const existing = await CoreRule.findOne({ userId }).sort({ createdAt: -1 });

    if (!existing) {
      const rule = await CoreRule.create({ text, userId });
      return Response.json({ rule }, { status: 201 });
    }

    existing.text = text;
    await existing.save();

    return Response.json({ rule: existing });
  } catch (error) {
    return Response.json(
      { message: "Failed to update core rule" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { id, userId } = await request.json();

    if (!userId) {
      return Response.json({ message: "userId is required" }, { status: 400 });
    }

    if (id) {
      await CoreRule.findOneAndDelete({ _id: id, userId });
    } else {
      const existing = await CoreRule.findOne({ userId }).sort({ createdAt: -1 });
      if (existing) await CoreRule.findByIdAndDelete(existing._id);
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { message: "Failed to delete core rule" },
      { status: 500 }
    );
  }
}