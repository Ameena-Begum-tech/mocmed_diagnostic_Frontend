import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.userId;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/verify-reset-otp", {
        userId,
        otp,
      });

      navigate("/new-password", { state: { userId } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border p-3 rounded"
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-blue-600 text-white py-3 rounded">
          Verify
        </button>
      </form>
    </div>
  );
};

export default ResetOtp;
