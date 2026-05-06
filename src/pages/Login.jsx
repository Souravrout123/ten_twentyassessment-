import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const navigate = useNavigate();



const handleLogin = (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please enter email and password");
    return;
  }

  if (email === "admin@example.com" && password === "123456") {
    sessionStorage.setItem("token", "dummy-token-123");

    navigate("/dashboard"); 
  } else {
    setError("Invalid credentials");
  }
};

  return (
    <div className="flex min-h-[100vh] flex-col md:flex-row">
      
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-start md:items-center justify-center px-4 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm mx-auto"
        >
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Welcome back
          </h1>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs text-gray-600">Email</label>
            <div className="flex items-center border rounded-md px-3 py-2 mt-1 bg-white">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-xs text-gray-600">Password</label>
            <div className="flex items-center border rounded-md px-3 py-2 mt-1 bg-white">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-5 text-xs text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <span className="cursor-pointer text-blue-600 hover:underline">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-full md:w-1/2 bg-blue-600 text-white items-center justify-center px-8 py-10">
        <div className="max-w-sm text-left">
          <h2 className="text-3xl font-semibold mb-4">ticktock</h2>

          <p className="text-sm text-blue-100 leading-relaxed">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours.
            Track attendance and productivity from anywhere, anytime using
            any internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}