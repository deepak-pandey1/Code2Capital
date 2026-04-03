"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateJournal() {
  const [name, setName] = useState("");
  const [assetType, setAssetType] = useState("Forex");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, assetType }),
      });

      // ❌ ERROR HANDLE (IMPORTANT)
      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error:", errorText);
        alert("Journal create nahi hua ❌");
        return;
      }

      const data = await res.json();

      // ✅ SAFE NAVIGATION
      if (data?._id) {
        router.push(`/dashboard/journal/${data._id}`);
      } else {
        alert("Something went wrong ❌");
      }

    } catch (err) {
      console.error("Create Error:", err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Create Journal</h1>

      <input
        placeholder="Strategy Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 bg-white/5 border mb-3"
      />

      <select
        value={assetType}
        onChange={(e) => setAssetType(e.target.value)}
        className="p-2 bg-white/5 border"
      >
        <option>Forex</option>
        <option>Crypto</option>
        <option>Stocks</option>
        <option>Commodity</option>
      </select>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="block mt-4 px-4 py-2 bg-purple-600 rounded"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}