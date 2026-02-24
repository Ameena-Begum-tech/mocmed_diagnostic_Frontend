// Language: TypeScript (React)

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  // ⭐ OTP as ARRAY (6 boxes)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
console.log("NEW VERIFY OTP PAGE LOADED");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [timer, setTimer] = useState(30);

  // ================= TIMER =================
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ⭐ JOIN OTP
  const finalOtp = otp.join("");

  // ================= OTP INPUT HANDLERS =================
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    setError("");
    setSuccess("");

    // auto move forward
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  // ================= VERIFY OTP =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        { userId, otp: finalOtp }
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
      setTimer(30);
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

        {/* ⭐ OTP BOX GRID */}
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border rounded-lg text-xl"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        {/* ⭐ VERIFY BUTTON */}
        <button
          type="submit"
          disabled={finalOtp.length !== 6}
          className={`w-full py-3 rounded-lg transition ${
            finalOtp.length !== 6
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#0A7DCF] text-white hover:bg-blue-700"
          }`}
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
