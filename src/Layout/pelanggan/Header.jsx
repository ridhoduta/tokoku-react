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
import { getKategori } from "../../api/kategoriApi";

export default function Header() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const nama = localStorage.getItem("nama");
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [openKategori, setOpenKategori] = useState(false);
  const [kategoriList, setKategoriList] = useState([]);

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
    const fetchKategori = async () => {
      try {
        const res = await getKategori();
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];

        const formatted = data.map((item) => ({
          id: item.id,
          nama: item.data.nama_kategori,
        }));

        setKategoriList(formatted);
      } catch (err) {
        console.error("Gagal get kategori", err);
      }
    };

    fetchKategori();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePesananSaya = () => {
    navigate("/pelanggan/pesanan-list");
    setOpenDropdown(false);
  };
  const handleOpenKategori = () => {
    setOpenKategori(!openKategori);
  };
  const [keyword, setKeyword] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword.trim() === "") return;

    navigate("/pelanggan/search", {
      state: { keyword },
    });
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-gray-200/50 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-6">
          {/* 🛍️ Logo dan Navigasi */}
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/pelanggan/home")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-brand-700 group-hover:text-brand-800 transition-colors">TOKOKU</span>
            </div>

            <nav className="hidden lg:flex items-center gap-6 relative">
              <div
                className="relative"
                onClick={handleOpenKategori}
                onMouseLeave={() => setOpenKategori(false)}
              >
                <button className="flex items-center gap-2 text-gray-600 hover:text-brand-600 font-bold transition-colors">
                  <BarChart2 className="w-5 h-5" />
                  <span className="text-sm">KATEGORI</span>
                </button>

                {openKategori && (
                  <div className="absolute left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadeIn">
                    {kategoriList.length === 0 ? (
                      <p className="p-3 text-sm text-gray-500">Memuat...</p>
                    ) : (
                      kategoriList.map((kat) => (
                        <button
                          key={kat.id}
                          onClick={() =>
                            navigate("/pelanggan/kategori", {
                              state: {
                                kategori_id: kat.id,
                                nama_kategori: kat.nama,
                              },
                            })
                          }
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                        >
                          {kat.nama}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* 🔍 Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari produk favorit kamu..."
                className="w-full px-5 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium text-sm text-gray-700"
              />

              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-600 p-2 rounded-lg hover:bg-brand-700 transition-colors shadow-md"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>

          {/* 🧭 Icons */}
          <div className="flex items-center gap-4 relative">
            {/* 🛒 Cart */}
            <button
              onClick={() => navigate("/pelanggan/keranjang")}
              className="relative p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 ml-2"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* 👤 User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
              >
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-bold text-gray-700 hidden sm:block">{nama}</span>
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
