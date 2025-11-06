import React, { useState } from "react";
import Login from "../component/AuthComponent/Login";
import Register from "../component/AuthComponent/Register";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
      <div className="h-full bg-gradient-to-br from-purple-700 to-purple-900 md:flex md:items-stretch md:justify-stretch p-4 md:p-0 flex items-center justify-center">
        <div className="w-full h-full md:max-w-none max-w-6xl bg-white md:rounded-none rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            
            {/* Left Side - Logo & Branding */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-purple-700 to-purple-900 p-8 md:p-12 flex flex-col items-center justify-center text-white relative">
              {/* <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>   */}

              <div className="text-center space-y-6">
                {/* Store Icon */}
                <div className="flex justify-center">
                  <svg
                    className="w-32 h-32 md:w-40 md:h-40"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Awning */}
                    <path
                      d="M40 60 Q40 50 50 50 L70 50 Q80 50 80 60 L80 70 L40 70 Z"
                      fill="white"
                    />
                    <path
                      d="M80 60 Q80 50 90 50 L110 50 Q120 50 120 60 L120 70 L80 70 Z"
                      fill="white"
                    />
                    <path
                      d="M120 60 Q120 50 130 50 L150 50 Q160 50 160 60 L160 70 L120 70 Z"
                      fill="white"
                    />

                    {/* Pole Left */}
                    <rect x="55" y="70" width="10" height="80" fill="white" />

                    {/* Pole Right */}
                    <rect x="135" y="70" width="10" height="80" fill="white" />

                    {/* Counter */}
                    <rect x="45" y="100" width="110" height="50" fill="white" rx="5" />

                    {/* Counter Details */}
                    <circle cx="80" cy="120" r="8" fill="#7c3aed" />
                    <circle cx="120" cy="120" r="8" fill="#7c3aed" />
                  </svg>
                </div>

                {/* Brand Name */}
                <h1 className="text-5xl md:text-6xl font-bold tracking-wide">
                  TOKOKU
                </h1>

                {/* Divider */}
                <div className="w-32 h-1 bg-cyan-400 mx-auto"></div>
              </div>


            </div>

            {/* Right Side - Auth Forms */}
            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col">
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-8">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition duration-200 ${
                    activeTab === "login"
                      ? "bg-purple-700 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition duration-200 ${
                    activeTab === "register"
                      ? "bg-purple-700 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Page Content */}
              <div className="flex-1 flex items-center justify-center">
                {activeTab === "login" ? <Login /> : <Register />}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
