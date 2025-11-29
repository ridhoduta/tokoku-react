// src/api/PesananApi.jsx
import api from "./axiosInstance";

// ==================================================
// 🔹 GET semua pesanan
// ==================================================
export const getPesanan = async () => {
  try {
    const res = await api.get("/pesanan");
    return res.data;
  } catch (error) {
    console.error("Gagal mengambil data pesanan:", error);
    return (
      error.response?.data || { success: false, message: "Error getPesanan" }
    );
  }
};

// ==================================================
// 🔹 GET detail pesanan berdasarkan ID
// ==================================================
export const getPesananById = async (id) => {
  try {
    const res = await api.get(`/pesanan/${id}`);
    return res.data;
  } catch (error) {
    console.error("Gagal mengambil detail pesanan:", error);
    return (
      error.response?.data || {
        success: false,
        message: "Error getPesananById",
      }
    );
  }
};

// ==================================================
// 🔹 CREATE pesanan baru
// ==================================================
// Contoh data:
// {
//   "nama_pemesan": "User",
//   "alamat": "ngantru",
//   "barang_dipesan": [
//     { "barang_id": "B346405", "nama_barang": "Minyak Sanco", "harga_barang": 3000, "qty": 1 }
//   ],
//   "total_harga": 3000,
//   "status": "menunggu",
//   "tanggal": "09-10-2025"
// }
export const createPesanan = async (data) => {
  try {
    const res = await api.post("/pesanan", data);
    return res.data;
  } catch (error) {
    console.error("Gagal membuat pesanan:", error);
    return (
      error.response?.data || { success: false, message: "Error createPesanan" }
    );
  }
};

// ==================================================
// 🔹 UPDATE pesanan (ubah status, data, dll.)
// ==================================================
export const updatePesanan = async (id, data) => {
  try {
    const res = await api.put(`/pesanan/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Gagal memperbarui pesanan:", error);
    return (
      error.response?.data || { success: false, message: "Error updatePesanan" }
    );
  }
};

// ==================================================
// 🔹 DELETE pesanan berdasarkan ID
// ==================================================
export const deletePesanan = async (id) => {
  try {
    const res = await api.delete(`/pesanan/${id}`);
    return res.data;
  } catch (error) {
    console.error("Gagal menghapus pesanan:", error);
    return (
      error.response?.data || { success: false, message: "Error deletePesanan" }
    );
  }
};
export const bayarPesanan = async ({
  pesananId,
  nama_pemesan,
  tanggal,
  pengiriman,
}) => {
  try {
    const res = await api.post("/pesanan/bayar", {
      pesananId,
      nama_pemesan,
      tanggal,
      pengiriman,
    });

    // Jika sukses, backend akan mengembalikan snap_token Midtrans
    if (res.data.success) {
      return {
        success: true,
        snapToken: res.data.snap_token,
        pembayaran: res.data.data,
      };
    }

    return {
      success: false,
      message: res.data.message || "Gagal memproses pembayaran",
    };
  } catch (error) {
    console.error("Gagal memproses pembayaran:", error);
    return (
      error.response?.data || { success: false, message: "Error bayarPesanan" }
    );
  }
};
export const updatePengiriman = async (id, pengiriman) => {
  try {
    const res = await api.put(`/pesanan/pengiriman/${id}`, { pengiriman });
    return res.data;
  } catch (error) {
    console.error("Gagal memperbarui pengiriman pesanan:", error);
    return (
      error.response?.data || {
        success: false,
        message: "Terjadi kesalahan saat update pengiriman",
      }
    );
  }
};
export const getLaporan = async () => {
  try {
    const res = await api.get("/laporan"); // Pastikan endpoint Laravel /laporan tersedia
    return res.data;
  } catch (error) {
    console.error("Gagal mengambil data laporan:", error);
    return (
      error.response?.data || { success: false, message: "Error getLaporan" }
    );
  }
};
