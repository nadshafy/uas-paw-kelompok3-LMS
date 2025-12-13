import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

const AuthPage = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "member",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (currentPage === "signup" && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (
      currentPage === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // TODO: Ganti dengan API call ke backend Python Pyramid
    // Example:
    // const endpoint = currentPage === 'login' ? '/api/login' : '/api/register';
    // const response = await fetch(endpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });

    setTimeout(() => {
      console.log("Form submitted:", formData);
      alert(`${currentPage === "login" ? "Login" : "Sign Up"} successful!`);

      // TODO: Save token and redirect
      // localStorage.setItem('token', data.token);
      // window.location.href = '/dashboard';

      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const switchPage = (page) => {
    setCurrentPage(page);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "member",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-500 via-black-600 to-black-800 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8 text-black">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-2xl">
            <BookOpen size={40} className="text-red-600" />
          </div>
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
            Library System
          </h1>
          <p className="text-lg opacity-95">
            {currentPage === "login" ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl p-10 shadow-2xl">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => switchPage("login")}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                currentPage === "login"
                  ? "bg-white text-purple-600 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchPage("signup")}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                currentPage === "signup"
                  ? "bg-white text-purple-600 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          {currentPage === "login" ? (
            <LoginForm
              formData={formData}
              errors={errors}
              isLoading={isLoading}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          ) : (
            <SignUpForm
              formData={formData}
              errors={errors}
              isLoading={isLoading}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-black text-sm opacity-90">
          UAS PAW - Library Management System
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
