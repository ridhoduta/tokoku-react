import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  BarChart3,
  LogOut,
  LayoutDashboard,
  LineChart,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { logout } from "../../api/authApi";
import DootsLoader from "../../component/Loader/DootsLoader";

const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [openLaporan, setOpenLaporan] = useState(false);

  const keluar = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/login"); // redirect setelah logout
    } catch (error) {
      console.log("logout gagal", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Jika loading → tampilkan loader
  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
        <DootsLoader />
      </div>
    );
  }

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/admin/dashboard",
    },
    {
      label: "Barang",
      icon: <Package className="w-5 h-5" />,
      path: "/admin/barang",
    },
    {
      label: "Kategori",
      icon: <LineChart className="w-5 h-5" />,
      path: "/admin/kategori",
    },
    {
      label: "Pesanan",
      icon: <ShoppingCart className="w-5 h-5" />,
      path: "/admin/pesanan",
    }
  ];
  const laporanItems = [
    { label: "Laporan Barang", path: "/admin/laporan/barang" },
    { label: "Laporan Pesanan", path: "/admin/laporan/pesanan" },
  ];

  return (
    <aside className="w-48 bg-white shadow-lg p-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-purple-600 p-2 rounded">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-purple-600 font-bold text-lg">TOKOKU</h1>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-purple-600 hover:bg-purple-50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
        {/* Dropdown Laporan */}
        <div>
          <button
            onClick={() => setOpenLaporan(!openLaporan)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
              location.pathname.includes("/admin/laporan")
                ? "bg-purple-600 text-white"
                : "text-purple-600 hover:bg-purple-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5" />
              Laporan
            </div>
            {openLaporan ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {openLaporan && (
            <div className="ml-8 mt-1 space-y-1">
              {laporanItems.map((sub) => {
                const isActive = location.pathname === sub.path;
                return (
                  <button
                    key={sub.label}
                    onClick={() => navigate(sub.path)}
                    className={`w-full text-left px-2 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-purple-100 text-purple-700 font-semibold"
                        : "text-gray-600 hover:bg-purple-50"
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Logout button: gunakan fungsi keluar */}
        <button
          onClick={keluar}
          className="w-full flex items-center gap-3 text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-50"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default SidebarMenu;
