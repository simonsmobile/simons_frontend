import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Notiflix from "notiflix";
import axios from "axios";
import env from "../configs/env";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../configs/Firebase";
import { FaGoogle } from "react-icons/fa";

const CreateAccount = () => {
  const location = useLocation();
  const googleData = location.state || {};

  const [email, setEmail] = useState(
    googleData.email || localStorage.getItem("username") || ""
  );
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState(googleData.firstName || "");
  const [lastName, setLastName] = useState(googleData.lastName || "");
  const [university, setUniversity] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const universities = [
    "University of Maia",
    "Università degli Studi della Campania Luigi Vanvitelli",
    "University of Eastern Finland",
    "Vilnius College - Faculty of Technologies and Design",
    "University of Patras",
  ];

  useEffect(() => {
    if (firstName || lastName) {
      setFullName(`${firstName} ${lastName}`.trim());
    }
  }, [firstName, lastName]);

  const checkPasswordStrength = (password) => {
    if (!password) return 0;

    let score = 0;
    // Length check
    if (password.length >= 8) score++;
    // Contains lowercase
    if (/[a-z]/.test(password)) score++;
    // Contains uppercase
    if (/[A-Z]/.test(password)) score++;
    // Contains numbers
    if (/[0-9]/.test(password)) score++;
    // Contains special characters
    if (/[\W_]/.test(password)) score++;

    return score;
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

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordStrength(checkPasswordStrength(password));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return re.test(String(password));
  };

  const validateContact = (contact) => {
    return contact.length === 10;
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const generateOTP = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const sendOTP = async (mobile, code) => {
    const message = `Your OTP code is ${code}.`;
    await fetch(
      `https://app.notify.lk/api/v1/send?user_id=23201&api_key=aElC8iVmQG05Aqk60tWj&sender_id=NotifyDEMO&to=+94${mobile.substring(
        1
      )}&message=${message}`
    ).then((response) => {
      console.log(response);
    });
  };

  const submitOTP = async (otp) => {
    try {
      const response = await fetch(env.SERVER_URL + "/auth/account-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        Notiflix.Notify.success("OTP was sent to your email");
      } else {
        const error = await response.json();
        Notiflix.Notify.failure(error.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("Server error");
    }
  };

  const onGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const email = data.user.email;
        const displayName = data.user.displayName || "";

        try {
          const response = await fetch(`${env.SERVER_URL}/auth/google-auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, displayName }),
          });

          const result = await response.json();

          if (response.ok) {
            if (result.exists) {
              Notiflix.Notify.info("Account already exists. Please login.");
              navigate("/login");
            } else {
              setEmail(email);

              if (displayName) {
                const nameParts = displayName.split(" ");
                setFirstName(nameParts[0] || "");
                setLastName(nameParts.slice(1).join(" ") || "");
              }

              localStorage.setItem("username", email);
              Notiflix.Notify.success(
                "Please complete your profile information"
              );
            }
          } else {
            Notiflix.Notify.failure(result.message || "Authentication failed");
          }
        } catch (error) {
          console.error(error);
          Notiflix.Notify.failure("Server error");
        }
      })
      .catch((error) => {
        console.error("Google Sign Up Error:", error);
        Notiflix.Notify.failure("Google sign-up failed");
      });
  };

  const validateForm = () => {
    if (!email || !validateEmail(email)) {
      setFormError("Please enter a valid email address");
      return false;
    }

    if (!firstName || !lastName) {
      setFormError("Please enter your first and last name");
      return false;
    }

    if (!dob) {
      setFormError("Please enter your date of birth");
      return false;
    }

    if (!gender) {
      setFormError("Please select your gender");
      return false;
    }

    if (!country) {
      setFormError("Please enter your country");
      return false;
    }

    if (!password || !validatePassword(password)) {
      setFormError(
        "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character"
      );
      return false;
    }

    if (password !== retypePassword) {
      setFormError("Passwords do not match");
      return false;
    }

    if (!agreement) {
      setFormError("You must accept the agreement");
      return false;
    }

    setFormError("");
    return true;
  };

  const submitAction = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);

    axios
      .post(`${env.SERVER_URL}/auth/register`, {
        email: email,
        password: password,
        fullName: fullName,
        address: address,
        dob: dob,
        age: age,
        gender: gender,
        country: country,
        firstName: firstName,
        lastName: lastName,
        university,
        universityId: universityId,
        placeholder: contactNumber,
      })
      .then((response) => {
        const otp = generateOTP();
        submitOTP(otp);
        localStorage.setItem("username", email);
        localStorage.setItem("passed", "Not Passed");
        localStorage.setItem("otp", otp);
        Notiflix.Notify.success("Account created successfully!");
        navigate("/validation");
      })
      .catch((error) => {
        Notiflix.Notify.failure(
          error.response?.data?.message || "Account creation failed"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-2/3 h-32 bg-amber-300 rounded-bl-full"></div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 mb-2">
        <div className="flex items-center">
          <Link to="/" className="text-gray-800">
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
            Create Account
          </h1>
          <div className="w-6"></div>
        </div>
      </div>
      <div className="flex-1 px-4 py-6 mt-12">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-3 shadow-md">
            <img
              src={`${process.env.PUBLIC_URL}/images/Picturec.png`}
              alt="SIMOnS Logo"
              className="h-16 w-16"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 py-6 mt-3">
          <div className="max-w-md mx-auto">
            {formError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                {formError}
              </div>
            )}

            <p className="text-center text-gray-600 mb-6">Join with Us</p>

            <button
              onClick={onGoogleSignUp}
              className="w-full mb-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
            >
              <FaGoogle className="text-red-500 mr-2" />
              Sign up with Google
            </button>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 w-full"></div>
              <div className="bg-white px-3 text-sm text-gray-500 absolute">
                OR
              </div>
            </div>

            <form onSubmit={submitAction} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type={dob ? "date" : "text"}
                    placeholder="Date of Birth"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    value={dob || ""}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => {
                      if (!dob) e.target.type = "text";
                    }}
                    onChange={(e) => {
                      setDob(e.target.value);
                      setAge(calculateAge(e.target.value));
                    }}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Age"
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                    value={age}
                    readOnly
                  />
                </div>
              </div>

              <div>
                <select
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none bg-white"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div>
                <select
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none bg-white"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                >
                  <option value="" disabled>
                    Select University (Optional)
                  </option>
                  {universities.map((uni, index) => (
                    <option key={index} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 pr-10"
                    value={password}
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

                <div className="flex-1 relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 pr-10"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
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
              </div>

              {password && (
                <div className="mt-2 mb-4 w-full">
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
                          /[A-Z]/.test(password)
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {/[A-Z]/.test(password) ? "✓" : "○"}
                      </span>
                      <span className="text-gray-600">Uppercase letter</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span
                        className={`mr-1 ${
                          /[a-z]/.test(password)
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {/[a-z]/.test(password) ? "✓" : "○"}
                      </span>
                      <span className="text-gray-600">Lowercase letter</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span
                        className={`mr-1 ${
                          /[0-9]/.test(password)
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {/[0-9]/.test(password) ? "✓" : "○"}
                      </span>
                      <span className="text-gray-600">Number</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span
                        className={`mr-1 ${
                          /[\W_]/.test(password)
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {/[\W_]/.test(password) ? "✓" : "○"}
                      </span>
                      <span className="text-gray-600">Special character</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <span
                        className={`mr-1 ${
                          password.length >= 8
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {password.length >= 8 ? "✓" : "○"}
                      </span>
                      <span className="text-gray-600">8+ characters</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3 py-2">
                <input
                  type="checkbox"
                  id="agreement"
                  className="mt-1 h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                />
                <label htmlFor="agreement" className="text-sm text-gray-700">
                  I accept the agreement and privacy policy
                </label>
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
                  "Sign up"
                )}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-black font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full relative">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-200 rounded-tr-full opacity-50"></div>
      </div>
    </div>
  );
};

export default CreateAccount;
