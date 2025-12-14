import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
  icon: Icon,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    // 1. Tambah font-['Poppins']
    <div className="mb-5 font-['Poppins']">
      {/* 2. Ubah text-gray-700 jadi text-black */}
      <label className="block mb-2 text-sm font-semibold text-black">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          // 3. Tambah text-black agar hasil ketikan hitam pekat
          // 4. Perbaiki border-white-500 jadi border-amber-500 (Emas) saat fokus
          className={`w-full py-3.5 px-4 text-black ${
            Icon ? "pl-12" : ""
          } border-2 rounded-xl text-sm transition-all outline-none ${
            error
              ? "border-red-500"
              : focused
              ? "border-amber-500" // Fixed: Jadi Amber (Emas) agar valid dan serasi
              : "border-gray-200"
          }`}
        />
      </div>
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputField;
