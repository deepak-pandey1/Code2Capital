export const revalidate = 600;

const FEEDS = [
  "https://news.google.com/rss/search?q=finance%20when:7d&hl=en-IN&gl=IN&ceid=IN:en",
  "https://news.google.com/rss/search?q=stock%20market%20when:7d&hl=en-IN&gl=IN&ceid=IN:en",
  "https://news.google.com/rss/search?q=markets%20when:7d&hl=en-IN&gl=IN&ceid=IN:en",
  "https://news.google.com/rss/search?q=economy%20when:7d&hl=en-IN&gl=IN&ceid=IN:en",
  "https://news.google.com/rss/search?q=business%20when:7d&hl=en-IN&gl=IN&ceid=IN:en",
  "https://news.google.com/rss/search?q=crypto%20when:7d&hl=en-IN&gl=IN&ceid=IN:en",
];

const ALLOWED_SOURCES = [
  "CNBC TV18",
  "Business Standard",
  "Mint",
  "Economic Times",
  "Moneycontrol",
  "The Wall Street Journal",
  "Financial Times",
  "CNBC",
  "Bloomberg",
  "BBC",
  "The Times of India",
  "NDTV",
  "India Today",
];

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

function normalizeText(value = "") {
  return decodeHtml(value)
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSource(value = "") {
  return normalizeText(value);
}

function normalizeTitle(value = "") {
  return normalizeText(value);
}

function isAllowedSource(source = "") {
  const s = normalizeSource(source);

  return ALLOWED_SOURCES.some((allowed) => {
    const a = normalizeSource(allowed);

    if (s === a) return true;

    if (a === "cnbc tv 18") {
      return (
        s.includes("cnbc tv18") ||
        s.includes("cnbc tv 18") ||
        s.includes("cnbctv18") ||
        s.includes("cnbc television 18")
      );
    }

    if (a === "the times of india") {
      return s.includes("times of india") || s.includes("toi");
    }

    if (a === "economic times") {
      return s.includes("economic times") || s.includes("the economic times");
    }

    if (a === "financial times") {
      return s.includes("financial times") || s.includes("ft");
    }

    if (a === "wall street journal") {
      return s.includes("wall street journal") || s.includes("wsj");
    }

    if (a === "bbc") {
      return s.includes("bbc");
    }

    if (a === "ndtv") {
      return s.includes("ndtv");
    }

    if (a === "india today") {
      return s.includes("india today");
    }

    if (a === "moneycontrol") {
      return s.includes("moneycontrol");
    }

    if (a === "mint") {
      return s.includes("livemint") || s.includes("mint");
    }

    if (a === "bloomberg") {
      return s.includes("bloomberg");
    }

    if (a === "business standard") {
      return s.includes("business standard");
    }

    if (a === "cnbc") {
      return s.includes("cnbc");
    }

    return false;
  });
}

function parseRssItems(xml) {
  const items = [];
  const matches = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

  for (const item of matches) {
    const title = decodeHtml(stripHtml(getTagValue(item, "title"))).trim();
    const link = getTagValue(item, "link").trim();
    const pubDate = parseDateSafe(getTagValue(item, "pubDate"));

    const sourceMatch = item.match(/<source[^>]*>([\s\S]*?)<\/source>/i);
    const source = decodeHtml(
      stripHtml(sourceMatch ? sourceMatch[1] : "Google News")
    ).trim();

    if (!title || !link || !pubDate) continue;
    if (!isAllowedSource(source)) continue;

    items.push({
      title,
      link,
      source,
      publishedAt: pubDate,
    });
  }

  return items;
}

async function fetchFeed(url) {
  const res = await fetch(url, {
    next: { revalidate },
    headers: {
      "user-agent": "Mozilla/5.0",
      accept: "application/rss+xml,application/xml,text/xml,*/*",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch feed: ${res.status} ${res.statusText}`);
  }

  return res.text();
}

function dedupeNews(items) {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    const linkKey = item.link.toLowerCase().trim();
    const titleKey = normalizeTitle(item.title);
    const sourceKey = normalizeSource(item.source);

    // Strong dedupe:
    // 1) exact link
    // 2) same title + source
    // 3) same title across feeds is also treated as duplicate
    const compositeKey = `${titleKey}::${sourceKey}`;
    const titleOnlyKey = titleKey;

    if (
      seen.has(linkKey) ||
      seen.has(compositeKey) ||
      seen.has(titleOnlyKey)
    ) {
      continue;
    }

    seen.add(linkKey);
    seen.add(compositeKey);
    seen.add(titleOnlyKey);

    result.push(item);
  }

  return result;
}

export async function GET() {
  try {
    const allItems = [];

    for (const url of FEEDS) {
      const xml = await fetchFeed(url);
      const items = parseRssItems(xml);
      allItems.push(...items);
    }

    const sorted = allItems.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const unique = dedupeNews(sorted);

    return Response.json({
      news: unique.slice(0, 60),
      sources: ALLOWED_SOURCES,
      total: unique.length,
    });
  } catch (error) {
    console.error("News API error:", error);

    return Response.json(
      { news: [], error: "Failed to load news" },
      { status: 500 }
    );
  }
}