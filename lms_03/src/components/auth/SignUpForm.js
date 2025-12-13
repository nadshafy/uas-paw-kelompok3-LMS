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
    <div>
      <InputField
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={onInputChange}
        error={errors.name}
        placeholder="Enter your full name"
        icon={User}
      />

      <InputField
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={onInputChange}
        error={errors.email}
        placeholder="Enter your email"
        icon={Mail}
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={onInputChange}
        error={errors.password}
        placeholder="Enter your password"
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onInputChange}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
      />

      <RoleSelector value={formData.role} onChange={onInputChange} />

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className={`w-full py-4 rounded-xl text-base font-semibold text-white transition-all shadow-lg mt-2 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-purple-700 hover:shadow-xl hover:-translate-y-0.5"
        }`}
      >
        {isLoading ? "Please wait..." : "Create Account"}
      </button>
    </div>
  );
};

export default SignUpForm;
