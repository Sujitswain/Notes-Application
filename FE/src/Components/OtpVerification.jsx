import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

const OtpVerification = () => {

  const { email, setUser, showToast, handleCloseToast, toastConfig, setToastConfig, setShowToast } = useGlobalContext();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(5).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);  

  const handleChange = (e, index) => {
    let value = e.target.value;
  
    value = value.replace(/\D/g, ""); 
    if (value.length > 1) {
      value = value.slice(-1); 
    }
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };  

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 5);
    if (!/^\d+$/.test(paste)) return;

    const pasteArray = paste.split("");
    const newOtp = [...otp];
    pasteArray.forEach((digit, idx) => {
      if (idx < 5) {
        newOtp[idx] = digit;
      }
    });
    setOtp(newOtp);
    const lastIndex = pasteArray.length - 1;
    if (lastIndex < 5) {
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    const response = await axios.post(
      "http://localhost:8080/api/auth/verify-otp",
      { email, otp: enteredOtp},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { token, email: responseEmail, username } = response.data; 

    localStorage.setItem("token", token);
    setUser({ email: responseEmail, username });

    navigate("/dashboard");

    setToastConfig({
      message: "OTP have been verified successfully",
      bgColor: "green",
      textColor: "#fff",
    });
    setShowToast(true);
  };

  const handleResendOtp = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/auth/resend-otp",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    setToastConfig({
      message: "OTP have been resend to Email",
      bgColor: "black",
      textColor: "#fff",
    });
    setShowToast(true);

  };  

  const handleClick = (e, index) => {
    const value = otp[index];
    const cursorPosition = e.target.selectionStart;

    if (cursorPosition < value.length) {
      e.target.setSelectionRange(value.length, value.length);
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };
  

  return (
    <div className="w-[80%] h-screen flex flex-col items-center justify-center bg-[#dbf7fe]">

      {/* Toast Message */}
      {showToast && <Toast toastConfig={toastConfig} onClose={handleCloseToast} />}

      <h1 className="text-center text-[28px] my-5 font-extrabold uppercase tracking-wider">
        Notes
      </h1>
      <div className="w-full max-w-[400px] min-w-[300px] max-h-[90vh] overflow-y-auto m-auto bg-white rounded-[5px] border-[1px] border-gray-300">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full p-5 flex flex-col items-center"
        >
          <h2 className="text-2xl mb-5 text-center font-bold text-[24px]">
            OTP Verification
          </h2>
          <p className="text-sm mb-4 text-center">
            Enter the 5-digit OTP sent to your email
          </p>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="w-10 h-10 text-center border-2 border-gray-300 rounded-md text-xl"
                value={digit}
                onInput={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                onFocus={handleFocus}
                onClick={(e) => handleClick(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
  
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
                type="submit"
                className="bg-blue-500 py-[6px] px-6 rounded-[5px] font-bold text-white hover:bg-blue-600 transition duration-200"
            >
                Verify OTP
            </button>
            <button
                type="button"
                onClick={handleResendOtp}
                className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition duration-200"
            >
                Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
};

export default OtpVerification;