import { useEffect, useState } from "react";
import Google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import axios from "axios";
import Toast from "./Toast";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, showToast, handleCloseToast, toastConfig, setToastConfig, setShowToast } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checKToken = async () => {
      const token = localStorage.getItem("token");
      if(!token) return;

      try {
        const res = await axios.get("http://localhost:8080/api/auth/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const { email, username } = res.data;
        setUser({ email, username });
        navigate("/dashboard");
      } catch(err) {
        console.log("Token Invalid or Expired")
        localStorage.removeItem("token");
      }
    }

    checKToken();
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, email: responseEmail, username } = response.data; 

      localStorage.setItem("token", token);
      setUser({ email: responseEmail, username });
      navigate("/dashboard");

      setToastConfig({
        message: "You have Sucessfully logged in..",
        bgColor: "blue",
        textColor: "#fff",
      });
      setShowToast(true);

    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again."); 
    }
  };

  const handleGoogleLogin = async (e) => {
    setToastConfig({
      message: "Feature Yet to Implement Please use Demo account / Register",
      bgColor: "blue",
      textColor: "#fff",
    });
    setShowToast(true);
  }

  return (
    <div className="w-[80%] h-screen flex flex-col items-center justify-center bg-[#dbf7fe]">

      {/* Toast Message */}
      {showToast && <Toast toastConfig={toastConfig} onClose={handleCloseToast} />}

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
                <b>Email:</b> testuser@gmail.com	
              </span>
              <span>
                <b>Pass:</b> Sujit@543
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
            <div onClick={handleGoogleLogin} className="w-[11rem] flex m-auto justify-center rounded-sm border-2 hover:border-blue-300">
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