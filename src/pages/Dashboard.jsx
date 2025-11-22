import React, { useEffect, useState } from "react";

// Backend API
const API_URL = "https://tinylink-backend-yq24.onrender.com/api/links";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [longUrl, setLongUrl] = useState("");
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("code");
  const [sortOrder, setSortOrder] = useState("asc");
  const [copied, setCopied] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all links
  const fetchLinks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Submit new link
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const body = { longUrl, code };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setSuccess("New link added!");
      setLongUrl("");
      setCode("");
      fetchLinks();
    }

    setLoading(false);
  };

  const deleteLink = async (code) => {
    await fetch(`${API_URL}/${code}`, { method: "DELETE" });
    fetchLinks();
  };

  // Filtering
  const filteredLinks = links.filter(
    (l) =>
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.long_url.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  const sortedLinks = [...filteredLinks].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (sortOrder === "asc") {
      return fieldA > fieldB ? 1 : -1;
    }
    return fieldA < fieldB ? 1 : -1;
  });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">TinyLink Dashboard</h1>

      {/* Add Link Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 rounded mb-8 space-y-4"
      >
        <div>
          <label className="block font-medium">Long URL</label>
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Custom Code (optional)</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Short Link"}
        </button>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by code or URL..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white shadow p-4 rounded overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b font-semibold">
              <th
                className="p-2 cursor-pointer"
                onClick={() => toggleSort("code")}
              >
                Code 🔽
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => toggleSort("long_url")}
              >
                Long URL
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => toggleSort("clicks")}
              >
                Clicks
              </th>
              <th
                className="p-2 cursor-pointer"
                onClick={() => toggleSort("last_clicked")}
              >
                Last Clicked
              </th>
              <th className="p-2">Copy</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedLinks.map((link) => {
              const shortUrl = `https://tinylink.com/${link.code}`;

              return (
                <tr key={link.code} className="border-b">
                  <td className="p-2">
                    <a
                      href={`https://tinylink-backend-yq24.onrender.com/${link.code}`}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {shortUrl}
                    </a>
                  </td>

                  {/* Long URL Truncated */}
                  <td className="p-2 max-w-xs truncate">{link.long_url}</td>

                  <td className="p-2">{link.clicks}</td>
                  <td className="p-2">
                    {link.last_clicked
                      ? new Date(link.last_clicked).toLocaleString()
                      : "—"}
                  </td>

                  {/* Copy Button */}
                  <td className="p-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://tinylink.com/${link.code}`
                        );
                        setCopied(link.code); // show copied message for this code
                        setTimeout(() => setCopied(""), 2000); // hide after 2 seconds
                      }}
                      className="bg-green-600 text-white px-2 py-1 text-sm rounded"
                    >
                      Copy
                    </button>

                    {/* Show "Copied!" message */}
                    {copied === link.code && (
                      <span className="ml-2 text-sm text-green-600 font-medium">
                        Copied!
                      </span>
                    )}
                  </td>

                  <td className="p-2">
                    <a
                      href={`${window.location.origin}/code/${link.code}`}
                      className="text-green-600 hover:underline"
                      target="_blank"
                    >
                      Stats
                    </a>

                    <button
                      onClick={() => deleteLink(link.code)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {links.length === 0 && (
          <p className="text-gray-500 mt-4">No links yet.</p>
        )}
      </div>
    </div>
  );
}
