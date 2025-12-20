import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
  },
};

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
      navigate(
        role === "librarian"
          ? "/dashboard-librarian"
          : "/dashboard-member"
      );
    }
  }, [navigate]);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};

    if (currentPage === "signup" && !formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (
      currentPage === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const endpoint =
        currentPage === "login"
          ? API_ENDPOINTS.AUTH.LOGIN
          : API_ENDPOINTS.AUTH.REGISTER;

      const payload =
        currentPage === "login"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              role: formData.role,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Autentikasi gagal");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", "token-" + data.user.id);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userRole", data.user.role);

      navigate(
        data.user.role === "librarian"
          ? "/dashboard-librarian"
          : "/dashboard-member"
      );
    } catch (error) {
      alert(error.message);
    } finally {
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
