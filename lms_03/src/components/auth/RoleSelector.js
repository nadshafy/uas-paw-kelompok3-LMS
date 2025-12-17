import React from "react";

const RoleSelector = ({ value, onChange }) => {
  return (
    
    <div className="mb-5 font-['Poppins']">
      <label className="block mb-2 text-sm font-bold text-black">
        Daftar Sebagai
      </label>
      <div className="grid grid-cols-2 gap-3">
      
        <label
          className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
            value === "member"
              ? "border-amber-500 bg-amber-50" 
              : "border-gray-200 bg-white hover:border-amber-200" 
          }`}
        >
          <input
            type="radio"
            name="role"
            value="member"
            checked={value === "member"}
            onChange={onChange}
            
            className="mr-2 accent-black-500"
          />
          
          <span className="text-sm font-bold text-black">Member</span>
        </label>

      
        <label
          className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
            value === "librarian"
              ? "border-amber-500 bg-amber-50"
              : "border-gray-200 bg-white hover:border-amber-200"
          }`}
        >
          <input
            type="radio"
            name="role"
            value="librarian"
            checked={value === "librarian"}
            onChange={onChange}
            className="mr-2 accent-black-500"
          />
          
          <span className="text-sm font-bold text-black">Librarian</span>
        </label>
      </div>
    </div>
  );
};

export default RoleSelector;
