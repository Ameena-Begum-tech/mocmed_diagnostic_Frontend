import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.userId;

  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/auth/reset-password", { userId, password });

    setSuccess("Password reset successful");

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Set New Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button className="w-full bg-green-600 text-white py-3 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
