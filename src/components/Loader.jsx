import React from "react";

export default function Loader({ text = "Please wait..." }) {
  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-10 flex flex-col items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-black mt-3 text-lg font-medium">{text}</p>
    </div>
  );
}
