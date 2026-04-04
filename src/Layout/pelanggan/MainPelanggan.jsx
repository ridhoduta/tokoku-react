import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ShoppingCart, User, Search, Package, Star } from "lucide-react";

const MainPelanggan = () => {
  return (
    <>
      <Header />

      {/* COMPACT PREMIUM BANNER */}
      <div className="w-full bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 border-b border-brand-700/50 relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute top-12 right-12 w-32 h-32 bg-accent-400 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="container-custom py-6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center hidden sm:flex">
              <Package className="w-6 h-6 text-brand-100" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Selamat Datang di TOKOKU <span className="text-2xl">👋</span>
              </h1>
              <p className="text-sm text-brand-100/80 font-medium">Belanja mudah, hemat, dan terpercaya.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-accent-500/90 backdrop-blur px-4 py-1.5 rounded-full border border-accent-400/50 shadow-lg shadow-accent-500/20">
              <span className="text-white font-bold text-sm tracking-wide">Promo Gede</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-1.5 rounded-full border border-white/20 hidden md:block">
              <span className="text-brand-50 font-bold text-sm tracking-wide">Lebih Hemat</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main className="min-h-screen bg-gray-50/50">
        <div className="container-custom py-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainPelanggan;
