import React, { useState, useEffect } from "react";
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

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      // Redirect to appropriate dashboard
      if (role === "librarian") {
        window.location.href = "/dashboard-librarian";
      } else {
        window.location.href = "/dashboard-member";
      }
    }
  }, []);

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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      // TODO: Replace with actual API endpoint
      // const endpoint = currentPage === 'login'
      //   ? 'http://your-domain.web.id/api/login'
      //   : 'http://your-domain.web.id/api/register';

      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password,
      //     name: formData.name,
      //     role: formData.role
      //   })
      // });

      // const data = await response.json();

      // Simulate successful response
      setTimeout(() => {
        // Save to localStorage
        localStorage.setItem("token", "dummy-token-" + Date.now());
        localStorage.setItem("userName", formData.name || "User");
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userRole", formData.role);

        // Redirect based on role
        if (formData.role === "librarian") {
          window.location.href = "/dashboard-librarian";
        } else {
          window.location.href = "/dashboard-member";
        }

        setIsLoading(false);
      }, 1500);
    } catch (error) {
      alert("Error: " + error.message);
      setIsLoading(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-500 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8 text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-2xl">
            <BookOpen size={40} className="text-red-600" />
          </div>
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
            Perpustakaan FRAND
          </h1>
          <p className="text-lg opacity-95">
            {currentPage === "login"
              ? "Selamat Datang!"
              : "Create your account"}
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
                  ? "bg-white text-red-600 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchPage("signup")}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                currentPage === "signup"
                  ? "bg-white text-red-600 shadow-md"
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
        <p className="text-center mt-6 text-white text-sm opacity-90">
          UAS PAW - Library Management System
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
