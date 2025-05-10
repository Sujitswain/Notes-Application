import { useState } from "react";
import Google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";

const Register = () => {

  const navigate = useNavigate();
  const { setEmail } = useGlobalContext();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") evaluatePasswordStrength(value);
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Fair");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const { username, email, password, confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    /**
     * Only For Registration.....
     */
    setEmail(email);
    setLoading(true);
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Registration success", response.data);
      navigate("/optVerification");
    } catch (error) {
      console.error("Registration error", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); 
    }
  };

  const isPasswordMatch = formData.password === formData.confirmPassword;

  return (
    <div className="w-[80%] h-screen flex flex-col items-center justify-center bg-[#dbf7fe]">
      <h1 className="text-center text-[28px] my-5 font-extrabold uppercase tracking-wider">
        Notes
      </h1>
      <div className="w-full max-w-[400px] min-w-[300px] max-h-[90vh] overflow-y-auto m-auto bg-white rounded-[5px] border-[1px] border-gray-300">
        <form className="w-full h-full p-5 flex flex-col" onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-2 text-center font-bold text-[24px]">Register</h2>
          <hr className="w-full mb-2" />

          <input
            className="border-b-4 border-[1px] p-2 rounded-md mt-5"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="border-b-4 border-[1px] p-2 rounded-md mt-3"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password Field */}
          <div className="relative mt-3">
            <input
              className="w-full border-b-4 border-[1px] p-2 rounded-md"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-[10px] cursor-pointer text-sm text-blue-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <p className="text-sm mt-1 text-gray-600">
              Password Strength:{" "}
              <span
                className={`font-semibold ${
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Fair"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                {passwordStrength}
              </span>
            </p>
          )}

          {/* Confirm Password Field */}
          <div className="relative mt-3">
            <input
              className={`w-full border-b-4 border-[1px] p-2 rounded-md ${
                formData.confirmPassword && !isPasswordMatch ? "border-red-500" : ""
              }`}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-[10px] cursor-pointer text-sm text-blue-600"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Password mismatch warning */}
          {formData.confirmPassword && !isPasswordMatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
          )}

          {/* Error message */}
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

          <button
            className="bg-blue-500 mt-4 py-[5px] px-4 rounded-[5px] font-bold text-white disabled:opacity-50 flex items-center justify-center gap-2"
            type="submit"
            disabled={!isPasswordMatch || loading}
          >
            {loading ? (
                "Registering..."
            ) : (
              "Register"
            )}
          </button>

          {/* Google Signup and Login Link */}
          <div className="my-10 flex-col">
            <div className="w-[11rem] flex m-auto justify-center rounded-sm border-2 hover:border-blue-300">
              <img className="w-8 h-8" src={Google} alt="Google" />
              <span className="bg-blue-500 w-full text-white text-sm rounded-r-sm font-semibold px-1 py-[3px]">
                Sign up with Google
              </span>
            </div>
            <p className="text-center my-2">
              Already have an account?
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-500 ml-3"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;