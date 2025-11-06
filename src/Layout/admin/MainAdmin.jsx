// import { Sidebar } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";

const MainAdmin = () => {
  return (
    <div className="flex w-screen min-h-screen overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
      <SidebarMenu />
      <main className="flex-1 p-6">
        {/* Hapus max-w biar full width */}
        <Outlet />
      </main>
    </div>
  );
};


export default MainAdmin;
