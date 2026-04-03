"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JournalDetail() {
  const params = useParams();
  const id = params?.id;

  const [journal, setJournal] = useState(null);
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔥 Load data
  useEffect(() => {
    if (!id) return;

    const load = async () => {
      const jRes = await fetch("/api/journal");
      const jData = await jRes.json();
      const j = jData.find((x) => x._id === id);
      setJournal(j);

      const eRes = await fetch(`/api/entry?journalId=${id}`);
      if (eRes.ok) {
        const eData = await eRes.json();
        setEntries(eData);
      }

      setLoading(false);
    };

    load();
  }, [id]);

  // 🔥 Handle input
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // 🔥 Add Entry
  const handleAddEntry = async () => {
    const res = await fetch("/api/entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ journalId: id, data: formData }),
    });

    const newEntry = await res.json();
    setEntries([...entries, newEntry]);
    setFormData({});
  };

  if (loading) return <div>Loading...</div>;
  if (!journal) return <div>Not found</div>;

  return (
    <div>
      <h1 className="text-xl mb-4">{journal.name}</h1>

      <button
        onClick={handleAddEntry}
        className="mb-3 px-4 py-2 bg-green-600 rounded"
      >
        Add Entry
      </button>

      <div className="overflow-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr>
              {journal.columns.map((col) => (
                <th key={col.name} className="p-2 border">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* 🔥 INPUT ROW */}
            <tr>
              {journal.columns.map((col) => (
                <td key={col.name} className="p-2 border">

                  {col.type === "select" ? (
                    <select
                      value={formData[col.name] || ""}
                      onChange={(e) =>
                        handleChange(col.name, e.target.value)
                      }
                      className="bg-black border p-1 w-full"
                    >
                      <option value="">Select</option>
                      {col.options?.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={
                        col.type === "number"
                          ? "number"
                          : col.type === "date"
                          ? "date"
                          : "text"
                      }
                      value={formData[col.name] || ""}
                      onChange={(e) =>
                        handleChange(col.name, e.target.value)
                      }
                      className="bg-black border p-1 w-full"
                    />
                  )}

                </td>
              ))}
            </tr>

            {/* 🔥 SAVED DATA */}
            {entries.map((entry, i) => (
              <tr key={i}>
                {journal.columns.map((col) => (
                  <td key={col.name} className="p-2 border">
                    {entry.data?.[col.name] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}