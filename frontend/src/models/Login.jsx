import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Add your authentication logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-zinc-900 text-yellow-300">
        <div className="relative mb-12">
            <button className="text-end text-xl absolute right-0 hover:bg-zinc-800 rounded-full p-3">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 pl-10 pr-3 bg-zinc-800 placeholder-yellow-500 rounded border border-zinc-700 focus:outline-none focus:border-yellow-500"
              placeholder="Password"
              required
            />
          </div>
          <p className="mt-1 mb-4 hover:underline cursor-pointer">Forget Password?</p>

          <button
            type="submit"
            className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded text-yellow-400 font-medium transition-colors"
          >
            Login
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
          <span className="text-yellow-400">Don't have an account?</span>{" "}
          <a href="#signup" className="text-yellow-300 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
