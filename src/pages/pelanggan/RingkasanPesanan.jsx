import React, { useEffect, useState } from "react";
import { Clock, Package } from "lucide-react";
import { useCart } from "../../component/BarangPelanggan/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { createPesanan } from "../../api/pesananApi";
import ModalPesanan from "../../component/modal/ModalPesanan";
import DootsLoader from "../../component/Loader/DootsLoader";

const RingkasanPesanan = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const { status } = location.state || {};
  const navigate = useNavigate();
  const nama = localStorage.getItem("nama");
  const alamat = localStorage.getItem("alamat");
  const nomor_hp = localStorage.getItem("nomor_hp");

  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  const [pengiriman, setPengiriman] = useState("diantar");
  const [pembayaran, setPembayaran] = useState("transfer");

  useEffect(() => {
    if (!status) {
      alert("Konfirmasi pesanan dahulu sebelum menuju halaman ringkasan!");
      navigate("/pelanggan/keranjang");
    }
  }, [status, navigate]);

  // Subtotal dari item.price dan quantity, fallback 0 jika belum pilih satuan
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );
  const discount = 0;
  const total = subtotal - discount;

  const handleBayarSekarang = async () => {
    if (cartItems.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }

    // Pastikan semua item sudah pilih satuan
    for (let item of cartItems) {
      if (!item.selectedUnit) {
        alert(`Pilih satuan untuk barang: ${item.name}`);
        return;
      }
    }

    setIsLoading(true);

    const dataPesanan = {
      nama_pemesan: nama,
      alamat: alamat,
      barang_dipesan: cartItems.map((item) => ({
        barang_id: item.id,
        nama_barang: item.name,
        harga_final: item.price, // harga sesuai satuan dipilih
        qty: item.quantity,
        satuan_dipilih: item.selectedUnit, // wajib sesuai BE
        gambar_barang: item.gambar,
      })),
      total_harga: total,
      status: "menunggu",
      tanggal: new Date().toLocaleDateString("id-ID"),
      pengiriman,
      pembayaran,
    };
    console.log(cartItems)

    try {
      const res = await createPesanan(dataPesanan);
      if (res.success) {
        setModalData({
          pesananId: res.data.id || "O-XXXXX",
          subtotal: total.toLocaleString("id-ID"),
          tanggal: dataPesanan.tanggal,
          data: dataPesanan,
        });
      } else {
        alert(res.message || "Gagal membuat pesanan");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat membuat pesanan");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
        <DootsLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {modalData && (
        <ModalPesanan
          pesananId={modalData.pesananId}
          subtotal={modalData.subtotal}
          tanggal={modalData.tanggal}
          onDetail={() =>
            navigate("/pelanggan/pesanan-list")
          }
        />
      )}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Ringkasan Pesanan</h1>

          <div className="mb-8">
            <h2 className="font-semibold mb-4">Detail Penerima</h2>
            <div className="space-y-2 text-sm">
              <p>
                {nama} - {nomor_hp}
              </p>
              <p className="text-gray-600">{alamat}</p>
            </div>
          </div>

          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">Keranjang masih kosong 😢</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white border rounded-lg"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src={item.gambar} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.category || "Tanpa kategori"}</p>

                    {/* Radio button pilih satuan */}
                    <div className="flex gap-2 mt-2 text-sm">
                      {item.satuan === "dus" && (
                        <>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name={`unit-${item.id}`}
                              value="dus"
                              checked={item.selectedUnit === "dus"}
                              onChange={() =>
                                item.setSelectedUnit("dus") // pastikan di CartContext ada setter
                              }
                            />
                            Dus
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name={`unit-${item.id}`}
                              value="pcs"
                              checked={item.selectedUnit === "pcs"}
                              onChange={() =>
                                item.setSelectedUnit("pcs")
                              }
                            />
                            Pcs
                          </label>
                        </>
                      )}
                      {item.satuan === "kg" && (
                        <>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name={`unit-${item.id}`}
                              value="kg"
                              checked={item.selectedUnit === "kg"}
                              onChange={() =>
                                item.setSelectedUnit("kg")
                              }
                            />
                            1 Kg
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name={`unit-${item.id}`}
                              value="500g"
                              checked={item.selectedUnit === "500gr"}
                              onChange={() =>
                                item.setSelectedUnit("500gr")
                              }
                            />
                            500 g
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name={`unit-${item.id}`}
                              value="250g"
                              checked={item.selectedUnit === "250gr"}
                              onChange={() =>
                                item.setSelectedUnit("250gr")
                              }
                            />
                            250 g
                          </label>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-purple-700">
                        Rp {(item.price ?? 0).toLocaleString("id-ID")}
                      </span>
                      <span className="text-sm text-gray-600">x {item.quantity}</span>
                    </div>
                  </div>

                  <div className="text-right font-bold text-purple-700">
                    Rp {((item.price ?? 0) * item.quantity).toLocaleString("id-ID")}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-8">
          <h2 className="text-xl font-bold mb-4">Ringkasan Pembayaran</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Diskon</span>
              <span>Rp {discount.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t mb-6">
            <span className="font-bold">Total Belanja</span>
            <span className="text-xl font-bold text-purple-700">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="mb-8 pb-8 border-b">
            <h2 className="font-semibold mb-4">Metode Pengiriman</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pengiriman"
                  value="diambil"
                  checked={pengiriman === "diambil"}
                  onChange={(e) => setPengiriman(e.target.value)}
                />
                <span>Diambil Langsung</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pengiriman"
                  value="diantar"
                  checked={pengiriman === "diantar"}
                  onChange={(e) => setPengiriman(e.target.value)}
                />
                <span>Diantar ke Alamat</span>
              </label>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
              <span className="text-sm text-gray-600">
                Maksimal 1 jam setelah pembayaran selama jam operasional (07:00 - 21:00)
              </span>
            </div>
          </div>

          <div className="mb-8 pb-8 border-b">
            <h2 className="font-semibold mb-4">Metode Pembayaran</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pembayaran"
                  value="cod"
                  checked={pembayaran === "cod"}
                  onChange={(e) => setPembayaran(e.target.value)}
                />
                <span>COD (Bayar di Tempat)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pembayaran"
                  value="transfer"
                  checked={pembayaran === "transfer"}
                  onChange={(e) => setPembayaran(e.target.value)}
                />
                <span>Transfer (Midtrans)</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleBayarSekarang}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Buat Pesanan
          </button>
        </div>
      </div>
    </div>
  );
};

export default RingkasanPesanan;
