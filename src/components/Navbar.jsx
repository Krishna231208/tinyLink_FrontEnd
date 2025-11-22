import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-3 shadow">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          TinyLink
        </Link>
      </div>
    </nav>
  );
}
