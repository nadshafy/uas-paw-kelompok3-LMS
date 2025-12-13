import React from "react";

const RoleSelector = ({ value, onChange }) => {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Register as
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label
          className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
            value === "member"
              ? "border-purple-500 bg-purple-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="role"
            value="member"
            checked={value === "member"}
            onChange={onChange}
            className="mr-2 accent-purple-500"
          />
          <span className="text-sm font-medium text-gray-700">Member</span>
        </label>

        <label
          className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
            value === "librarian"
              ? "border-purple-500 bg-purple-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="role"
            value="librarian"
            checked={value === "librarian"}
            onChange={onChange}
            className="mr-2 accent-purple-500"
          />
          <span className="text-sm font-medium text-gray-700">Librarian</span>
        </label>
      </div>
    </div>
  );
};

export default RoleSelector;
