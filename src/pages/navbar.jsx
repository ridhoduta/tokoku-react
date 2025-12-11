import React from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <>
      <header className="border-b w-full fixed top-0 bg-white z-50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16 max-w-screen-2xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-700 rounded flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TOKOKU</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                onClick={() => navigate("/#beranda")}
                href="#beranda"
                className="text-gray-600 hover:text-gray-900 transition"
                // className={`${isActive('/#beranda')} transition cursor-pointer`}
              >
                Beranda
              </a>
              <a
                onClick={() => navigate("/#fitur")}
                href="#fitur"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Fitur
              </a>
              <a
                onClick={() => navigate("/#cara-kerja")}
                href="#cara-kerja"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Cara Kerja
              </a>
              <a
                onClick={() => navigate("/#kontak")}
                href="#kontak"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Kontak
              </a>
              <a
                onClick={() => navigate("/tentang")}
                href="#"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Tentang
              </a>
            </nav>
            <button
              className="bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-800 transition text-sm sm:text-base"
              onClick={() => navigate("/login")}
            >
              Daftar
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
