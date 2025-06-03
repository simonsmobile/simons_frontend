import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import env from "../configs/env";

const ResetPasswordScreen = () => {
  const toast = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return re.test(String(password));
  };

  const checkPasswordStrength = (password) => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;
    return score;
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordStrength(checkPasswordStrength(password));
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    if (passwordStrength === 4) return "Strong";
    return "Very Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    if (passwordStrength === 4) return "bg-green-500";
    return "bg-green-600";
  };

  const getPasswordStrengthWidth = () => {
    return `${(passwordStrength / 5) * 100}%`;
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.trim() === "") {
      toast.error("Password cannot be empty");
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(env.SERVER_URL + "/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: newPassword }),
      });

      if (response.ok) {
        toast.success("Password reset successful");

        document.getElementById("success-animation").classList.remove("hidden");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="flex flex-col min-h-screen bg-white p-4">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 max-w-md w-full">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p>
                Missing email information. Please go back to the forgot password
                page.
              </p>
            </div>
          </div>
          <Link
            to="/forgot-password"
            className="px-4 py-2 bg-black text-white rounded-md shadow-sm hover:bg-gray-800 transition-colors"
          >
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top design element */}
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 mb-12">
        <div className="flex items-center">
          <Link to="/forgot-password" className="text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-center flex-1">
            Reset Password
          </h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 mt-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
          </div>

          {/* Success animation - hidden by default */}
          <div
            id="success-animation"
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50 hidden"
          >
            <div className="bg-white rounded-lg shadow-xl p-6 transform transition-all scale-100 animate-bounce">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-center text-lg font-medium text-gray-900">
                Password Reset Successful!
              </p>
              <p className="text-center text-sm text-gray-600 mt-1">
                Redirecting to login...
              </p>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Create New Password
            </h2>
            <p className="text-gray-600 text-sm">
              Your new password must be different from previous passwords.
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create new password"
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {newPassword && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-700">
                      Password Strength
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: passwordStrength >= 3 ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`${getPasswordStrengthColor()} h-1.5 rounded-full transition-all duration-300`}
                      style={{ width: getPasswordStrengthWidth() }}
                    ></div>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-y-1 gap-x-2">
                    <div className="flex items-center text-xs">
                      <span
                        className={`mr-1 ${
                          /[A-Z]/.test(newPassword)
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {/[A-Z]/.test(newPassword) ? "✓" : "○"}
                      </span>
                      <span className="text-gray-600">Uppercase letter</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span
                        className={`mr-1 ${
                          /[a-z]/.test(newPassword)
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {/[a-z]/.test(newPassword) ? "✓" : "○"}
                      </span>
                      <span className="text-gray-600">Lowercase letter</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span
                        className={`mr-1 ${
                          /[0-9]/.test(newPassword)
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {/[0-9]/.test(newPassword) ? "✓" : "○"}
                      </span>
                      <span className="text-gray-600">Number</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span
                        className={`mr-1 ${
                          /[\W_]/.test(newPassword)
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {/[\W_]/.test(newPassword) ? "✓" : "○"}
                      </span>
                      <span className="text-gray-600">Special character</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span
                        className={`mr-1 ${
                          newPassword.length >= 8
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {newPassword.length >= 8 ? "✓" : "○"}
                      </span>
                      <span className="text-gray-600">8+ characters</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {confirmPassword && (
                <div className="mt-1 flex items-center">
                  <span
                    className={`mr-1 ${
                      confirmPassword === newPassword
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {confirmPassword === newPassword ? "✓" : "✗"}
                  </span>
                  <span
                    className={`text-xs ${
                      confirmPassword === newPassword
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {confirmPassword === newPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3 font-medium rounded-md shadow-md transition-colors duration-300 ${
                passwordStrength >= 4 && confirmPassword === newPassword
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={
                passwordStrength < 4 ||
                confirmPassword !== newPassword ||
                loading
              }
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-black font-medium hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom design element */}
      <div className="w-full relative">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
