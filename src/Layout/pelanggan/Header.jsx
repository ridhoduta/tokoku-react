import React, { useState, useRef, useEffect } from "react";
import {
  BarChart2,
  Package,
  Search,
  ShoppingCart,
  User,
  ListOrdered,
  LogOut,
} from "lucide-react";
import { useCart } from "../../component/BarangPelanggan/CartContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authApi";
import { getBarang } from "../../api/barangApi";

export default function Header() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const nama = localStorage.getItem("nama");
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // dropdown
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // klik di luar menutup dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePesananSaya = () => {
    navigate("/pelanggan/pesanan-list");
    setOpenDropdown(false);
  };
  const fetchBarang = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getBarang();
      // console.log("Response dari API:", response.data);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      const formattedProducts = data.map((item) => ({
        id: item.id,
        name: item.data?.nama_barang || "Tanpa Nama",
        category: item.data?.kategori_id || "-",
        price: Number(item.data?.harga_barang) || 0,
        stock: Number(item.data?.stok_barang) || 0,
        gambar: item.data?.gambar_barang
      }))

      setProducts(formattedProducts);
    } catch (err) {
      console.error("Error fetching barang:", err);
      setError("Terjadi kesalahan saat mengambil data barang");
    } finally {
      setLoading(false);
    }
  };

  // const handleLogout = async () => {
  //   await logout();
  //   setOpenDropdown(false);
  // };

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="w-full px-8 py-3">
        <div className="flex items-center justify-between">
          {/* 🛍️ Logo dan Navigasi */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/pelanggan/home")}>
              <div className="w-8 h-8 bg-purple-700 rounded flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-purple-700">TOKOKU</span>
            </div>

            <nav className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-700 hover:text-purple-700">
                <BarChart2 />
                <span className="text-sm font-medium">KATEGORI</span>
              </button>
            </nav>
          </div>

          {/* 🔍 Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari produk favorit kamu..."
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-700 p-2 rounded-lg hover:bg-purple-800">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* 🧭 Icons */}
          <div className="flex items-center gap-4 relative">
            {/* 🛒 Cart */}
            <button
              onClick={() => navigate("/pelanggan/keranjang")}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
            >
              <ShoppingCart className="w-6 h-6 text-purple-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                  {totalItems}
                </span>
              )}
            </button>

            {/* 👤 User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium">{nama}</span>
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-fadeIn">
                  <button
                    onClick={handlePesananSaya}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <ListOrdered className="w-4 h-4 text-gray-600" />
                    Pesanan Saya
                  </button>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
