import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Package, Calendar, MapPin } from "lucide-react";
import { getPesananById } from "../../api/pesananApi";

const DetailPesanan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pesananId } = location.state || {};

  const [pesanan, setPesanan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onBack = () => navigate("/pelanggan/pesanan-list");

  useEffect(() => {
    const fetchPesanan = async () => {
      if (!pesananId) {
        alert("ID pesanan tidak ditemukan!");
        navigate("/pelanggan/keranjang");
        return;
      }

      try {
        setIsLoading(true);
        const res = await getPesananById(pesananId);
        if (res.success) {
          setPesanan(res.data);
        } else {
          alert(res.message || "Gagal memuat data pesanan");
        }
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat mengambil data pesanan");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPesanan();
  }, [pesananId, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Memuat detail pesanan...
      </div>
    );
  }

  if (!pesanan) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Data pesanan tidak ditemukan.
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
                pesanan.status === "selesai"
                  ? "bg-green-100 text-green-700"
                  : pesanan.status === "menunggu"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {pesanan.status}
            </span>
            <span className="text-gray-600">
              No Pesanan: {pesanan.id || pesanan.kode_pesanan}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-700" />
                Informasi Pengiriman
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Tanggal Pemesanan</p>
                    <p className="text-gray-600">{pesanan.tanggal}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Alamat Pengiriman</p>
                    <p className="text-gray-600">
                      {pesanan.nama_pemesan} - {pesanan.nomor_hp}
                      <br />
                      {pesanan.alamat}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Metode Pengiriman</p>
                    <p className="text-gray-600">{pesanan.pengiriman}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Metode Pembayaran</p>
                    <p className="text-gray-600">{pesanan.pembayaran}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Detail Produk</h2>
              {pesanan.barang_dipesan?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border rounded-lg mb-3"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.gambar_barang}
                      alt={item.nama_barang}
                      className="w-20 h-20 object-cover rounded-lg border"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/80?text=No+Image")
                      } // fallback jika gambar rusak
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.nama_barang}</h3>
                    <p className="font-bold text-gray-800">
                      Rp {item.harga_barang.toLocaleString("id-ID")}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Jumlah: {item.qty}
                    </p>
                  </div>

                  <div className="text-right font-bold">
                    Rp {(item.harga_barang * item.qty).toLocaleString("id-ID")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Ringkasan Pembayaran</h2>
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rp {pesanan.total_harga.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Diskon</span>
                  <span className="text-green-600">Rp 0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ongkir</span>
                  <span>Rp 0</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold text-purple-700">
                  Rp {pesanan.total_harga.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors">
              Hubungi Penjual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPesanan;
