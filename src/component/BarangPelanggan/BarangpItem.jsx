import React, { useState } from "react";
import { Package, Star, ShoppingCart, Eye } from "lucide-react";
import DootsLoader from "../Loader/DootsLoader";
import { useCart } from "./CartContext";

const BarangpItem = ({ product, setAlert, onSelect }) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <div className="max-w-sm mx-auto p-4 mb-6">
      <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col h-full">
        {/* ==================== IMAGE SECTION ==================== */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-square overflow-hidden">
          {product.gambar ? (
            <img
              src={product.gambar}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Package className="w-16 h-16 mb-2 opacity-50" />
              <span className="text-sm">Tidak ada gambar</span>
            </div>
          )}
        </div>

        {/* ==================== CONTENT SECTION ==================== */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 leading-tight min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Price & Rating Section */}
          <div className="flex items-center justify-between mb-4 mt-auto">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-0.5">Harga</span>
              <span className="text-2xl font-bold text-purple-700">
                Rp{product.price.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1.5 rounded-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">4.5</span>
            </div>
          </div>

          {/* ==================== ACTION BUTTONS ==================== */}
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            {/* Add To Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 flex-1 py-3 rounded-lg font-semibold text-sm
                transition-all duration-200 text-white shadow-sm
                ${
                  isLoading
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:shadow-md active:scale-95"
                }`}
            >
              {isLoading ? (
                <>
                  <DootsLoader />
                  <span>Menambahkan...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Keranjang</span>
                </>
              )}
            </button>

            {/* View Details Button */}
            <button
              onClick={() => onSelect(product)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm
                bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 
                hover:shadow-sm active:scale-95"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Detail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangpItem;
