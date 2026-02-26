// Language: TypeScript (React)

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
const userId = state?.userId;
const email = state?.email;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // resend timer
  const [timer, setTimer] = useState(30);

  // countdown logic
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ================= VERIFY RESET OTP =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-reset-otp`,
        { userId, otp }
      );

      navigate("/new-password", { state: { userId } });

    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  // ================= RESEND RESET OTP =================
  const handleResendOtp = async () => {
    setError("");
    setSuccess("");

    try {
     await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
  { email }
);

      setSuccess("OTP resent successfully");
      setTimer(30);

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  // ================= UI =================
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#0A7DCF]">
          Verify Reset OTP
        </h2>

        <input
          type="text"
          
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full border p-3 rounded-lg text-center text-lg tracking-widest"
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setOtp(value);
            setError("");
            setSuccess("");
          }}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={otp.length !== 6}
          className={`w-full py-3 rounded-lg transition ${
            otp.length !== 6
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#0A7DCF] text-white hover:bg-blue-700"
          }`}
        >
          Verify OTP
        </button>

        {/* RESEND BUTTON */}
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

export default ResetOtp;
