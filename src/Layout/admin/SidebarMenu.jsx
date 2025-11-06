import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  LayoutDashboard,
  FlameKindling,
  LineChart,
} from "lucide-react";
import { logout } from "../../api/authApi";

const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      path: "/admin/pesanan", // sesuai route kamu
    },
    {
      label: "Laporan",
      icon: <BarChart3 className="w-5 h-5" />,
      path: "/admin/laporan", // opsional kalau nanti ada
    }
  ];
  return (
    <>
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

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-50"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default SidebarMenu;
