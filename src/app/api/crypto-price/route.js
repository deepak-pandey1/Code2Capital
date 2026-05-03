export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids");

    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
    );

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({}, { status: 500 });
  }
}