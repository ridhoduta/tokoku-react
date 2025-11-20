import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ShoppingCart, User, Search, Package, Star } from "lucide-react";

const MainPelanggan = () => {
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <div className=" w-screen bg-gradient-to-r from-purple-800 to-purple-600 py-16 px-4">
        <div className="max-w-7xl mx-auto relative">
          {/* Hiasan */}
          <div className="absolute left-12 top-0 text-6xl">🌾</div>
          <div className="absolute right-12 top-0 text-6xl">🌾</div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="bg-yellow-600 px-6 py-3 rounded-lg transform -rotate-3">
                <span className="text-white font-bold text-lg">
                  Lebih Hemat
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-purple-800" />
                </div>
                <h1 className="text-6xl font-bold text-white">TOKOKU</h1>
              </div>

              <div className="bg-orange-500 px-6 py-3 rounded-lg transform rotate-3">
                <span className="text-white font-bold text-lg">Promo Gede</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-white text-xl">
              <Star className="w-6 h-6" />
              <span>Belanja Mudah, Hemat, dan Terpercaya</span>
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainPelanggan;
