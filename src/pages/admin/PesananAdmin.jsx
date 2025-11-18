import React, { useEffect, useState } from "react";
import { getPesanan, updatePesanan, deletePesanan, updatePengiriman } from "../../api/pesananApi";
import PesananItem from "../../component/pesanan/PesananItem";
import PesananList from "../../component/pesanan/PesananList";


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

      // update langsung di state
      setPesanans((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
      );
    } catch (err) {
      console.error("Error update pesanan:", err);
      alert("Gagal mengedit pesanan: " + err.message);
    }
  };

  // ================================
  // 🔹 Update field pengiriman
  // ================================
  const handleUpdatePengiriman = async (id, newPengiriman) => {
    try {
      const res = await updatePengiriman(id, newPengiriman);
      if (res.success) {
        // update di state utama
        setPesanans((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, pengiriman: newPengiriman } : p
          )
        );
      } else {
        alert(res.message || "Gagal memperbarui pengiriman");
      }
    } catch (err) {
      console.error("Error update pengiriman:", err);
      alert("Terjadi kesalahan saat update pengiriman");
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


  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  // ================================
  // 🔹 Tampilkan Daftar Pesanan
  // ================================
  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Manajemen Pesanan
            </h2>
            <p className="text-gray-500 text-sm">Kelola Pesanan di Toko anda</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-xl overflow-hidden">


        <PesananList
          key={pesanans.id}
          pesanans={pesanans}
          onDelete={handleDelete}
          onUpdateStatus={updateStatusPesanan}
          onUpdatePengiriman={handleUpdatePengiriman}
          loading={loading} // ✅ kirim ke child
        />



      </div>
    </div>
  );
};

export default PesananAdmin;
