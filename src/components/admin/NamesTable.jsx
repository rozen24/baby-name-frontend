import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { toast } from "react-toastify";
import Loader from "../Loader";




function NamesTable() {
  const [names, setNames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [uploadingCSV, setUploadingCSV] = useState(false);


  const [filters, setFilters] = useState({
    gender: "",
    category: "",
    origin: "",
    search: "",
  });

  const [BabyName, setBabyName] = useState({
    name: "",
    gender: "",
    category: "",
    origin: "",
    meaning: "",
  });

  const [editingName, setEditingName] = useState(null);

  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(50);
  const [page, setPage] = useState(1);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ✅ Fetch Names with pagination + filters
  const fetchNames = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/names`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { ...filters, page, limit: perPage },
      });
      setNames(res.data.names || []);
      setTotal(res.data.total || 0);
    } catch {
      toast.error("Failed to load names");
    }
  };

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

  const fetchOrigins = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/origins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrigins(res.data);
    } catch {
      toast.error("Failed to load origins");
    }
  };

  useEffect(() => {
    fetchNames();
  }, [filters, page, perPage]);

  useEffect(() => {
    fetchCategories();
    fetchOrigins();
  }, []);

  // ✅ CRUD Actions
  const addName = async () => {
      try {
        const payload = {
        ...BabyName,
        category: BabyName.category || null,
        origin: BabyName.origin || null,
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/names`, payload,{
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Name added");
      setBabyName({ name: "", gender: "", category: "", origin: "", meaning: "" });
      fetchNames();
    } catch {
      toast.error("Failed to add name");
    }
  };

  const updateName = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/names/${editingName._id}`,
        editingName,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Name updated");
      setEditingName(null);
      fetchNames();
    } catch {
      toast.error("Failed to update name");
    }
  };

  const deleteName = async (id) => {
    if (role !== "superadmin") {
      return toast.error("Only superadmin can delete names");
    }
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/names/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Name deleted");
      fetchNames();
    } catch {
      toast.error("Failed to delete name");
    }
  };

  // ✅ CSV Export
  const exportCSV = () => {
    const csv = Papa.unparse(
      names.map((n) => ({
        Name: n.name,
        Gender: n.gender,
        Category: n.category?.name || "",
        Origin: n.origin?.name || "",
        Meaning: n.meaning || "",
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "baby_names.csv";
    link.click();
  };

 // ✅ CSV Import
// const importCSV = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("file", file);

//   Papa.parse(file, {
//     header: true,
//     skipEmptyLines: true, // prevent empty rows
//     complete: async (results) => {
//       // Clean up rows (remove blank rows / trim values)
//       const cleanedData = results.data
//         .map((row) => ({
//           name: row.name?.trim() || "",
//           gender: row.gender?.trim() || "",
//           meaning: row.meaning?.trim() || "",
//           category: row.category?.trim() || null,
//           origin: row.origin?.trim() || null,
//         }))
//         .filter((row) => row.name); // must at least have a name

//         try {
//           await axios.post(
//             "${import.meta.env.VITE_API_URL}/names/bulk", formData,
//             { names: cleanedData },
//             { 
//               headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } 
              
//             }
//           );
//           toast.success("CSV imported successfully!");
//           fetchNames();
//         } catch (error) {
//           console.error("❌ CSV import error:", error.response?.data || error.message);
//           toast.error("Failed to import CSV");
//         }
//       },
//     });
//   };

    // Use this if your backend route is: router.post('/bulk', protect, upload.single('file'), bulkImportNames)
    // and bulkImportNames reads req.file
    // const importCSV = async (e) => {
    //   const file = e.target.files[0];
    //   if (!file) return;

    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     toast.error("You must be logged in to import CSV");
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append("file", file);

    //   try {
    //     await axios.post("${import.meta.env.VITE_API_URL}/names/bulk", formData, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         // DO NOT set Content-Type manually — let browser set multipart/form-data boundary
    //       },
    //     });

    //     toast.success("CSV uploaded successfully!");
    //     fetchNames();
    //   } catch (error) {
    //     console.error("❌ CSV upload error:", error.response?.data || error.message);
    //     toast.error(error.response?.data?.message || "Failed to upload CSV");
    //   }
    // };

    const importCSV = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You must be logged in to import CSV");
    return;
  }
  
  const formData = new FormData();
  formData.append("file", file);
  setUploadingCSV(true); // show spinner
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/names/bulk`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ DO NOT manually set Content-Type — axios will set it with proper boundary
      },
    });

    toast.success("CSV imported successfully!");
    fetchNames();
  } catch (error) {
    console.error("❌ CSV import error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to import CSV");
  } finally {
      setUploadingCSV(false); // hide spinner
  }

};



  // Pagination
  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      {uploadingCSV && ( <Loader text="PLease Wait... Until complete Upload" /> )}

      

      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">
          Total Baby Names ({total})
        </h2>
        <label>
          Show per page:
          <input
            type="number"
            min="1"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value) || 50);
              setPage(1);
            }}
            className="ml-2 border p-1 w-20"
          />
        </label>

        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="bg-green-500 text-pink-600 px-3 py-1 rounded"
          >
            Export CSV
          </button>
          <label className="cursor-pointer bg-blue-500 text-pink-600 px-3 py-1 rounded">
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={importCSV}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-4">
        <select
          className="border p-2"
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="">All Genders</option>
          <option value="Boy">Boy</option>
          <option value="Girl">Girl</option>
          <option value="Unisex">Unisex</option>
        </select>

        <select
          className="border p-2"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={filters.origin}
          onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
        >
          <option value="">All Origins</option>
          {origins.map((o) => (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by name"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border p-2 flex-1"
        />
      </div>

      {/* Add new name form */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Add New Name</h3>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            placeholder="Name"
            value={BabyName.name}
            onChange={(e) => setBabyName({ ...BabyName, name: e.target.value })}
            className="border p-2"
          />
          <select
            value={BabyName.gender}
            onChange={(e) => setBabyName({ ...BabyName, gender: e.target.value })}
            className="border p-2"
          >
            <option value="">Gender</option>
            <option value="Boy">Boy</option>
            <option value="Girl">Girl</option>
            <option value="Unisex">Unisex</option>
          </select>
          <select
            value={BabyName.category}
            onChange={(e) => setBabyName({ ...BabyName, category: e.target.value })}
            className="border p-2"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={BabyName.origin}
            onChange={(e) => setBabyName({ ...BabyName, origin: e.target.value })}
            className="border p-2"
          >
            <option value="">Select Origin</option>
            {origins.map((o) => (
              <option key={o._id} value={o._id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          placeholder="Meaning"
          value={BabyName.meaning}
          onChange={(e) => setBabyName({ ...BabyName, meaning: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={addName}
          className="bg-green-600 text-pink-600 px-4 py-2 rounded"
        >
          Add Name
        </button>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-1 border">Name</th>
            <th className="p-1 border">Gender</th>
            <th className="p-1 border">Category</th>
            <th className="p-1 border">Origin</th>
            <th className="p-1 border">Meaning</th>
            <th className="p-1 border">Date</th>
            <th className="p-1 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {names.map((n) => (
            <tr key={n._id}>
              <td className="p-1 border">{n.name}</td>
              <td className="p-1 border">{n.gender}</td>
              <td className="p-1 border">{n.category?.name || "-"}</td>
              <td className="p-1 border">{n.origin?.name || "-"}</td>
              <td className="p-1 border">{n.meaning}</td>
              <td className="p-1 border">
                {new Date(n.createdAt).toLocaleDateString()}
              </td>
              <td className="p-1 border space-x-2">
                <button
                  className="bg-yellow-500 text-pink-600 px-2 py-1 rounded"
                  onClick={() => setEditingName(n)}
                >
                  Edit
                </button>
                {role === "superadmin" && (
                  <button
                    className="bg-red-600 text-pink-600 px-2 py-1 rounded"
                    onClick={() => deleteName(n._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit popup */}
      {editingName && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Name</h3>
            <input
              type="text"
              value={editingName.name}
              onChange={(e) =>
                setEditingName({ ...editingName, name: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <textarea
              value={editingName.meaning}
              onChange={(e) =>
                setEditingName({ ...editingName, meaning: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            {/* Gender */}
            <select
              className="border p-2 w-full mb-2"
              value={editingName.gender}
              onChange={(e) =>
                setEditingName({ ...editingName, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
              <option value="Unisex">Unisex</option>
            </select>
             {/* Category Dropdown */}
            <select
              className="border p-2 w-full mb-2"
              value={editingName.category?._id || editingName.category || ""}
              onChange={(e) =>
                setEditingName({ ...editingName, category: e.target.value })
              }
            >
              <option value=""> Select Category </option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Origin Dropdown */}
            <select
              className="border p-2 w-full mb-2"
              value={editingName.origin?._id || editingName.origin || ""}
              onChange={(e) =>
                setEditingName({ ...editingName, origin: e.target.value })
              }
            >
              <option value="">Select Origin</option>
              {origins.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-pink-600 px-4 py-2 rounded"
                onClick={() => setEditingName(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-pink-600 px-4 py-2 rounded"
                onClick={updateName}
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

export default NamesTable;
