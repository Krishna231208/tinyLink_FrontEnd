import { Link } from "react-router-dom";

export default function LinkTable({ links, onDelete }) {
  const handleDelete = async code => {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    onDelete();
  };

  return (
    <div className="bg-white rounded shadow p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">Your Links</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Code</th>
            <th className="py-2 text-left">URL</th>
            <th className="py-2 text-left">Clicks</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map(link => (
            <tr key={link.code} className="border-b">
              <td className="py-2">{link.code}</td>

              <td className="py-2 truncate max-w-[240px]">
                <a href={link.long_url} target="_blank" className="text-blue-600">
                  {link.long_url}
                </a>
              </td>

              <td className="py-2">{link.clicks}</td>

              <td className="py-2">
                <Link
                  to={`/code/${link.code}`}
                  className="text-blue-600 underline mr-4"
                >
                  Stats
                </Link>

                <button
                  onClick={() => handleDelete(link.code)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {links.length === 0 && (
            <tr>
              <td className="py-4 text-center text-gray-500" colSpan="4">
                No links yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
