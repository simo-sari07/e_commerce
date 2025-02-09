import React, { useState } from "react";


const CustomAlert = ({ isOpen, onClose, title, message, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 className={`text-lg font-semibold mb-2 ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};
export default CustomAlert;