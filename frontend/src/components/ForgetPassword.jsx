import React, { useState } from "react";
import axios from "axios";
import ChangePasswordSchema from "../YupSchema/ChangePasswordSchma";
import toast from "react-hot-toast";
import { GeneratePassword } from "js-generate-password";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";

const ForgetPassword = () => {
  const [formState, setFormState] = useState("email");
  const [email, setEmail] = useState("");
  const [CodeOPT, setCodeOPT] = useState(0);
  const [newPassword, setNewPassword] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [action, setAction] = useState(false);
  const [generated_opt_code, setGenerated_opt_code] = useState(0);
  const navigate = useNavigate();

  const CheckEmail = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/auth/check_email`, {
          email: email,
        })
        .then((res) => {
          setEmail(() => res.data.email);
          setFormState(() => "code_opt");
          setAction(() => true);
          const generated_opt_code = GetOPTCode();
          setGenerated_opt_code(generated_opt_code);
          SendCodeToEmail(generated_opt_code);
          toast.success("User Found", {
            duration: 2000,
            position: "bottom-right",
          });
        })
        .catch((error) => {
          toast.error("Can Not Find User", {
            duration: 2000,
            position: "bottom-right",
          });
        });
    } catch (error) {
      toast.error("Something went wrong, please try again", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const ResendOPTCode = async () => {
    const generated_opt_code = GetOPTCode();
    setGenerated_opt_code(generated_opt_code);
    SendCodeToEmail(generated_opt_code);
  };

  async function SendCodeToEmail(OPTCode) {
    const message = "Hello " + email + " Here is your reset code " + OPTCode;
    const subject = "Rest Password";

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forget_password`,
        { email: email, message: message, subject: subject }
      );
      
      toast.success("Code Sent Successfully", {
        duration: 2000,
        position: "bottom-right",
      });
    } catch (error) {
      toast.error("Something went wrong, please try again", {
        duration: 2000,
        position: "bottom-right",
      });
      
    }
  }

  function GetOPTCode() {
    return GeneratePassword({
      length: 4,
      numbers: true,
      symbols: false,
      uppercase: false,
      lowercase: false,
    });
  }

  const CheckOPTCode = async (e) => {
    e.preventDefault();
    if (CodeOPT == generated_opt_code) {
      
      setFormState(() => "password");
    } else {
      toast.error("Incorrect code", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const ChangePassword = async (e) => {
    e.preventDefault();
    try {
      ChangePasswordSchema.validateSync(newPassword);
      
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/auth/change_password`, {
          email: email,
          new_password: newPassword.new_password,
        })
        .then((res) => {
          toast.success("Password Changed successfully", {
            duration: 2000,
            position: "bottom-right",
          });
          navigate("/loading");
          setTimeout(() => {
            navigate("/space");
          }, 3000);
        })
        .catch((error) => {
          toast.error("Failed Update Password", {
            duration: 2000,
            position: "bottom-right",
          });
        });
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  function BackForm() {
    if (formState === "code_opt") {
      setFormState(() => "email");
      setAction(() => false);
    }
    if (formState === "password") {
      setFormState(() => "code_opt");
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex justify-center items-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/5"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Back button */}
        {action && (
          <button
            onClick={BackForm}
            className="absolute -top-16 left-0 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 group"
          >
            <div className="p-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 group-hover:bg-zinc-700/50 transition-all duration-200">
              <FaArrowLeft className="text-sm" />
            </div>
            <span className="text-sm font-medium">Back</span>
          </button>
        )}

        {formState === "email" ? (
          <div className="bg-zinc-800/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-zinc-700/50 w-full max-w-md relative">
            {/* Header with icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-4 shadow-lg">
                <FaEnvelope className="text-zinc-900 text-xl" />
              </div>
              <h1 className="text-yellow-400 text-3xl font-bold mb-2">
                Reset Password
              </h1>
              <p className="text-zinc-400 text-sm">
                Enter your email address to receive a verification code
              </p>
            </div>

            <form onSubmit={CheckEmail} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-yellow-400/60 text-sm" />
                </div>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-4 pl-12 pr-4 bg-zinc-700/50 backdrop-blur-sm placeholder-zinc-400 text-yellow-100 rounded-xl border border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-zinc-900 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 relative overflow-hidden"
              >
                <span className="relative z-10">Send Verification Code</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
              </button>
            </form>
          </div>
        ) : formState === "code_opt" ? (
          <div className="bg-zinc-800/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-zinc-700/50 w-full max-w-md relative">
            {/* Header with icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-4 shadow-lg">
                <FaShieldAlt className="text-zinc-900 text-xl" />
              </div>
              <h1 className="text-yellow-400 text-2xl font-bold mb-2">
                Verify Your Email
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We've sent a 4-digit code to{" "}
                <span className="text-yellow-300 font-medium break-all">{email}</span>
              </p>
            </div>

            <form onSubmit={(e) => CheckOPTCode(e)} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={CodeOPT}
                  onChange={(e) => setCodeOPT(e.target.value)}
                  maxLength={4}
                  className="w-full p-6 text-center text-3xl font-bold bg-zinc-700/50 backdrop-blur-sm text-yellow-300 border border-zinc-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-200 tracking-widest"
                  placeholder="0000"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-zinc-900 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 relative overflow-hidden"
              >
                <span className="relative z-10">Verify Code</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
              </button>

              <div className="text-center">
                <p className="text-zinc-400 text-sm mb-2">Didn't receive the code?</p>
                <button
                  type="button"
                  onClick={ResendOPTCode}
                  className="text-yellow-400 hover:text-yellow-300 font-medium text-sm hover:underline transition-colors duration-200"
                >
                  Resend Code
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-zinc-800/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-zinc-700/50 w-full max-w-md relative">
            {/* Header with icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-4 shadow-lg">
                <FaLock className="text-zinc-900 text-xl" />
              </div>
              <h2 className="text-yellow-400 text-2xl font-bold mb-2">
                Create New Password
              </h2>
              <p className="text-zinc-400 text-sm">
                Choose a strong password to secure your account
              </p>
            </div>

            <form onSubmit={(e) => ChangePassword(e)} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-yellow-400/60 text-sm" />
                </div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword.new_password}
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      new_password: e.target.value,
                    })
                  }
                  className="w-full py-4 pl-12 pr-4 bg-zinc-700/50 backdrop-blur-sm text-yellow-100 placeholder-zinc-400 rounded-xl border border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-200"
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-yellow-400/60 text-sm" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={newPassword.confirm_password}
                  defaultValue=""
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      confirm_password: e.target.value,
                    })
                  }
                  className="w-full py-4 pl-12 pr-4 bg-zinc-700/50 backdrop-blur-sm text-yellow-100 placeholder-zinc-400 rounded-xl border border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-200"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-zinc-900 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 relative overflow-hidden"
              >
                <span className="relative z-10">Update Password</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;