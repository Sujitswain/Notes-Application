import React from "react";
import Google from "../assets/google.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
    
  const navigate = useNavigate();

  return (
    <div className="w-[80%] h-screen flex flex-col items-center justify-center bg-[#dbf7fe]">
      <h1 className="text-center text-[28px] my-5 font-extrabold uppercase tracking-wider">
        Notes
      </h1>
      <div className="w-full max-w-[400px] min-w-[300px] max-h-[90vh] overflow-y-auto m-auto bg-white rounded-[5px] border-[1px] border-gray-300">
        <form className="w-full h-full p-5 flex flex-col">
          <h2 className="text-2xl mb-2 text-center font-bold text-[24px]">
            Register
          </h2>
          <hr className="w-full mb-2" />
          <input
            className="border-b-4 border-[1px] p-2 rounded-md mt-5"
            type="text"
            placeholder="Username"
            required
          />
          <input
            className="border-b-4 border-[1px] p-2 rounded-md mt-3"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="border-b-4 border-[1px] p-2 rounded-md mt-3"
            type="password"
            placeholder="Password"
            required
          />
          <input
            className="border-b-4 border-[1px] p-2 rounded-md mt-3"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <button
            className="bg-blue-500 mt-4 py-[5px] rounded-[5px] font-bold text-white"
            type="submit"
            onClick={() => navigate("/optVerification")} // Assuming OTP verification step next
          >
            Register
          </button>

          <div className="my-10 flex-col">
            <div className="w-[11rem] flex m-auto justify-center rounded-sm border-2 hover:border-[2px] hover:border-blue-300">
              <img className="w-8 h-8" src={Google} />
              <span className="bg-blue-500 w-full text-white text-sm rounded-r-sm font-semibold px-1 py-[3px]">
                Sign up with Google
              </span>
            </div>
            <p className="text-center my-2">
              Already have an account?
              <a href="/login" className="text-blue-500 ml-3">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
