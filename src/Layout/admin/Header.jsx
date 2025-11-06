import React from "react";

const Header = () => {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manajemen Produk</h2>
            <p className="text-gray-500 text-sm">Kelola Produk Sembako Anda</p>
          </div>
          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-purple-700 transition flex items-center gap-2">
            + Tambah Produk
          </button>
        </div>
      </div>

    </>
  );
};

export default Header;
