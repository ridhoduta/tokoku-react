import { Trash2, ShoppingBag, Package } from "lucide-react";
import { useCart } from "../../component/BarangPelanggan/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function KeranjangPelanggan() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const [status, setStatus] = useState(false);

  // ✅ Perhitungan harga numerik
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;
  const navigate = useNavigate();
  const handleChekcout = () => {
    setStatus(true);
    navigate("/pelanggan/ringkasan-pesanan", {
      state: {
        status: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Cart Section */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold mb-6">Keranjang</h1>

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
                  className="bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-purple-700">
                        <img
                          src={item.gambar}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-purple-700 font-bold">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
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
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-purple-700 min-w-[100px] text-right">
                        Rp{" "}
                        {(item.price * item.quantity).toLocaleString("id-ID")}
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
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Belanja</span>
                  <span className="text-purple-700">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
              onClick={handleChekcout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
