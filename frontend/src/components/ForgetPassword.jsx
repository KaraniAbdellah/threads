import React, { useState } from "react";
import axios from "axios";
import ChangePasswordSchema from "../YupSchema/ChangePasswordSchma";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [formState, setFormState] = useState("email");
  const [email, setEmail] = useState("");
  const [CodeOPT, setCodeOPT] = useState({ one: 0, two: 0, three: 0, four: 0 });
  const [newPassword, setNewPassword] = useState({
    new_password: "",
    confirm_password: "",
  });

  const CheckEmail = async (e) => {
    e.preventDefault();
    console.log("Search To Emaiil");
    await axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/check_email`, {
        email: email,
      })
      .then((res) => {
        console.log("email: ", res);
        setEmail(() => res.data.email);
        setFormState(() => "code_opt");
      })
      .catch((error) => {
        toast.error("User Not Found", {
          duration: 2000,
          position: "bottom-right",
        });
      });
  };

  const ResendOPTCode = async () => {
    console.log("Resend OPT code");
    setNewPassword(true);
    setFormState(() => "password");
  };

  const CheckOPTCode = async (e) => {
    e.preventDefault();
    console.log("Send OPT code to email");
  };

  const ChangePassword = async (e) => {
    e.preventDefault();
    try {
      ChangePasswordSchema.validateSync(newPassword);
      console.log("Change The Password Succefully");
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

  return (
    <div className="min-h-screen w-full bg-zinc-900 flex justify-center items-center p-6">
      {formState === "email" ? (
        <div className="bg-zinc-800 p-8 rounded-2xl shadow-2xl text-center w-full max-w-md border border-zinc-700">
          <h1 className="text-yellow-400 text-3xl font-extrabold mb-6">
            Enter Your Email
          </h1>
          <form onSubmit={CheckEmail} className="space-y-5">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4 bg-zinc-700 placeholder-yellow-400 text-yellow-100 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              placeholder="example@email.com"
            />
            <input
              type="submit"
              value="Search"
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-bold rounded-lg shadow hover:shadow-md transition-all cursor-pointer"
            />
          </form>
        </div>
      ) : formState === "code_opt" ? (
        <div className="bg-zinc-800 p-8 rounded-2xl shadow-2xl text-center w-full max-w-md border border-zinc-700">
          <h1 className="text-yellow-400 text-xl font-bold mb-6">
            Enter the code sent to{" "}
            <span className="text-yellow-300 font-medium">{email}</span>
          </h1>
          <form onSubmit={(e) => CheckOPTCode(e)} className="space-y-5">
            <div className="flex justify-between gap-3 mb-4">
              <input
                value={CodeOPT.one}
                onChange={(e) =>
                  setCodeOPT({ ...CodeOPT, one: e.target.value })
                }
                type="text"
                maxLength={1}
                className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold bg-zinc-700 text-yellow-300 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
              <input
                value={CodeOPT.two}
                onChange={(e) =>
                  setCodeOPT({ ...CodeOPT, two: e.target.value })
                }
                type="text"
                maxLength={1}
                className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold bg-zinc-700 text-yellow-300 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
              <input
                value={CodeOPT.three}
                onChange={(e) =>
                  setCodeOPT({ ...CodeOPT, three: e.target.value })
                }
                type="text"
                maxLength={1}
                className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold bg-zinc-700 text-yellow-300 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
              <input
                value={CodeOPT.four}
                onChange={(e) =>
                  setCodeOPT({ ...CodeOPT, four: e.target.value })
                }
                type="text"
                maxLength={1}
                className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold bg-zinc-700 text-yellow-300 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-bold rounded-lg shadow hover:shadow-md transition-all cursor-pointer"
            />
            <p
              onClick={() => ResendOPTCode()}
              className="text-yellow-400 hover:underline cursor-pointer text-sm mt-2"
            >
              Resend Code
            </p>
          </form>
        </div>
      ) : (
        <div className="bg-zinc-800 p-6 rounded-xl shadow-xl w-full max-w-md border border-zinc-700">
          <h2 className="text-yellow-400 text-2xl font-bold mb-4 text-center">
            Change Password
          </h2>
          <form onSubmit={(e) => ChangePassword(e)} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword.new_password}
              onChange={(e) =>
                setNewPassword({ ...newPassword, new_password: e.target.value })
              }
              className="w-full py-3 px-4 bg-zinc-700 text-yellow-100 placeholder-yellow-400 rounded border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={newPassword.confirm_password}
              onChange={(e) =>
                setNewPassword({
                  ...newPassword,
                  confirm_password: e.target.value,
                })
              }
              className="w-full py-3 px-4 bg-zinc-700 text-yellow-100 placeholder-yellow-400 rounded border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-bold rounded transition-all cursor-pointer"
            >
              Change Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
