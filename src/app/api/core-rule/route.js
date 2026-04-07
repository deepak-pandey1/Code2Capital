import connectDB from "@/lib/mongodb";
import CoreRule from "@/models/CoreRule";

export async function GET() {
  try {
    await connectDB();
    const rule = await CoreRule.findOne().sort({ createdAt: -1 });
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
    const { text } = await request.json();

    const rule = await CoreRule.create({ text });
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
    const { text } = await request.json();

    const existing = await CoreRule.findOne().sort({ createdAt: -1 });

    if (!existing) {
      const rule = await CoreRule.create({ text });
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
    const { id } = await request.json();

    if (id) {
      await CoreRule.findByIdAndDelete(id);
    } else {
      const existing = await CoreRule.findOne().sort({ createdAt: -1 });
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