import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import env from "../configs/env";
import { useTranslation } from 'react-i18next';
import '../i18n'; // Ensure i18n is initialized
import { FaChevronLeft } from "react-icons/fa";


const ForgotPasswordScreen = () => {
  const toast = useToast(); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [inputOTP, setInputOTP] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const generateOTP = () => {
    let otp = Math.floor(10000 + Math.random() * 90000).toString();
    setOtp(otp);
    localStorage.setItem("otp", otp);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleInputChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOTP = [...inputOTP];
    newOTP[index] = value;
    setInputOTP(newOTP);

    if (value.length === 1 && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (inputOTP[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    if (/^\d+$/.test(pastedData) && pastedData.length <= 5) {
      const digits = pastedData.split("");
      const newOTP = [...inputOTP];

      digits.forEach((digit, index) => {
        if (index < 5) {
          newOTP[index] = digit;
        }
      });

      setInputOTP(newOTP);

      if (digits.length < 5 && inputRefs.current[digits.length]) {
        inputRefs.current[digits.length].focus();
      }
    }
  };

  const submitAction = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    setLoading(true);

    let gotp = Math.floor(10000 + Math.random() * 90000).toString();
    setOtp(gotp);
    try {
      const response = await fetch(env.SERVER_URL + "/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: gotp }),
      });

      if (response.ok) {
        setSent(true);
        generateOTP();
        toast.success(t('code_was_sent'));

        setTimeout(() => {
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 300);
      } else {
        const error = await response.json();
        toast.error(error.message || t('failed_to_send') + "Failed to send Code");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = () => {
    const enteredOTP = inputOTP.join("");

    if (enteredOTP.length !== 5) {
      toast.error("Please enter a complete 5-digit Code");
      return;
    }

    if (enteredOTP === otp) {
      toast.success("Code verified");
      navigate("/reset-password", { state: { email } });
    } else {
      toast.error("Invalid Code");

      inputRefs.current.forEach((input) => {
        if (input) {
          input.classList.add("animate-shake");
          setTimeout(() => {
            input.classList.remove("animate-shake");
          }, 500);
        }
      });
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;

    setLoading(true);
    let newOtp = Math.floor(10000 + Math.random() * 90000).toString();
    setOtp(newOtp);

    try {
      const response = await fetch(env.SERVER_URL + "/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: newOtp }),
      });

      if (response.ok) {
        generateOTP();
        setInputOTP(["", "", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
        toast.success("New Code was sent to your email");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to send Code");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top design element */}
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 mb-12">
        <div className="flex items-center">
          <Link to="/login" className="text-gray-800">
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
            {t("forgot_password")}
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {t("forgot_your_password")}
            </h2>
            <p className="text-gray-600 text-sm">
              {!sent
                ? t('forgot_password_text')
                : t("code_sent", {email})}
            </p>
          </div>

          {!sent ? (
            <form onSubmit={submitAction} className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                 {t("email")}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={t("email_instruction")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  t("send_code")
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-3 text-center"
                >
                  {t('enter_verification')}
                </label>

                <div className="flex justify-center space-x-2 mb-2">
                  {inputOTP.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <div className="h-1 bg-gray-200 w-1/2 rounded-full mt-2">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          (inputOTP.filter((d) => d !== "").length / 5) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <button
                onClick={verifyOtp}
                className="w-full py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none"
              >
               {t('verify_code')}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">
                  {t('did_not_receive')}
                </p>
                <button
                  onClick={handleResendOTP}
                  disabled={timer > 0 || loading}
                  className={`text-sm font-medium inline-flex items-center ${
                    timer > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-black hover:underline"
                  }`}
                >
                  {timer > 0 && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {timer > 0 ? t('resend_in_seconds', {timer}) : t('resend_code')}
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              {t("remember_password")}{" "}
              <Link
                to="/login"
                className="text-black font-medium hover:underline"
              >
                {t("back_to_login")}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom design element */}
      <div className="w-full relative">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>

      {/* Add shake animation for invalid OTP */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordScreen;
