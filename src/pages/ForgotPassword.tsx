import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });

      navigate("/reset-otp", { state: { userId: res.data.userId } });

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-blue-600 text-white py-3 rounded">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
