import React, { useState, useEffect } from "react";
import {
  Package,
  Calendar,
  MapPin,
  ChevronRight,
  Search,
  Box,
  Truck,
  Wallet,
  Wallet2Icon,
} from "lucide-react";
import { getPesanan } from "../../api/pesananApi";
import { useNavigate } from "react-router-dom";
import { bayarPesanan } from "../../api/pesananApi";

export default function OrderListPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  // Ambil semua pesanan dari API dan filter sesuai nama user
  useEffect(() => {
    const fetchOrders = async () => {
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
      }
    };
    if (nama) fetchOrders();
  }, [nama]);

  // Filter pesanan berdasarkan status
  useEffect(() => {
    const filtered =
      selectedFilter === "all"
        ? orders
        : orders.filter((order) => order.status === selectedFilter);
    setFilteredOrders(filtered);
  }, [orders, selectedFilter]);

  if (selectedOrder) {
    return (
      <OrderDetailView
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }
  console.log(orders);
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

          {/* Filter Tabs */}
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
                onClick={() => setSelectedOrder(order)}
              >
                <div className="p-6">
                  {/* Order Header */}
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
                    <ChevronRight className="w-6 h-6 text-gray-400" />
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
                            Jumlah: {product.qty}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            Rp {product.harga_barang.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
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

// Detail view bisa pakai struktur serupa, ganti properti sesuai API
function OrderDetailView({ order, onBack }) {
  const navigate = useNavigate();

  const statusColors = {
    menunggu: "bg-blue-100 text-blue-700",
    dikirim: "bg-orange-100 text-orange-700",
    selesai: "bg-green-100 text-green-700",
    dibatalkan: "bg-red-100 text-red-700",
    dibayar: "bg-yellow-100 text-yellow-700",
    "belum dibayar": "bg-red-100 text-red-700",
  };

  // ==============================
  // 🔹 Handler untuk tombol "Bayar Sekarang"
  // ==============================
  const handleBayarSekarang = async () => {
    try {
      const data = {
        pesananId: order.id,
        nama_pemesan: order.nama_pemesan,
        tanggal: order.tanggal, // Format: YYYY-MM-DD
        pengiriman: order.pengiriman,
      };
      // Kirim request ke backend untuk generate Snap Token
      const res = await bayarPesanan(data);
      console.log("✅ Respons dari backend:", res);
      console.log(window.snap);
      console.log(res.snapToken);

      if (res.success && res.snapToken) {
        // Pastikan Midtrans Snap sudah dimuat
        if (!window.snap) {
          alert("Midtrans Snap belum dimuat. Coba refresh halaman.");
          return;
        }

        // 🔹 Buka popup pembayaran Midtrans
        window.snap.pay(res.snapToken, {
          onSuccess: function (result) {
            alert("Pembayaran berhasil!");
            console.log("Success:", result);
          },
          onPending: function (result) {
            alert("Menunggu pembayaran...");
            console.log("Pending:", result);
          },
          onError: function (result) {
            alert("Terjadi kesalahan saat pembayaran.");
            console.log("Error:", result);
          },
          onClose: function () {
            alert("Kamu menutup halaman pembayaran sebelum selesai.");
          },
        });
      } else {
        alert(res.message || "Gagal memproses pembayaran.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  // ==============================
  // 🔹 Pastikan script Snap dimuat (hanya sekali)
  // ==============================
  React.useEffect(() => {
    const snapScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = "YOUR_CLIENT_KEY"; // ganti dengan client key kamu dari Midtrans Dashboard

    let scriptTag = document.createElement("script");
    scriptTag.src = snapScriptUrl;
    scriptTag.setAttribute("data-client-key", clientKey);
    scriptTag.async = true;

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <button
            onClick={onBack}
            className="text-purple-700 hover:text-purple-800 font-semibold mb-4 flex items-center gap-2"
          >
            ← Kembali ke Daftar Pesanan
          </button>
          <h1 className="text-2xl font-bold mb-2">Detail Pesanan</h1>
          <div className="flex items-center gap-4 text-sm">
            <span
              className={`px-3 py-1 rounded-full font-semibold ${
                statusColors[order.status]
              }`}
            >
              {order.status}
            </span>
            <span
              className={`px-3 py-1 rounded-full font-semibold ${
                statusColors[order.status_pembayaran]
              }`}
            >
              {order.status_pembayaran}
            </span>
            <span className="text-gray-600">No Pesanan: {order.id}</span>
          </div>
        </div>

        {/* Info pengiriman dan produk */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-700" />
                Informasi Pengiriman
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Tanggal Pesanan</p>
                    <p className="text-gray-600">{order.tanggal}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Alamat Pengiriman</p>
                    <p className="text-gray-600">
                      {order.nama_pemesan}
                      <br />
                      {order.alamat}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Metode Pengiriman</p>
                    <p className="text-gray-600">{order.pengiriman}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wallet2Icon className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Metode Pembayaran</p>
                    <p className="text-gray-600">{order.pembayaran}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Produk */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Detail Produk</h2>
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
                      Jumlah: {product.qty}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      Rp {product.harga_barang.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ringkasan Pembayaran */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Ringkasan Pembayaran</h2>
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span>Total</span>
                  <span className="font-bold text-purple-700">
                    Rp {order.total_harga.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* 🔹 Tombol Bayar Sekarang muncul jika pembayaran = transfer */}
              {order.pembayaran === "transfer" && (
                <>
                  {order.status_pembayaran === "dibayar" ? (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white font-semibold py-3 rounded-lg cursor-not-allowed"
                    >
                      Anda sudah membayar
                    </button>
                  ) : order.status === "menunggu" ? (
                    <button
                      onClick={handleBayarSekarang}
                      className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Bayar Sekarang
                    </button>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
