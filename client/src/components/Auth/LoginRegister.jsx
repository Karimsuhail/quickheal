import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    gender: "",
    specialization: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "email") {
      validateEmail(value);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email && !emailPattern.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const toggleRole = () => {
    setIsDoctor(!isDoctor);
    setFormData({ ...formData, role: isDoctor ? "patient" : "doctor" });
  };

  const toggleLoginRegister = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "patient",
      gender: "",
      specialization: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !emailError &&
      formData.name &&
      formData.email &&
      formData.password &&
      (!isLogin || (formData.gender && (!isDoctor || formData.specialization)))
    ) {
      console.log(formData);
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg text-center lg:pr-8 mb-6 lg:mb-0">
        <h1 className="text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent animate__animated animate__fadeInLeft">
          Welcome to Quickheal
        </h1>
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeInRight">
        <h2 className="text-xl lg:text-2xl font-semibold text-center mb-4">
          {isLogin
            ? `${isDoctor ? "Doctor" : "Patient"} Login`
            : `${isDoctor ? "Doctor" : "Patient"} Register`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="w-full p-2 border rounded-md"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    checked={formData.gender === "male"}
                    required
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                    checked={formData.gender === "female"}
                    required
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
          )}

          {/* Specialization Field for Doctor Registration */}
          {!isLogin && isDoctor && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                onChange={handleChange}
                value={formData.specialization}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your specialization"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-2 border rounded-md"
              placeholder="Email"
              required
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full p-2 border rounded-md"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 mt-2.5 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              disabled={emailError}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center mt-4">
          <button
            type="button"
            onClick={toggleLoginRegister}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {isLogin
              ? "Don't have an account? Register here"
              : "Already have an account? Login here"}
          </button>
        </div>

        {isLogin && (
          <div className="text-sm text-center mt-4">
            <button
              type="button"
              onClick={toggleRole}
              className="w-auto px-4 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none transition-all duration-300"
            >
              {isDoctor ? "Switch to Patient" : "Switch to Doctor"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
