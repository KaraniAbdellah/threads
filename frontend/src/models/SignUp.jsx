import { useState, useContext } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import AuthContext from "../context/AuthContext";
import { IoMdPerson } from "react-icons/io";
import SignUpSchema from "../YupSchema/SignUpShcema";
import axios from 'axios';
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  
  const [setLoginOrSignUp] = useContext(AuthContext);
  const [isLoading, SetLoading] = useState(false);
  
  const apiURL = import.meta.env.VITE_API_URL;
  const UnShowSignUp = () => {
    setLoginOrSignUp("");
  };

  const CreateUser = () => {
    try {
      axios.post(`${apiURL}/api/auth/signup`, formData).then((response) => {
        toast.success("Your Account Created Successfully", {
          duration: 2000,
          position: "bottom-right"
        });

        SetLoading(true);
        setLoginOrSignUp("login");
      }).catch((error) => {
        console.log(error.message);
        let message = "Please enter a valid email. Username must be at least 6 characters and not already taken."; 
        if (error.message == "Network Error") {
          message = error.message; 
        }
        toast.error(message, {
          duration: 4000,
          position: "bottom-right"
        });
      }).finally(() => {
        SetLoading(false);
      });
    } catch (error) {
      toast.error("Something went wrong. Maybe a network error.", {
        duration: 2000,
        position: "bottom-right"
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      SignUpSchema.validateSync(formData);
      CreateUser();
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
        position: "bottom-right"
      });
    }
  };

  if (isLoading) {
    toast.promise("Saving", {
      duration: 2000,
      position: "bottom-right"
    });
  }

  return (
    <div className="absolute w-full z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center min-h-screen bg-black opacity-95">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-zinc-900 text-yellow-300">
        <div className="relative mb-12">
          <button
            onClick={() => UnShowSignUp()}
            className="text-end text-xl absolute right-0 hover:bg-zinc-800 rounded-full p-3"
          >
            <FaXmark />
          </button>
        </div>
        <div className="text-center mb-6">
          <div className="mx-auto mb-2 w-12 h-12 bg-yellow-800 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-700 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-semibold text-yellow-300">
            Create New Account
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-yellow-500">
              <IoMdPerson />
            </div>
            <input
              type="username"
              value={formData.user_name}
              onChange={(e) =>
                setFormData({ ...formData, user_name: e.target.value })
              }
              className="w-full py-3 pl-10 pr-3 bg-zinc-800 placeholder-yellow-500 rounded border border-zinc-700 focus:outline-none focus:border-yellow-500"
              placeholder="username"
              required
            />
          </div>
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-yellow-500">
              <FiMail />
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full py-3 pl-10 pr-3 bg-zinc-800 placeholder-yellow-500 rounded border border-zinc-700 focus:outline-none focus:border-yellow-500"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-yellow-500">
              <FiLock />
            </div>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full py-3 pl-10 pr-3 bg-zinc-800 placeholder-yellow-500 rounded border border-zinc-700 focus:outline-none focus:border-yellow-500"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-yellow-500">
              <FiLock />
            </div>
            <input
              type="password"
              value={formData.confirm_password}
              onChange={(e) =>
                setFormData({ ...formData, confirm_password: e.target.value })
              }
              className="w-full py-3 pl-10 pr-3 bg-zinc-800 placeholder-yellow-500 rounded border border-zinc-700 focus:outline-none focus:border-yellow-500"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:bg-zinc-80 rounded text-yellow-400 font-medium transition-colors"
          >
            Sign up
          </button>
        </form>

        <div className="my-4 flex items-center justify-center">
          <hr className="flex-grow border-t border-zinc-700" />
          <span className="px-3 text-sm text-yellow-400">or</span>
          <hr className="flex-grow border-t border-zinc-700" />
        </div>

        <div className="space-y-3">
          <button className="w-full py-3 px-4 flex items-center justify-center bg-white hover:bg-gray-100 rounded text-yellow-800 font-medium transition-colors">
            <FcGoogle className="mr-2 text-xl" />
            Continue with Google
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-yellow-400">Already have an account?</span>{" "}
          <a onClick={() => setLoginOrSignUp("login")} href="#signup" className="text-yellow-300 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
