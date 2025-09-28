import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CategoriesTable() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/categories`,
        { name: newCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Category added");
      setNewCategory("");
      fetchCategories();
    } catch {
      toast.error("Failed to add category");
    }
  };

  const updateCategory = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/categories/${editingCategory._id}`,
        { name: editingCategory.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Category updated");
      setEditingCategory(null);
      fetchCategories();
    } catch {
      toast.error("Failed to update category");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category deleted");
      fetchCategories();
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Categories</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 flex-1 mr-2"
        />
        <button onClick={addCategory} className="bg-green-600 text-pink-600 px-4 py-2 rounded">
          Add
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Category Name</th>
            <th className="px-4 py-2 border"># Names</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td className="p-2 border">{cat.name}</td>
              <td className="border px-4 py-2">{cat.count}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-yellow-500 text-pink-600 px-2 py-1 rounded"
                  onClick={() => setEditingCategory(cat)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-pink-600 px-2 py-1 rounded"
                  onClick={() => deleteCategory(cat._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Category</h3>
            <input
              type="text"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, name: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-pink-600 px-4 py-2 rounded"
                onClick={() => setEditingCategory(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-pink-600 px-4 py-2 rounded"
                onClick={updateCategory}
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

export default CategoriesTable;
