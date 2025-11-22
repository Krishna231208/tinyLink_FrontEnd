import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/code/:code" element={<Stats />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
