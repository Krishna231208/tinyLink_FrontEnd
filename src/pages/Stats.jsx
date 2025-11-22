import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// const API_URL = "http://localhost:5000/api/links";
const API_URL = "https://tinylink-backend-yq24.onrender.com/api/links";


export default function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${code}`)
      .then(res => res.json())
      .then(setData);
  }, [code]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Stats for: {code}</h1>
      <p><strong>Long URL:</strong> {data.long_url}</p>
      <p><strong>Total Clicks:</strong> {data.clicks}</p>
      <p><strong>Last Clicked:</strong> {data.last_clicked || "Never"}</p>
    </div>
  );
}
