import connectDB from "@/lib/mongodb";
import Journal from "@/models/Journal";
import { defaultColumns } from "@/utils/defaultColumns";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { columns, ...rest } = body;

    const journal = await Journal.create({
  userId: "guest", // temporary fix
  ...rest,
  columns: defaultColumns,
});

    return Response.json(journal, { status: 201 });
  } catch (error) {
    console.error("POST /api/journal error:", error);
    return Response.json(
      { error: "Failed to create journal" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const journals = await Journal.find();
    return Response.json(journals);
  } catch (error) {
    console.error("GET /api/journal error:", error);
    return Response.json({ error: "Failed to fetch journals" }, { status: 500 });
  }
}