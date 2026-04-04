import React, { useState } from "react";
import Login from "../component/AuthComponent/Login";
import Register from "../component/AuthComponent/Register";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-brand-100 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Kembali</span>
      </button>

      <div className="w-full max-w-5xl glass-card rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative z-10 border-white/10">
        
        {/* Left Side: Branding/Visual */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-brand-600 to-brand-800 p-10 flex flex-col items-center justify-center text-white relative">
          {/* Abstract Patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="text-center space-y-8 relative z-10 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto shadow-2xl ring-1 ring-white/30 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter">TOKOKU</h1>
              <div className="w-16 h-1.5 bg-accent-400 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-brand-100 text-sm sm:text-base opacity-80 leading-relaxed max-w-xs mx-auto">
              Belanja kebutuhan harian lebih mudah, murah, dan menyenangkan bersama kami.
            </p>
          </div>

          {/* Footer of Left Side */}
          <div className="absolute bottom-8 text-xs text-brand-300 font-medium tracking-widest uppercase">
            EST. 2024
          </div>
        </div>

        {/* Right Side: Forms */}
        <div className="w-full md:w-7/12 bg-white/95 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-10">
            
            {/* Header Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-2xl">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-white text-brand-700 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                MASUK
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === "register"
                    ? "bg-white text-brand-700 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                DAFTAR
              </button>
            </div>

            {/* Title Section */}
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900">
                {activeTab === "login" ? "Selamat Datang Kembali" : "Buat Akun Baru"}
              </h2>
              <p className="text-gray-500 font-medium">
                {activeTab === "login" 
                  ? "Masukkan detail akun Anda untuk melanjutkan" 
                  : "Bergabunglah dengan TOKOKU dan mulai belanja"}
              </p>
            </div>

            {/* Form Container */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === "login" ? <Login /> : <Register />}
            </div>

            {/* Footer Text */}
            <p className="text-center text-xs text-gray-400 font-medium">
              Dengan melanjutkan, Anda menyetujui <a href="#" className="text-brand-600 hover:underline">Syarat & Ketentuan</a> kami.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
