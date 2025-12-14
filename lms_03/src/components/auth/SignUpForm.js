import React from "react";
import { User, Mail } from "lucide-react";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import RoleSelector from "./RoleSelector";

const SignUpForm = ({
  formData,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
}) => {
  return (
    // 1. Tambahkan font-['Poppins'] di sini
    <div className="font-['Poppins']">
      <InputField
        label="Nama"
        type="text"
        name="name"
        value={formData.name}
        onChange={onInputChange}
        error={errors.name}
        placeholder="Masukkan Nama Lengkap"
        icon={User}
      />

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

      <PasswordInput
        label="Konfirmasi Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onInputChange}
        error={errors.confirmPassword}
        placeholder="Ulangi Password"
      />

      <RoleSelector value={formData.role} onChange={onInputChange} />

      <button
        onClick={onSubmit}
        disabled={isLoading}
        // 2. Ubah font-semibold jadi font-bold
        // 3. Ubah warna jadi bg-amber-500 (Emas) agar serasi dengan Login
        className={`w-full py-4 rounded-xl text-base font-bold text-white transition-all shadow-lg mt-2 ${
          isLoading
            ? "bg-black-400 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600 hover:shadow-amber-500/40 hover:shadow-xl hover:-translate-y-0.5"
        }`}
      >
        {isLoading ? "Please wait..." : "Buat Akun"}
      </button>
    </div>
  );
};

export default SignUpForm;
