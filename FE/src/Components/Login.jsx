import React, { useState } from "react";
import Google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before submitting the request

    console.log("Email:", email);  // Log email to ensure it's being captured correctly
    console.log("Password:", password);  // Log password to ensure it's being captured correctly

    try {
      // Sending the request to the backend for login
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login response:", response.data);

      const { token, email: responseEmail, username } = response.data; // Destructuring response

      // Store the token in local storage for future authentication
      localStorage.setItem("token", token);

      // Set the user in the global context (or state management)
      setUser({ email: responseEmail, username });

      // Navigate to the dashboard upon successful login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");  // Set error message on failure
    }
  };

  return (
    <div className="w-[80%] h-screen flex flex-col items-center justify-center bg-[#dbf7fe]">
      <h1 className="text-center text-[28px] my-5 font-extrabold uppercase tracking-wider">
        Notes
      </h1>
      <div className="w-full max-w-[400px] min-w-[300px] max-h-[90vh] overflow-y-auto m-auto bg-white rounded-[5px] border-[1px] border-gray-300">
        <form onSubmit={handleLogin} className="w-full h-full p-5 flex flex-col">
          <h2 className="text-2xl mb-2 text-center font-bold text-[24px]">
            Login
          </h2>
          <hr className="w-full mb-2" />

          <div>
            <p className="font-bold">Demo Account</p>
            <div className="flex">
              <span className="mr-4">
                <b>Email:</b> test@gmail.com
              </span>
              <span>
                <b>Pass:</b> test123
              </span>
            </div>
          </div>

          <input
            className="border-b-4 border-[1px] p-2 rounded-md mt-9"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="border-b-4 border-[1px] p-2 rounded-md mt-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

          <button
            className="bg-blue-500 mt-4 py-[5px] rounded-[5px] font-bold text-white"
            type="submit"
          >
            Login
          </button>

          <div className="my-10 flex-col">
            <div className="w-[11rem] flex m-auto justify-center rounded-sm border-2 hover:border-blue-300">
              <img className="w-8 h-8" src={Google} alt="Google login" />
              <span className="bg-blue-500 w-full text-white text-sm rounded-r-sm font-semibold px-1 py-[3px]">
                Sign in with Google
              </span>
            </div>
            <p className="text-center my-2">
              Don’t have an account?
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-500 ml-2"
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;