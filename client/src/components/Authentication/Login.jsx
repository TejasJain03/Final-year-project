import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import apiHandler from "../../utils/apiHandler";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginApiCall = async () => {
    console.log(formData)
    console.log("first")
    const response = await axios.post("/auth/login", formData);
    console.log(response)
    if (response.data.success) {
      localStorage.setItem("authenticated", true);
      toast.success(response.data.message, {
        onClose: () => navigate("/"), // Navigate after toast is closed
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler(loginApiCall, navigate)();
  };

  const handleGoogleLogin = () => {
    const googleAuthURL = `http://localhost:8081/auth/google`;
    window.location.href = googleAuthURL;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-lg lg:max-w-xl">
        <h1 className="font-bold text-center text-3xl mb-6">Login</h1>
        <div className="bg-white shadow w-full rounded-lg">
          <form onSubmit={handleSubmit} className="px-5 py-7">
            {/* Email Field */}
            <label className="font-semibold text-lg text-gray-600 pb-1 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 mt-1 mb-5 text-lg w-full"
              placeholder="Enter your email"
              required
            />

            {/* Password Field */}
            <label className="font-semibold text-lg text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 mt-1 mb-2 text-lg w-full"
              placeholder="Enter your password"
              required
            />

            {/* Forgot Password Link */}
            <div className="text-right mb-5">
              <a
                href="#forgot-password"
                className="transition duration-200 text-blue-500 underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button className="px-8 py-3 rounded-md bg-blue-500 text-white font-bold transition duration-200 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500 text-lg">
                <span className="inline-block mr-2">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Divider with OR */}
          <div className="flex items-center py-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-gray-600">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Sign In Button */}
          <div className="py-5 flex justify-center">
            <button
              className="transition duration-200 bg-black hover:bg-gray-800 focus:bg-gray-900 focus:shadow-sm focus:ring-4 focus:ring-gray-700 focus:ring-opacity-50 text-white px-4 py-3 rounded-lg text-lg shadow-sm hover:shadow-md font-semibold text-center inline-flex items-center justify-center"
              onClick={handleGoogleLogin}
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-3" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>

        {/* Optional Footer */}
        <div className="py-5">
          <div className="flex justify-center">
            <div className="text-center sm:text-left whitespace-nowrap">
              <span className="text-lg">
                No account?{" "}
                <Link
                  to="/auth/register"
                  className="transition duration-200 py-4 cursor-pointer font-normal text-sm md:text-lg rounded-lg text-blue-500 hover:underline focus:bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  Create Account
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
