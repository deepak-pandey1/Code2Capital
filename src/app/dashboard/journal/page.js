"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function JournalPage() {
  const [journals, setJournals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/journal")
      .then(res => res.json())
      .then(setJournals);
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-6">Your Journals</h1>

      <button
        onClick={() => router.push("/dashboard/journal/create")}
        className="mb-6 px-4 py-2 bg-purple-600 rounded-lg"
      >
        + Create Journal
      </button>

      <div className="grid md:grid-cols-3 gap-4">
        {journals.map(j => (
          <div
            key={j._id}
            className="p-4 bg-white/5 border border-white/10 rounded-xl"
          >
            <h2 className="font-semibold">{j.name}</h2>
            <p className="text-gray-400">{j.assetType}</p>

            <button
              onClick={() => router.push(`/dashboard/journal/${j._id}`)}
              className="mt-3 text-sm text-purple-400"
            >
              Open →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}