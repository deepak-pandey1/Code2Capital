import connectDB from "@/lib/mongodb";
import Entry from "@/models/JournalEntry";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const entry = await Entry.create(body);
    return Response.json(entry, { status: 201 });
  } catch (error) {
    console.error("POST /api/entry error:", error);
    return Response.json({ error: "Failed to create entry" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const journalId = searchParams.get("journalId");

    if (!journalId) {
      return Response.json({ error: "journalId is required" }, { status: 400 });
    }

    const entries = await Entry.find({ journalId });
    return Response.json(entries);
  } catch (error) {
    console.error("GET /api/entry error:", error);
    return Response.json({ error: "Failed to fetch entries" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { entryId, data } = body;

    if (!entryId) {
      return Response.json({ error: "entryId is required" }, { status: 400 });
    }

    const updated = await Entry.findByIdAndUpdate(
      entryId,
      { data },
      { new: true }
    );

    return Response.json(updated);
  } catch (error) {
    console.error("PUT /api/entry error:", error);
    return Response.json({ error: "Failed to update entry" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const entryId = searchParams.get("entryId");

    if (!entryId) {
      return Response.json({ error: "entryId is required" }, { status: 400 });
    }

    await Entry.findByIdAndDelete(entryId);
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/entry error:", error);
    return Response.json({ error: "Failed to delete entry" }, { status: 500 });
  }
}