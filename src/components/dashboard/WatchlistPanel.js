"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Plus,
  Trash2,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Star,
} from "lucide-react";

export default function WatchlistPanel() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingAction, setLoadingAction] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadWatchlist();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        searchCoins(query.trim());
      } else {
        setResults([]);
      }
    }, 350);

    return () => clearTimeout(delay);
  }, [query]);

  const loadWatchlist = async () => {
  try {
    const res = await fetch("/api/watchlist");
    const data = await res.json();

    const items = data.items || [];

    // 🔥 yahan live price fetch ho raha hai
    const ids = items.map((i) => i.coinId).join(",");

    let priceMap = {};
    if (ids) {
      const priceRes = await fetch(`/api/crypto-price?ids=${ids}`);
      priceMap = await priceRes.json();
    }

    const updated = items.map((item) => ({
      ...item,
      price: priceMap[item.coinId]?.usd || 0,
      change24h: priceMap[item.coinId]?.usd_24h_change || 0,
    }));

    setItems(updated);
  } catch (error) {
    setItems([]);
  }
};

  useEffect(() => {
  const interval = setInterval(() => {
    loadWatchlist();
  }, 5000); // 10 sec

  return () => clearInterval(interval);
}, []);

const searchCoins = async (text) => {
  try {
    setLoadingSearch(true);
    setMessage("");

    // ✅ call your backend API
    const res = await fetch(`/api/crypto-search?q=${text}`);
    const data = await res.json();

    const coins = (data.coins || []).slice(0, 6);
    const ids = coins.map((coin) => coin.id).join(",");

    let priceMap = {};
    if (ids) {
      const priceRes = await fetch(`/api/crypto-price?ids=${ids}`);
      priceMap = await priceRes.json();
    }

    const formatted = coins.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      image: coin.thumb,
      price: priceMap[coin.id]?.usd ?? 0,
      change24h: priceMap[coin.id]?.usd_24h_change ?? 0,
    }));

    setResults(formatted);
  } catch (error) {
    setResults([]);
    setMessage("Search failed. Try again.");
  } finally {
    setLoadingSearch(false);
  }
};

  const addCoin = async (coin) => {
    if (items.length >= 5) {
      setMessage("Maximum 5 items allowed.");
      return;
    }

    if (items.some((item) => item.coinId === coin.coinId)) {
      setMessage("Already added.");
      return;
    }

    try {
      setLoadingAction(coin.coinId);
      setMessage("");

      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coin),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Could not add item");
        return;
      }

      setItems(data.items || []);
      setQuery("");
      setResults([]);
      setMessage("Added successfully.");
    } catch (error) {
      setMessage("Could not add item.");
    } finally {
      setLoadingAction("");
    }
  };

  const removeCoin = async (coinId) => {
    try {
      setLoadingAction(coinId);

      const res = await fetch("/api/watchlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coinId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Could not remove item");
        return;
      }

      setItems(data.items || []);
      setMessage("Removed.");
    } catch (error) {
      setMessage("Could not remove item.");
    } finally {
      setLoadingAction("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        border: "1px solid var(--border)",
        background: "var(--card)",
        borderRadius: "18px",
        backdropFilter: "blur(12px)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "20px 22px 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "12px",
              border: "1px solid rgba(34,197,94,0.22)",
              background: "rgba(34,197,94,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Star size={15} color="var(--primary)" />
          </div>
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.55,
              }}
            >
              Watchlist
            </div>
            <div style={{ fontSize: "13px", opacity: 0.55 }}>
              Search crypto and save up to 5
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "11px",
            opacity: 0.45,
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          {items.length}/5
        </div>
      </div>

      <div style={{ padding: "18px 22px 22px" }}>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            padding: "12px 14px",
            borderRadius: "14px",
            border: "1px solid var(--border)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <Search size={15} color="var(--primary)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crypto name or symbol..."
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text)",
              fontSize: "13px",
            }}
          />
        </div>

        {message ? (
          <div
            style={{
              marginTop: 10,
              fontSize: "12px",
              opacity: 0.7,
            }}
          >
            {message}
          </div>
        ) : null}

        <AnimatePresence>
          {query.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 10,
              }}
            >
              {loadingSearch ? (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "12px",
                    opacity: 0.6,
                    padding: "10px 0",
                  }}
                >
                  <Loader2 size={14} className="animate-spin" />
                  Searching...
                </div>
              ) : results.length > 0 ? (
                results.map((coin) => {
                  const isAdded = items.some((item) => item.coinId === coin.coinId);

                  return (
                    <motion.div
                      key={coin.coinId}
                      whileHover={{ y: -2 }}
                      style={{
                        borderRadius: "16px",
                        border: "1px solid var(--border)",
                        background: "rgba(255,255,255,0.02)",
                        padding: "14px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={{ display: "flex", gap: 10 }}>
                          <img
                            src={coin.image}
                            alt={coin.name}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                            }}
                          />
                          <div>
                            <div style={{ fontSize: "14px", fontWeight: 700 }}>
                              {coin.name}
                            </div>
                            <div
                              style={{
                                fontSize: "11px",
                                opacity: 0.45,
                                letterSpacing: "0.06em",
                              }}
                            >
                              {coin.symbol}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => addCoin(coin)}
                          disabled={isAdded || loadingAction === coin.coinId}
                          style={{
                            border: "1px solid rgba(34,197,94,0.22)",
                            background: isAdded
                              ? "rgba(34,197,94,0.12)"
                              : "rgba(34,197,94,0.08)",
                            color: "var(--primary)",
                            borderRadius: "10px",
                            padding: "7px 10px",
                            fontSize: "11px",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          {loadingAction === coin.coinId ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Plus size={13} />
                          )}
                          {isAdded ? "Added" : "Add"}
                        </button>
                      </div>

                      <div
                        style={{
                          marginTop: 12,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ fontSize: "13px", fontWeight: 700 }}>
                          ₹{coin.price?.toLocaleString("en-IN") || "0"}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: "12px",
                            fontWeight: 700,
                            color:
                              coin.change24h >= 0
                                ? "var(--primary)"
                                : "#ef4444",
                          }}
                        >
                          {coin.change24h >= 0 ? (
                            <ArrowUpRight size={13} />
                          ) : (
                            <ArrowDownRight size={13} />
                          )}
                          {Math.abs(coin.change24h || 0).toFixed(2)}%
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    fontSize: "12px",
                    opacity: 0.55,
                    padding: "8px 0",
                  }}
                >
                  No crypto found.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 12,
          }}
        >
          {items.map((item) => {
            const positive = Number(item.change24h || 0) >= 0;

            return (
              <motion.div
                key={item.coinId}
                layout
                whileHover={{ y: -2 }}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  background: positive
                    ? "rgba(34,197,94,0.06)"
                    : "rgba(255,255,255,0.02)",
                  padding: "15px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 800 }}>
                      {item.name}
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: "11px",
                        opacity: 0.45,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {item.symbol}
                    </div>
                  </div>

                  <button
                    onClick={() => removeCoin(item.coinId)}
                    disabled={loadingAction === item.coinId}
                    style={{
                      border: "1px solid rgba(239,68,68,0.2)",
                      background: "rgba(239,68,68,0.06)",
                      color: "#ef4444",
                      borderRadius: "10px",
                      padding: "7px 9px",
                      cursor: "pointer",
                    }}
                  >
                    {loadingAction === item.coinId ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                  </button>
                </div>

                <div
                  style={{
                    marginTop: 18,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: 800 }}>
                   ${Number(item.price || 0).toLocaleString("en-US")}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "12px",
                      fontWeight: 800,
                      color: positive ? "var(--primary)" : "#ef4444",
                    }}
                  >
                    {positive ? (
                      <ArrowUpRight size={13} />
                    ) : (
                      <ArrowDownRight size={13} />
                    )}
                    {Math.abs(Number(item.change24h || 0)).toFixed(2)}%
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}