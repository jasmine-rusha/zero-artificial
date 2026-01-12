"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agree, setAgree] = useState(false);

  const passwordValid =
    /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password);

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const formValid =
    firstName &&
    lastName &&
    email &&
    passwordValid &&
    passwordsMatch &&
    agree;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) return;
    router.push(`/verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="page-wrapper">
      <div className="auth-card">

        <div className="auth-left">
          <div className="brand">
            <div className="logo">🌿</div>
            <h2>Zero Artificial</h2>
            <p>We Serve Wild</p>
          </div>
        </div>

        <div className="auth-right">
          <h1>Activate Your Account</h1>

          <form className="signup-form" onSubmit={handleSubmit}>

            {/* First & Last Name */}
            <div className="row">
              <div>
                <label>First Name</label>
                <input
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Last Name</label>
                <input
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-btn"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
                      -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 3l18 18" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M6.223 6.223A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7
                      a9.958 9.958 0 01-4.132 5.303" />
                  </svg>
                )}
              </button>
            </div>

            {!passwordValid && password.length > 0 && (
              <div className="error-text">
                Password must be at least 8 characters and include a special character
              </div>
            )}

            {/* Confirm Password */}
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
               <button
                type="button"
               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="eye-btn"
              aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? (
                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
                      -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 3l18 18" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M6.223 6.223A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7
                      a9.958 9.958 0 01-4.132 5.303" />
                  </svg>
                )}
              </button>
            </div>

            {confirmPassword.length > 0 && !passwordsMatch && (
              <div className="error-text">
                Passwords do not match
              </div>
            )}

            {/* Terms */}
            <div className="checkbox">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>
                I agree to the <a href="#">Terms & Conditions</a> and{" "}
                <a href="#">Privacy Policy</a>
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="primary-btn"
              disabled={!formValid}
            >
              Create account
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
