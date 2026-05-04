import connectDB from "@/lib/mongodb";
import CoreRule from "@/models/CoreRule";
import { verifyToken } from "@/lib/firebaseAdmin";

async function getUserIdFromRequest(request) {
  const decoded = await verifyToken(request);
  return decoded.uid;
}

export async function GET(request) {
  try {
    await connectDB();

    const userId = await getUserIdFromRequest(request);
    const rule = await CoreRule.findOne({ userId }).sort({ createdAt: -1 });

    return Response.json({ rule });
  } catch (error) {
    console.error("GET core-rule error:", error);
    return Response.json(
      { message: "Unauthorized or failed to fetch core rule" },
      { status: 401 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const userId = await getUserIdFromRequest(request);
    const { text } = await request.json();

    if (!text || !text.trim()) {
      return Response.json({ message: "text is required" }, { status: 400 });
    }

    const rule = await CoreRule.findOneAndUpdate(
      { userId },
      { $set: { text: text.trim(), userId } },
      { new: true, upsert: true, runValidators: true }
    );

    return Response.json({ rule }, { status: 201 });
  } catch (error) {
    console.error("POST core-rule error:", error);
    return Response.json(
      { message: "Failed to save core rule" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const userId = await getUserIdFromRequest(request);
    const { text } = await request.json();

    if (!text || !text.trim()) {
      return Response.json({ message: "text is required" }, { status: 400 });
    }

    const rule = await CoreRule.findOneAndUpdate(
      { userId },
      { $set: { text: text.trim(), userId } },
      { new: true, upsert: true, runValidators: true }
    );

    return Response.json({ rule });
  } catch (error) {
    console.error("PUT core-rule error:", error);
    return Response.json(
      { message: "Failed to update core rule" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const userId = await getUserIdFromRequest(request);
    const { id } = await request.json();

    if (id) {
      await CoreRule.findOneAndDelete({ _id: id, userId });
    } else {
      const existing = await CoreRule.findOne({ userId }).sort({ createdAt: -1 });
      if (existing) {
        await CoreRule.findByIdAndDelete(existing._id);
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE core-rule error:", error);
    return Response.json(
      { message: "Failed to delete core rule" },
      { status: 500 }
    );
  }
}