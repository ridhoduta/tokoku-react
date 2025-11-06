import React, { useState } from "react";
import {
  Search,
  Edit2,
  Trash2,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Example() {
  const [products] = useState([
    {
      id: 1,
      name: "Beras Premium 5 KG",
      category: "Beras",
      price: 75000,
      stock: 50,
      status: "Terbatas",
    },
    {
      id: 2,
      name: "Gula Pasir 1 KG",
      category: "Gula",
      price: 15000,
      stock: 100,
      status: "Stok Rendah",
    },
    {
      id: 3,
      name: "Gula Pasir 1 KG",
      category: "Gula",
      price: 15000,
      stock: 100,
      status: "Tersedia",
    },
    {
      id: 4,
      name: "Telur Ayam 1 KG",
      category: "Protein",
      price: 28000,
      stock: 40,
      status: "Terbatas",
    },
    {
      id: 5,
      name: "Tepung Terigu 1 KG",
      category: "Tepung",
      price: 12000,
      stock: 60,
      status: "Tersedia",
    },
    {
      id: 6,
      name: "Susu Kental Manis",
      category: "Susu",
      price: 18000,
      stock: 35,
      status: "Terbatas",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Statistik
  const totalProducts = 7;
  const totalStock = 1000;
  const totalCategories = 8;
  const lowStock = 7;

  // Fungsi untuk menentukan warna status
  const getStatusColor = (status) => {
    switch (status) {
      case "Tersedia":
        return "bg-green-400 text-green-900";
      case "Terbatas":
        return "bg-yellow-400 text-yellow-900";
      case "Stok Rendah":
        return "bg-red-400 text-red-900";
      default:
        return "bg-gray-400 text-gray-900";
    }
  };

  // Fungsi untuk menentukan warna kategori
  const getCategoryColor = (category) => {
    const colors = {
      Beras: "bg-purple-300 text-purple-900",
      Gula: "bg-purple-300 text-purple-900",
      Protein: "bg-purple-300 text-purple-900",
      Tepung: "bg-purple-300 text-purple-900",
      Susu: "bg-purple-300 text-purple-900",
    };
    return colors[category] || "bg-purple-300 text-purple-900";
  };

  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
        {/* ===== SIDEBAR ===== */}
        <aside className="w-48 bg-white shadow-lg p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-purple-600 p-2 rounded">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-purple-600 font-bold text-lg">TOKOKU</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>

          {/* Menu Navigasi */}
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium">
              <Package className="w-5 h-5" />
              Barang
            </button>
            <button className="w-full flex items-center gap-3 text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-50">
              <ShoppingCart className="w-5 h-5" />
              Pesanan
            </button>
            <button className="w-full flex items-center gap-3 text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-50">
              <BarChart3 className="w-5 h-5" />
              Laporan
            </button>
            <button className="w-full flex items-center gap-3 text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-50">
              <Settings className="w-5 h-5" />
              Pengaturan
            </button>
          </nav>
        </aside>

        {/* ===== KONTEN UTAMA ===== */}
        <div className="min-h-screen bg-gray-100"></div>
        {/* <main className="max-w-7xl mx-auto p-6"> */}
        <main className="w-screen">
          {/* Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Manajemen Produk
                </h2>
                <p className="text-gray-500 text-sm">
                  Kelola Produk Sembako Anda
                </p>
              </div>
              <button className="bg-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-purple-700 transition flex items-center gap-2">
                + Tambah Produk
              </button>
            </div>
          </div>

          {/* ===== CARDS STATISTIK ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-sm mb-1">Total Produk</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {totalProducts}
              </p>
              <p className="text-purple-600 text-xs font-medium cursor-pointer hover:underline">
                selengkapnya
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-sm mb-1">Stok Total</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {totalStock}
              </p>
              <p className="text-purple-600 text-xs font-medium cursor-pointer hover:underline">
                selengkapnya
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-sm mb-1">Kategori</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {totalCategories}
              </p>
              <p className="text-purple-600 text-xs font-medium cursor-pointer hover:underline">
                selengkapnya
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500 text-sm mb-1">Stok Rendah</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {lowStock}
              </p>
              <p className="text-purple-600 text-xs font-medium cursor-pointer hover:underline">
                selengkapnya
              </p>
            </div>
          </div>

          {/* ===== TABEL PRODUK ===== */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Cari Produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pr-12 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-700 placeholder-gray-400"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      PRODUK
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      KATEGORI
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      HARGA
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      STOK
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      STATUS
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 text-gray-700">
                        {product.name}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            product.category
                          )}`}
                        >
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        Rp {product.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {product.stock}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-3">
                          <button className="text-blue-600 hover:text-blue-800 transition">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
