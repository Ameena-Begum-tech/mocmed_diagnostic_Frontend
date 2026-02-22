import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
const navigate = useNavigate();
const { login } = useAuth();

const [phone, setPhone] = useState("");
const [otp, setOtp] = useState("");
const [confirmation, setConfirmation] = useState<any>(null);
const [loading, setLoading] = useState(false);
const [step, setStep] = useState(1);
const [error, setError] = useState("");

// Initialize reCAPTCHA
useEffect(() => {
if (!window.recaptchaVerifier) {
window.recaptchaVerifier = new RecaptchaVerifier(
auth,
"recaptcha-container",
{ size: "invisible" }
);
window.recaptchaVerifier.render();
}
}, []);

// Send OTP
const sendOtp = async () => {
try {
setError("");
setLoading(true);

```
  const formattedPhone = "+91" + phone.replace(/\D/g, "");

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    formattedPhone,
    window.recaptchaVerifier
  );

  setConfirmation(confirmationResult);
  setStep(2);
} catch (err) {
  setError("Failed to send OTP");
} finally {
  setLoading(false);
}
```

};

// Verify OTP
const verifyOtp = async () => {
try {
setLoading(true);
const result = await confirmation.confirm(otp);

```
  const idToken = await result.user.getIdToken();

  // send token to backend
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/phone-auth`,
    { token: idToken }
  );

  login(res.data.token, res.data.role);
  navigate("/", { replace: true });

} catch (err) {
  setError("Invalid OTP");
} finally {
  setLoading(false);
}
```

};

return ( <div className="flex justify-center items-center min-h-screen bg-gray-100"> <div className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4">

```
    <h2 className="text-2xl font-bold text-center text-[#0A7DCF]">
      Phone Login
    </h2>

    {step === 1 ? (
      <>
        <input
          type="tel"
          placeholder="Enter phone number"
          className="w-full border p-3 rounded-lg"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          onClick={sendOtp}
          disabled={loading}
          className="w-full bg-[#0A7DCF] text-white py-3 rounded-lg"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </>
    ) : (
      <>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border p-3 rounded-lg"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </>
    )}

    {error && <p className="text-red-500 text-sm">{error}</p>}

    <div id="recaptcha-container"></div>

  </div>
</div>
```

);
};

export default Login;
