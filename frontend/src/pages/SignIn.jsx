import React, { useState, useContext } from "react";
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setUserData(null);
      setErr(error.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignIn}
        className="w-[90%] max-w-[500px] bg-[#00000062] backdrop-blur-md shadow-lg shadow-black flex flex-col items-center justify-center gap-5 px-6 py-8 rounded-xl"
      >
        <h1 className="text-white text-2xl font-semibold mb-4">
          Sign In to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[55px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="w-full h-[55px] border-2 border-white rounded-full relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full rounded-full bg-transparent outline-none px-5 text-white placeholder-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showPassword ? (
            <IoEyeOff
              className="absolute top-[15px] right-[20px] w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className="absolute top-[15px] right-[20px] w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {err && <p className="text-red-500 text-sm">*{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="min-w-[150px] h-[55px] mt-4 text-black font-semibold bg-white rounded-full"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p
          className="text-white text-sm mt-2 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create a new account?{" "}
          <span className="text-blue-400">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
