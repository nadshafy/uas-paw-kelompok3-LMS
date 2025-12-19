import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

const AuthPage = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      if (role === "librarian") {
        navigate("/dashboard-librarian");
      } else {
        navigate("/dashboard-member");
      }
    }
  }, [navigate]);

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
      setTimeout(() => {
        localStorage.setItem("token", "dummy-token-" + Date.now());
        localStorage.setItem("userName", formData.name || "User");
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userRole", formData.role);

        if (formData.role === "librarian") {
          navigate("/dashboard-librarian");
        } else {
          navigate("/dashboard-member");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-500 to-amber-400 font-['Poppins']">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8 text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 shadow-xl border border-white/30">
            <BookOpen size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 drop-shadow-md">
            Perpustakaan FRAND
          </h1>
          <p className="text-lg opacity-90 font-medium">
            {currentPage === "login"
              ? "Selamat Datang!"
              : "Yuk, Gabung Sekarang!"}
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-10 shadow-2xl">
          <div className="flex mb-8 bg-white/10 rounded-2xl p-1">
            <button
              onClick={() => switchPage("login")}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                currentPage === "login"
                  ? "bg-white text-indigo-900 shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchPage("signup")}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                currentPage === "signup"
                  ? "bg-white text-indigo-900 shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Sign Up
            </button>
          </div>

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

        <p className="text-center mt-6 text-white text-sm opacity-80 font-medium">
          UAS PAW - Library Management System
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
