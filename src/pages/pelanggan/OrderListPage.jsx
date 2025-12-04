import React, { useState, useEffect } from "react";
import {
  Package,
  Calendar,
  MapPin,
  Search,
  Trash2,
} from "lucide-react";
import {
  getPesanan,
  cancelPesanan,
  deletePesanan,
} from "../../api/pesananApi";
import { useNavigate } from "react-router-dom";
import DootsLoader from "../../component/Loader/DootsLoader";

export default function OrderListPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const nama = localStorage.getItem("nama");
  const navigate = useNavigate();

  const filters = [
    { value: "all", label: "Semua" },
    { value: "menunggu", label: "Menunggu" },
    { value: "diproses", label: "Diproses" },
    { value: "dikirim", label: "Dikirim" },
    { value: "selesai", label: "Selesai" },
    { value: "dibatalkan", label: "Dibatalkan" },
  ];

  const statusColors = {
    diproses: "bg-yellow-100 text-yellow-700",
    menunggu: "bg-blue-100 text-blue-700",
    dikirim: "bg-orange-100 text-orange-700",
    selesai: "bg-green-100 text-green-700",
    dibatalkan: "bg-red-100 text-red-700",
  };

  // ============================
  // 🔹 BATALKAN PESANAN
  // ============================
  const handleCancel = async (order_id) => {
    if (window.confirm(`Batalkan pesanan ${order_id}?`)) {
      const res = await cancelPesanan(order_id);

      if (res.success) {
        alert("Pesanan berhasil dibatalkan");
        window.location.reload();
      } else {
        alert(res.message);
      }
    }
  };

  // ============================
  // 🔹 HAPUS PESANAN
  // ============================
  const handleDeleteFinal = async (order_id) => {
    if (window.confirm(`Hapus pesanan ${order_id}?`)) {
      const res = await deletePesanan(order_id);

      if (res.success) {
        alert("Pesanan berhasil dihapus");
        window.location.reload();
      } else {
        alert(res.message);
      }
    }
  };

  // ============================
  // 🔹 GET PESANAN
  // ============================
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getPesanan();
        if (response.success) {
          const userOrders = response.data.filter(
            (order) => order.nama_pemesan === nama
          );
          setOrders(userOrders);
        }
      } catch (err) {
        console.error("Gagal mengambil pesanan:", err);
      } finally {
        setLoading(false);
      }
    };
    if (nama) fetchOrders();
  }, [nama]);

  // ============================
  // 🔹 FILTER
  // ============================
  useEffect(() => {
    const filtered =
      selectedFilter === "all"
        ? orders
        : orders.filter((order) => order.status === selectedFilter);
    setFilteredOrders(filtered);
  }, [orders, selectedFilter]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <DootsLoader />
        <p className="text-gray-600 mt-3">Memuat Pesanan...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">Pesanan Saya</h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari nomor pesanan atau produk..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter.value
                    ? "bg-purple-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order List */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Tidak Ada Pesanan
            </h3>
            <p className="text-gray-500">Belum ada pesanan dengan status ini</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() =>
                  navigate("/pelanggan/detail-pesanan", { state: { order } })
                }
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {order.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{order.tanggal}</span>
                      </div>
                    </div>

                    {/* TOMBOL AKSI */}
                    {order.status === "menunggu" ? (
                      // BATALKAN
                      <button
                        className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition text-yellow-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancel(order.id);
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    ) : order.status === "dibatalkan" ? (
                      // HAPUS PERMANEN
                      <button
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFinal(order.id);
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    ) : (
                      // DISABLE
                      <button
                        disabled
                        className="p-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Products */}
                  <div className="space-y-3 mb-4">
                    {order.barang_dipesan.map((product, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={product.gambar_barang}
                            alt={product.nama_barang}
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/80?text=No+Image")
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">
                            {product.nama_barang}
                          </h3>
                          <p className="text-xs text-gray-600">
                            Jumlah: {product.qty}{" "}
                            {product.satuan_dipilih
                              ? `(${product.satuan_dipilih})`
                              : ""}
                          </p>
                          <p className="text-xs text-gray-500">
                            Harga: Rp{" "}
                            {product.harga_final.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="text-right font-bold text-purple-700">
                          Rp{" "}
                          {(product.harga_final * product.qty).toLocaleString(
                            "id-ID"
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {order.alamat}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">
                        Total Belanja
                      </p>
                      <p className="text-lg font-bold text-purple-700">
                        Rp {order.total_harga.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
