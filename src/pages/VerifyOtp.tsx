// Language: TypeScript (React)

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ⭐ NEW — resend timer
  const [timer, setTimer] = useState(30);

  // ⭐ countdown logic
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ================= VERIFY OTP =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        { userId, otp }
      );

      setSuccess("Account verified successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  // ================= RESEND OTP =================
  const handleResendOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resend-otp`,
        { userId }
      );

      setSuccess("OTP resent successfully");
      setTimer(30); // restart timer
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#0A7DCF]">
          Verify Email
        </h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border p-3 rounded-lg text-center text-lg tracking-widest"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-[#0A7DCF] text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Verify Account
        </button>

        {/* ⭐ RESEND BUTTON */}
        <button
          type="button"
          disabled={timer > 0}
          onClick={handleResendOtp}
          className={`w-full py-2 rounded-lg text-sm ${
            timer > 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
