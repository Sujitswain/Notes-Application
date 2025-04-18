import React from "react";
import ReactLogo from "../assets/react.svg";
import Navbar from "./Navbar";

const Index = () => {
  return (
    <div className="w-[80%] ">
      <Navbar />
      <div className="flex justify-center items-center h-[85%]">
        <div className="mx-auto flex justify-between items-center">
          <div className="w-[46%] flex flex-col">
            <h1 className="text-5xl mb-2 font-semibold">
              Write your thoughts down as they come to you.
            </h1>
            <p className="text-gray-500 my-3">
              Explore a seamless way to capture and organize your thoughts,
              ideas, and inspirations in real-time.
            </p>
            <div>
              <button className="bg-blue-300 text-blue-700 font-[600] mr-3 px-4 py-[4px] rounded-md hover:bg-blue-400 hover:text-blue-700 hover:border-b-2 hover:border-blue-500">
                Login
              </button>
              <button className="bg-green-300 text-green-700 font-[600] px-4 py-[4px] rounded-md hover:bg-green-400 hover:text-green-700 hover:border-b-2 hover:border-green-500">
                Register
              </button>
            </div>
          </div>
          <div className="w-[30%]">
            <img className="w-full" src={ReactLogo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
