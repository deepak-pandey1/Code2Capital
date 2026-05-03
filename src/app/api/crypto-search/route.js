export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return Response.json({ coins: [] });
    }

    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { message: "Search failed" },
      { status: 500 }
    );
  }
}