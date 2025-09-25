import React from "react";

const Sidebar = ({ setActiveView, setPopupType, user }) => {
  return (
    <aside className="w-64 bg-white shadow h-full p-4">
      <h3 className="text-lg font-bold mb-4">Menu</h3>
      <ul className="space-y-2">
        {/* Add actions */}
        <li>
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
            onClick={() => setPopupType("category")}
          >
            Add Category
          </button>
        </li>
        <li>
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
            onClick={() => setPopupType("origin")}
          >
            Add Origin
          </button>
        </li>
        <li>
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
            onClick={() => setPopupType("name")}
          >
            Add Name
          </button>
        </li>

        {/* Only super admin can add users */}
        {user.role === "superAdmin" && (
          <li>
            <button
              className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
              onClick={() => setPopupType("user")}
            >
              Add User
            </button>
          </li>
        )}

        <hr className="my-3" />

        {/* All views */}
        <li>
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
            onClick={() => setActiveView("allCategories")}
          >
            All Categories
          </button>
        </li>
        <li>
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
            onClick={() => setActiveView("allOrigins")}
          >
            All Origins
          </button>
        </li>
        <li>
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
            onClick={() => setActiveView("allNames")}
          >
            All Names
          </button>
        </li>
        {user.role === "superAdmin" && (
          <li>
            <button
              className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
              onClick={() => setActiveView("allUsers")}
            >
              All Users
            </button>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
