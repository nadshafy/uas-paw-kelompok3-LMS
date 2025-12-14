import React from "react";
import { Mail } from "lucide-react";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";

const LoginForm = ({
  formData,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
}) => {
  return (
    <div>
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={onInputChange}
        error={errors.email}
        placeholder="Masukkan email"
        icon={Mail}
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={onInputChange}
        error={errors.password}
        placeholder="Masukkan password"
      />

      <div className="text-right mb-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert("Password reset feature coming soon!");
          }}
          className="text-#00000-600 text-xs font-medium hover:text-red-700 transition-colors"
        >
          Forgot Password?
        </a>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className={`w-full py-4 rounded-xl text-base font-semibold text-white transition-all shadow-lg ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-black to-black hover:shadow-xl hover:-translate-y-0.5"
        }`}
      >
        {isLoading ? "Please wait..." : "Login"}
      </button>
    </div>
  );
};

export default LoginForm;
