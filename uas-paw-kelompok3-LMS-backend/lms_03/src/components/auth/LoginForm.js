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
    <div className="font-['Poppins']">
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={onInputChange}
        error={errors.email}
        placeholder="Masukkan Email"
        icon={Mail}
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={onInputChange}
        error={errors.password}
        placeholder="Masukkan Password"
      />

      <div className="text-right mb-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert("Password reset feature coming soon!");
          }}
          // Link tetap putih, hover jadi Amber terang biar match
          className="text-white text-xs font-medium hover:text-amber-100 transition-colors"
        >
          Forgot Password?
        </a>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        // UBAH WARNA TOMBOL:
        // Menggunakan bg-amber-500 (Emas) -> hover ke amber-600 (Emas Gelap)
        // Ditambah shadow warna amber biar makin glowing elegant
        className={`w-full py-4 rounded-xl text-base font-semibold text-white transition-all shadow-lg ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600 hover:shadow-amber-500/40 hover:shadow-xl hover:-translate-y-0.5"
        }`}
      >
        {isLoading ? "Please wait..." : "Login"}
      </button>
    </div>
  );
};

export default LoginForm;
