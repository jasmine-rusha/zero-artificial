"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const OTP_LENGTH = 4;
  const CORRECT_OTP = "1234"; // mock OTP for validation

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your@email.com";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  /* ---------------- EMAIL MASK ---------------- */
  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    if (!domain) return email;
    return `${name[0]}***@${domain}`;
  };

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  /* ---------------- BACKSPACE ---------------- */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  /* ---------------- PASTE ---------------- */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, i) => {
      if (inputs.current[i]) {
        inputs.current[i]!.value = digit;
      }
    });

    inputs.current[paste.length - 1]?.focus();
  };

  /* ---------------- VERIFY ---------------- */
  const handleVerify = async () => {
    if (otp.includes("")) {
      setError("Please enter the complete code");
      return;
    }

    setLoading(true);
    setError("");

    await new Promise((res) => setTimeout(res, 1500));

    if (otp.join("") !== CORRECT_OTP) {
      setError("Invalid verification code");
      setLoading(false);
      return;
    }

    alert("OTP Verified Successfully ✅");
    setLoading(false);
  };

  /* ---------------- RESEND ---------------- */
  const handleResend = () => {
    if (timer > 0) return;

    setTimer(30);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    inputs.current[0]?.focus();
  };

  return (
    <main className="verify-wrapper">
      <div className="verify-card">
        <div className="verify-logo">🌿</div>

        <h1>Check your email</h1>

        <p className="subtitle">
          We’ve sent a verification code to
          <br />
          <span>{maskEmail(email)}</span>
        </p>

        <div className="otp-group">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              maxLength={1}
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        {error && <p className="error-text">{error}</p>}

        <button
          className="verify-btn"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>

        <p className="resend">
          Didn’t receive the email?
          <span
            onClick={handleResend}
            style={{ opacity: timer > 0 ? 0.5 : 1 }}
          >
            {timer > 0 ? ` Resend in ${timer}s` : " Click to resend"}
          </span>
        </p>

        <a href="/login" className="back-link">
          ← Back to log in
        </a>
      </div>
    </main>
  );
}
