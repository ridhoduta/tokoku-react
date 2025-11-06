import React, { useEffect, useState } from "react";
import PesananList from "../../component/pesanan/PesananList";
import { deletePesanan, getPesanan, updatePesanan } from "../../api/pesananApi";


const PesananAdmin = () => {
  const [pesanans, setPesanans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================================
  // 🔹 Ambil semua pesanan (GET)
  // ================================
  const fetchPesanan = async () => {
    try {
      setLoading(true);
      const res = await getPesanan();
      if (res.success === false) throw new Error(res.message || "Gagal memuat data");
      setPesanans(res.data || []);
    } catch (err) {
      console.error("Error getPesanan:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // 🔹 Edit pesanan (UPDATE)
  // ================================
  const editPesanan = async (id, updatedData) => {
    try {
      const res = await updatePesanan(id, updatedData);
      if (res.success === false) throw new Error(res.message || "Gagal update pesanan");
      // Update di state lokal tanpa reload
      setPesanans((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
      );
    } catch (err) {
      console.error("Error update pesanan:", err);
      alert("Gagal mengedit pesanan: " + err.message);
    }
  };

  // ================================
  // 🔹 Update Status Pesanan
  // ================================
  const updateStatusPesanan = async (id, statusBaru) => {
    await editPesanan(id, { status: statusBaru });
  };

  // ================================
  // 🔹 Delete Pesanan
  // ================================
  const handleDelete = async (id) => {
    try {
      const res = await deletePesanan(id);
      if (res.success === false) throw new Error(res.message || "Gagal hapus pesanan");
      setPesanans((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error delete pesanan:", err);
      alert("Gagal menghapus pesanan: " + err.message);
    }
  };

  // ================================
  // 🔹 Load data pertama kali
  // ================================
  useEffect(() => {
    fetchPesanan();
  }, []);

  // ================================
  // 🔹 UI Kondisi Loading & Error
  // ================================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  // ================================
  // 🔹 Tampilan utama
  // ================================
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manajemen Pesanan</h2>
            <p className="text-gray-500 text-sm">
              Kelola Semua pesanan pelanggan
            </p>
          </div>
        </div>
      </div>

      {/* Statistik */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center w-64">
          <p className="text-gray-500 text-sm mb-1">Total Pesanan</p>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {pesanans.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center w-64">
          <p className="text-gray-500 text-sm mb-1">Pesanan Selesai</p>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {pesanans.filter((p) => p.status === "selesai").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center w-64">
          <p className="text-gray-500 text-sm mb-1">Dalam Proses</p>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {pesanans.filter((p) => p.status === "proses").length}
          </p>
        </div>
      </div>

      {/* List Pesanan */}
      <PesananList
        pesanans={pesanans}
        onEdit={editPesanan}
        onDelete={handleDelete}
        onUpdateStatus={updateStatusPesanan}
      />
    </>
  );
};

export default PesananAdmin;
