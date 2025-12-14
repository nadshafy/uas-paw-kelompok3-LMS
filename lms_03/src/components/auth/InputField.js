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
    <div className="mb-5">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
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
          className={`w-full py-3.5 px-4 ${
            Icon ? "pl-12" : ""
          } border-2 rounded-xl text-sm transition-all outline-none ${
            error
              ? "border-red-500"
              : focused
              ? "border-white-500"
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
