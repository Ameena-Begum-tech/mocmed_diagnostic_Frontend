import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔥 correct usage (top level)

  const [form, setForm] = useState({
    loginId: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
      );

      // Save token + role into AuthContext
      login(res.data.token, res.data.role);

      // redirect to home
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#0A7DCF]">
          Patient Login
        </h2>

        <input
          type="text"
          name="loginId"
          placeholder="Username / Email / Phone"
          className="w-full border p-3 rounded-lg"
          value={form.loginId}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#0A7DCF] text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
        <Link
          to="/forgot-password"
          className="text-sm text-blue-600 text-center block"
        >
          Forgot Password?
        </Link>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
