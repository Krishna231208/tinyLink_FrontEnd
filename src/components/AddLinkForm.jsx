import { useState } from "react";

export default function AddLinkForm({ onAdd }) {
  const [longUrl, setLongUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl, code }),
    });

    if (res.status === 409) {
      alert("Short code already exists!");
    }

    setLongUrl("");
    setCode("");
    setLoading(false);
    onAdd();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow mb-6"
    >
      <h2 className="text-lg font-semibold mb-3">Create Short Link</h2>

      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={e => setLongUrl(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Custom code (optional)"
        value={code}
        maxLength={8}
        onChange={e => setCode(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
