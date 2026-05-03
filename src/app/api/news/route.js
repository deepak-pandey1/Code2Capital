export const revalidate = 600;

function decodeHtml(str = "") {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function stripHtml(str = "") {
  return str.replace(/<[^>]*>/g, "");
}

function getTagValue(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? match[1].trim() : "";
}

function parseDateSafe(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function parseRssItems(xml) {
  const items = [];
  const matches = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

  for (const item of matches) {
    const title = decodeHtml(stripHtml(getTagValue(item, "title")));
    const link = getTagValue(item, "link");
    const pubDate = parseDateSafe(getTagValue(item, "pubDate"));

    const sourceMatch = item.match(/<source[^>]*>([\s\S]*?)<\/source>/i);
    const source = decodeHtml(
      stripHtml(sourceMatch ? sourceMatch[1] : "Google News")
    );

    if (!title || !link) continue;

    items.push({
      title,
      link,
      source,
      publishedAt: pubDate || new Date().toISOString(),
    });
  }

  return items;
}

export async function GET() {
  try {
    const feeds = [
      "https://news.google.com/rss/search?q=finance%20OR%20stock%20market%20OR%20crypto%20OR%20economy%20when:2d&hl=en-IN&gl=IN&ceid=IN:en",
    ];

    const allItems = [];

    for (const url of feeds) {
      const res = await fetch(url, {
        next: { revalidate: 600 },
      });

      const xml = await res.text();
      const items = parseRssItems(xml);
      allItems.push(...items);
    }

    const unique = Array.from(
      new Map(allItems.map((item) => [item.title, item])).values()
    ).sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return Response.json({ news: unique.slice(0, 20) });
  } catch (error) {
    return Response.json(
      { news: [], error: "Failed to load news" },
      { status: 500 }
    );
  }
}