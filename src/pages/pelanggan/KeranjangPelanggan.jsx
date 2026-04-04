import { Trash2, ShoppingBag, Package } from "lucide-react";
import { useCart } from "../../component/BarangPelanggan/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function KeranjangPelanggan() {
  const { cartItems, updateQuantity, removeItem, clearCart, updateItemUnit } =
    useCart();
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  // Hitung subtotal berdasarkan harga dan quantity terbaru
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  const handleCheckout = () => {
    setStatus(true);
    navigate("/pelanggan/ringkasan-pesanan", {
      state: { status: true },
    });
  };

  // Fungsi untuk mengubah harga berdasarkan satuan yang dipilih
  const getPriceByUnit = (item, unit) => {
    if (item.satuan === "dus") {
      return unit === "dus"
        ? item.harga.dus.harga_dus
        : item.harga.dus.harga_pcs_dus;
    } else if (item.satuan === "kg") {
      if (unit === "kg") return item.harga.kilo.per_kilo;
      if (unit === "500gr") return item.harga.kilo.setengah_kilo;
      if (unit === "250gr") return item.harga.kilo.seperempat_kilo;
    } else if (item.satuan === "pcs") {
      return item.harga.pcs;
    }
    return 0;
  };
  // console.log(cartItems)

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Section */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-black mb-8 text-gray-900 tracking-tight">Keranjang Belanja</h1>

          <div className="flex gap-4 mb-6">
            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="font-medium">Hapus Semua</span>
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">
              Keranjang kamu kosong 😢
            </p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-premium transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0 p-2 border border-gray-100">
                      <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={item.gambar}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {item.name}
                      </h3>

                      {/* Pilihan satuan */}
                      <div className="mb-2 flex gap-2 text-sm">
                        {item.satuan === "pcs" && (
                          <>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name={`unit-${item.id}`}
                                value="dus"
                                checked={item.selectedUnit === "pcs"}
                                onChange={() => {
                                  const price = getPriceByUnit(item, "pcs");
                                  updateItemUnit(item.id, "pcs", price);
                                }}
                              />
                              pcs
                            </label>
                          </>
                        )}
                        {item.satuan === "dus" && (
                          <>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name={`unit-${item.id}`}
                                value="dus"
                                checked={item.selectedUnit === "dus"}
                                onChange={() => {
                                  const price = getPriceByUnit(item, "dus");
                                  updateItemUnit(item.id, "dus", price);
                                }}
                              />
                              Dus
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name={`unit-${item.id}`}
                                value="pcs"
                                checked={item.selectedUnit === "pcs"}
                                onChange={() => {
                                  const price = getPriceByUnit(item, "pcs");
                                  updateItemUnit(item.id, "pcs", price);
                                }}
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
                                onChange={() => {
                                  const price = getPriceByUnit(item, "kg");
                                  updateItemUnit(item.id, "kg", price);
                                }}
                              />
                              1 Kg
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name={`unit-${item.id}`}
                                value="500gr"
                                checked={item.selectedUnit === "500gr"}
                                onChange={() => {
                                  const price = getPriceByUnit(item, "500gr");
                                  updateItemUnit(item.id, "500gr", price);
                                }}
                              />
                              500 gr
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name={`unit-${item.id}`}
                                value="250gr"
                                checked={item.selectedUnit === "250gr"}
                                onChange={() => {
                                  const price = getPriceByUnit(item, "250gr");
                                  updateItemUnit(item.id, "250gr", price);
                                }}
                              />
                              250 gr
                            </label>
                          </>
                        )}
                      </div>
                      {/* {console.log(item)} */}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-lg font-bold text-gray-600">
                          -
                        </span>
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-lg font-bold text-gray-600">
                          +
                        </span>
                      </button>
                    </div>

                    {/* Total per item dan hapus */}
                    <div className="flex items-center gap-4">
                      <span className="font-black text-xl text-brand-700 min-w-[120px] text-right">
                        Rp{" "}
                        {((item.price ?? 0) * item.quantity).toLocaleString(
                          "id-ID"
                        )}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6">Ringkasan Pesanan</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-black text-xl">
                  <span>Total Belanja</span>
                  <span className="text-brand-700">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="w-full btn-primary py-4 mt-2 shadow-brand-500/20 shadow-xl"
              onClick={handleCheckout}
            >
              Checkout Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
