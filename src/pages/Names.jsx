import { useEffect, useState } from "react";
import axios from "axios";

export default function Names() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/names")
      .then((res) => setNames(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">All Baby Names</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {names.map((n) => (
          <li key={n._id} className="border p-2 rounded">
            <strong>{n.name}</strong> <span>({n.gender})</span>
            <p className="text-sm text-gray-500">{n.meaning}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
