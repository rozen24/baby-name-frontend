import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AlphabetsTable() {
  const [alphabets, setAlphabets] = useState([]);
  const [newAlphabet, setNewAlphabet] = useState("");
  const [editingAlphabet, setEditingAlphabet] = useState(null);

  const token = localStorage.getItem("token");

  const fetchAlphabets = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/alphabets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlphabets(res.data);
    } catch {
      toast.error("Failed to load alphabets");
    }
  }, [token]);

  useEffect(() => {
    fetchAlphabets();
  }, [fetchAlphabets]);

  const addAlphabet = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/alphabets`,
        { name: newAlphabet },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Alphabet added");
      setNewAlphabet("");
      fetchAlphabets();
    } catch {
      toast.error("Failed to add alphabet");
    }
  };

  const updateAlphabet = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/alphabets/${editingAlphabet._id}`,
        { name: editingAlphabet.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Alphabet updated");
      setEditingAlphabet(null);
      fetchAlphabets();
    } catch {
      toast.error("Failed to update alphabet");
    }
  };

  const deleteAlphabet = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/alphabets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Alphabet deleted");
      fetchAlphabets();
    } catch {
      toast.error("Failed to delete alphabet");
    }
  };

  return (
    <div>
  <h2 className="text-xl font-bold mb-4">Alphabets</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New alphabet"
          value={newAlphabet}
          onChange={(e) => setNewAlphabet(e.target.value)}
          className="border p-2 flex-1 mr-2"
        />
        <button onClick={addAlphabet} className="bg-green-600 text-pink-600 px-4 py-2 rounded">
          Add
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Alphabet Name</th>
            <th className="p-2 border"># Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {alphabets.map((alphabet) => (
            <tr key={alphabet._id}>
              <td className="p-2 border">{alphabet.name}</td>
              <td className="p-2 border">{alphabet.count}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-yellow-500 text-pink-600 px-2 py-1 rounded"
                  onClick={() => setEditingAlphabet(alphabet)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-pink-600 px-2 py-1 rounded"
                  onClick={() => deleteAlphabet(alphabet._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingAlphabet && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Alphabet</h3>
            <input
              type="text"
              value={editingAlphabet.name}
              onChange={(e) =>
                setEditingAlphabet({ ...editingAlphabet, name: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-pink-600 px-4 py-2 rounded"
                onClick={() => setEditingAlphabet(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-pink-600 px-4 py-2 rounded"
                onClick={updateAlphabet}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlphabetsTable;
