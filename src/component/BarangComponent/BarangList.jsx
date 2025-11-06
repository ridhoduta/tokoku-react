import React, { useState } from "react";
import BarangItem from "./BarangItem";
import { Search } from "lucide-react";

const BarangList = ({ products, onDelete, onEdit, onOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(products)
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Search Bar */}
        <div className="relative mb-1">
          <input
            type="text"
            placeholder="Cari Produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-700 placeholder-gray-400"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  Nomor
                </th>
                <th className="font-semibold text-gray-600">
                  PRODUK
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  KATEGORI
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  HARGA
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  STOK
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  STATUS
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <BarangItem onDelete={onDelete} key={index} product={item} index={index} onEdit = {onEdit} onOpen={onOpen}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BarangList;
