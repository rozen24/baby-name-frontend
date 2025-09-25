import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const role = localStorage.getItem("role");
  let links;
   if (role === "superadmin") {
       links = [
        {name: "All Users", path: "/admin/users"},
        { name: " All Categories", path: "/admin/categories" },
        { name: "All Origins", path: "/admin/origins" },
        { name: "All Names", path: "/admin/names" }
      ];
   } else if (role === "editor") {
       links = [
        { name: " All Categories", path: "/admin/categories" },
        { name: "All Origins", path: "/admin/origins" },
        { name: "All Names", path: "/admin/names" }
      ];
   } else {
    `You Dont Have Permission`;
   }

  

  return (
    <div className="w-60 bg-gray-800 text-pink-600 h-screen flex flex-col mr-0">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
        Admin Dashboard
      </h2>
      <nav className="flex-1">
        
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-2 hover:bg-gray-700 ${
              location.pathname === link.path ? "bg-gray-700" : ""
            }`}
          >
            {link.name}
          </Link> 
        ))}      
      </nav>
    </div>
  );
};

export default Sidebar;
