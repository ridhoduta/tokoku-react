import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";

const MainAdmin = () => {
  return (
    <div className="flex w-screen min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <SidebarMenu />

      {/* Tambah padding-top agar konten tidak ketutup header HP */}
      <main className="flex-1 p-6 pt-20 md:pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainAdmin;
