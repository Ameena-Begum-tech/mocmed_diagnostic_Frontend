import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  const [form, setForm] = useState({
    loginId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form
      );

      await login(res.data.token, res.data.role);

      navigate("/", { replace: true });
    } catch (err) {
      const message =
        (err as any)?.response?.data?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-96 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-[#0A7DCF]">
          Patient Login
        </h2>

        <input
          type="text"
          name="loginId"
          placeholder="Username / Email / Phone"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7DCF]"
          value={form.loginId}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A7DCF]"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-[#0A7DCF] hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
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
