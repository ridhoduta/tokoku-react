import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Package, Calendar, MapPin, Truck, Wallet2Icon } from "lucide-react";
import { bayarPesanan } from "../../api/pesananApi";
import DootsLoader from "../../component/Loader/DootsLoader";

export default function DetailPesanan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const snapScript = document.createElement("script");
    snapScript.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    snapScript.setAttribute("data-client-key", "YOUR_CLIENT_KEY");
    snapScript.async = true;
    document.body.appendChild(snapScript);
    return () => document.body.removeChild(snapScript);
  }, []);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Tidak ada data pesanan. Silakan kembali.
      </div>
    );
  }

  const onBack = () => navigate("/pelanggan/pesanan-list");

  const statusColors = {
    menunggu: "bg-blue-100 text-blue-700",
    dikirim: "bg-orange-100 text-orange-700",
    selesai: "bg-green-100 text-green-700",
    dibatalkan: "bg-red-100 text-red-700",
    dibayar: "bg-yellow-100 text-yellow-700",
    "belum dibayar": "bg-red-100 text-red-700",
  };

  const handleBayarSekarang = async () => {
    setLoading(true);
    try {
      const data = {
        pesananId: order.id,
        nama_pemesan: order.nama_pemesan,
        tanggal: order.tanggal,
        pengiriman: order.pengiriman,
      };

      const res = await bayarPesanan(data);

      if (res.success && res.snapToken) {
        if (!window.snap) {
          alert("Snap belum dimuat!");
          return;
        }

        window.snap.pay(res.snapToken, {
          onSuccess: () => alert("Pembayaran Berhasil!"),
          onPending: () => alert("Menunggu Pembayaran..."),
          onError: () => alert("Pembayaran Gagal"),
          onClose: () => alert("Kamu menutup halaman pembayaran"),
        });
      } else {
        alert("Gagal mendapatkan Snap Token");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat memproses pembayaran");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
        <DootsLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <button
            onClick={onBack}
            className="text-purple-700 hover:text-purple-800 font-semibold mb-4 flex items-center gap-2"
          >
            ← Kembali
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

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left */}
          <div className="md:col-span-2 space-y-6">
            {/* Info Pengiriman */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-700" />
                Informasi Pengiriman
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Tanggal Pesanan</p>
                    <p className="text-gray-600">{order.tanggal}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Alamat</p>
                    <p className="text-gray-600">
                      {order.nama_pemesan} <br />
                      {order.alamat}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Pengiriman</p>
                    <p className="text-gray-600">{order.pengiriman}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Wallet2Icon className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Pembayaran</p>
                    <p className="text-gray-600">{order.pembayaran}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Produk */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Detail Produk</h2>

              {order.barang_dipesan.map((product, idx) => (
                <div key={idx} className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={product.gambar_barang}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/80?text=No+Image")
                      }
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{product.nama_barang}</h3>
                    <p className="text-sm text-gray-600">
                      Jumlah: {product.qty}{" "}
                      {product.satuan_dipilih ? `(${product.satuan_dipilih})` : ""}
                    </p>
                    <p className="text-xs text-gray-500">
                      Harga: Rp {product.harga_final.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <p className="font-bold text-purple-700">
                    Rp {(product.harga_final * product.qty).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Ringkasan Pembayaran</h2>

              <div className="flex justify-between text-sm pb-4 border-b">
                <span>Total</span>
                <span className="font-bold text-purple-700">
                  Rp {order.total_harga.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Tombol Bayar */}
              {order.pembayaran === "transfer" &&
                order.status_pembayaran !== "dibayar" &&
                order.status === "menunggu" && (
                  <button
                    onClick={handleBayarSekarang}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg mt-4"
                  >
                    Bayar Sekarang
                  </button>
                )}

              {order.status_pembayaran === "dibayar" && (
                <button
                  className="w-full bg-gray-400 text-white py-3 rounded-lg mt-4"
                  disabled
                >
                  Anda sudah membayar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
