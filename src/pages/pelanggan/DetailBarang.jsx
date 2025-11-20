import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../component/BarangPelanggan/CartContext";
import DootsLoader from "../../component/Loader/DootsLoader";
import { ShoppingCart, Package, Tag, CheckCircle } from 'lucide-react';

export default function DetailBarang() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const product = state?.product;

  // Jika user buka langsung tanpa state → redirect
  if (!product) {
    return (
      <div className="p-6">
        <p>Produk tidak ditemukan.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-4 py-2 rounded mt-4"
        >
          Kembali
        </button>
      </div>
    );
  }
  const handleAddToCart = async () => {
    setIsLoading(true);

    // Simulasi delay proses menambahkan ke keranjang
    await new Promise((resolve) => setTimeout(resolve, 800));

    addToCart(product);
    setIsLoading(false);
    setAlert();

    // Notifikasi otomatis hilang setelah 2,5 detik
    setTimeout(() => setShowAlert(false), 2500);
  };

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-purple-600 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-purple-600 cursor-pointer">
            {product.category}
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Bagian Kiri - Gambar Produk */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-12 flex items-center justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-purple-600 rounded-2xl blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <img
                  src={product.gambar}
                  alt={product.name}
                  className="relative w-full h-auto max-w-lg object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Promo Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Produk Berkualitas
                </span>
              </div>
            </div>

            {/* Bagian Kanan - Detail Produk */}
            <div className="flex flex-col p-12 space-y-8">
              {/* Category Badge */}
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 bg-purple-50 px-4 py-2 rounded-full">
                  <Package className="w-4 h-4" />
                  {product.category}
                </span>
              </div>

              {/* Nama Produk */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Harga */}
              <div className="flex items-baseline gap-4 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Harga</p>
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    Rp{product.price.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Stock Info */}
              <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-semibold">
                  Stok tersedia:{" "}
                  <span className="font-bold">{product.stock} unit</span>
                </span>
              </div>

              {/* Deskripsi */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Deskripsi Produk
                </h2>
                <div className="prose prose-sm text-gray-600 leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam dolores corporis quaerat architecto ipsum
                    reiciendis est eos. Quo voluptas dolorem quas fuga quod
                    eligendi repudiandae labore maxime quasi aperiam maiores
                    nisi ipsam autem, sequi ducimus et numquam ad aspernatur!
                    Delectus voluptas, cupiditate velit quaerat fugiat sint
                    libero veritatis porro temporibus.
                  </p>
                </div>
              </div>

              {/* Tombol Add to Cart */}
              <div className="pt-6">
                <button
                  disabled={product.stock === 0 || isLoading}
                  className={`w-full py-5 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all duration-200 shadow-lg ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : isLoading
                      ? "bg-purple-500 cursor-not-allowed opacity-80 text-white"
                      : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  onClick={handleAddToCart}
                >
                  {product.stock === 0 ? (
                    "Stok Habis"
                  ) : isLoading ? (
                    <>
                      <DootsLoader />
                      <span>Menambahkan ke Keranjang...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      <span>Tambah ke Keranjang</span>
                    </>
                  )}
                </button>
              </div>

              {/* Info Tambahan */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">✓</p>
                  <p className="text-xs text-gray-600 mt-1">Gratis Ongkir</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">24/7</p>
                  <p className="text-xs text-gray-600 mt-1">Support</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">100%</p>
                  <p className="text-xs text-gray-600 mt-1">Original</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
