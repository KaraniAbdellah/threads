import { useState, useContext } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import LoginSchema from "../YupSchema/LoginSchema";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GeneratePassword } from "js-generate-password";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, SetLoading] = useState(false);
  const [setLoginOrSignUp] = useContext(AuthContext);
  
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const client_id = import.meta.env.VITE_CLIENT_ID;

  const ForgetPassword = () => {
    console.log("Hello World");
  }

  const UnShowLogin = () => {
    setLoginOrSignUp("");
  };

  const CheckUser = async () => {
    try {
      await axios
        .post(`${apiURL}/api/auth/login`, formData, {
          withCredentials: true,
        })
        .then((response) => {
          toast.success("Welcome to Threads", {
            duration: 2000,
            position: "bottom-right",
          });

          SetLoading(true);
          setLoginOrSignUp("");
          navigate("/loading");
          setTimeout(() => {
            navigate("/space");
          }, 2000);
        })
        .catch((error) => {
          let message = "Please Check Login Informations";
          if (error.message == "Network Error") {
            message = error.message;
          }
          toast.error(message, {
            duration: 4000,
            position: "bottom-right",
          });
        })
        .finally(() => {
          SetLoading(false);
        });
    } catch (error) {
      toast.error("Something went wrong. Maybe a network error.", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      LoginSchema.validateSync(formData);
      CheckUser();
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const SuccessWithGoogle = async (credentialResponse) => {
    const user_info = jwtDecode(credentialResponse.credential);
    // Add User to Database as he is sign up
    const formData = {
      user_name: user_info.name,
      email: user_info.email,
      password: GeneratePassword({ length: 14, symbols: true }),
    };

    try {
      await axios
        .post(`${apiURL}/api/auth/signup_with_google`, formData, {
          withCredentials: true
        })
        .then((response) => {
          toast.success("Welcome to Threads", {
            duration: 2000,
            position: "bottom-right",
          });

          SetLoading(true); setLoginOrSignUp(""); navigate("/loading");
          setTimeout(() => {
            navigate("/space");
          }, 2000);
        })
        .catch((error) => {
          let message = "Please Check Login Informations";
          if (error.message == "Network Error") {
            message = error.message;
          }
          toast.error(message, {
            duration: 4000,
            position: "bottom-right",
          });
        })
        .finally(() => {
          SetLoading(false);
        });
    } catch (error) {
      toast.error("Something went wrong. Maybe a network error.", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  const ErrorWithGoogle = async () => {
    toast.error("Login failed", {
      duration: 2000,
      position: "bottom-right",
    });
  };

  if (isLoading) {
    toast.promise("Saving", {
      duration: 2000,
      position: "bottom-right",
    });
  }

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <div className="absolute w-full z-50  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center min-h-screen bg-black opacity-95">
        <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-zinc-900 text-yellow-300">
          <div className="relative mb-12">
            <button
              onClick={() => UnShowLogin()}
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
              Welcome back!
            </h2>
            <p className="text-sm text-yellow-400">
              Sign in to access your space.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
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

            <div className="relative">
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
            <p onClick={() => ForgetPassword()} className="mt-1 text-sm mb-4 hover:underline cursor-pointer">
              Forget Password?
            </p>

            <button
              type="submit"
              className="w-full py-3 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 rounded text-yellow-400 font-medium transition-colors"
            >
              Login
            </button>
          </form>

          <div className="my-4 flex items-center justify-center">
            <hr className="flex-grow border-t border-zinc-700" />
            <span className="px-3 text-sm text-yellow-400">or</span>
            <hr className="flex-grow border-t border-zinc-700" />
          </div>

          <div className="space-y-3 flex justify-center items-center">
            <GoogleLogin
              className="w-[100%]"
              onSuccess={(credentialResponse) =>
                SuccessWithGoogle(credentialResponse)
              }
              onError={() => ErrorWithGoogle()}
              auto_select={true}
            />
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-yellow-400">Don't have an account?</span>{" "}
            <a
              onClick={() => setLoginOrSignUp("sign up")}
              href="#signup"
              className="text-yellow-300 hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
     </GoogleOAuthProvider>
  );
};

export default Login;
