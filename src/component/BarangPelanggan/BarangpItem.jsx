import React, { useState } from "react";
import {
  Package,
  Star,
  ShoppingCart,
} from "lucide-react";
import DootsLoader from "../Loader/DootsLoader";
import { useCart } from "./CartContext";


const BarangpItem = ({ product , setAlert}) => {
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
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 border border-gray-100 flex flex-col">
      {/* Product Image */}
      {/* Product Image */}
      <div className="relative bg-white h-48 flex items-center justify-center overflow-hidden">
        {product.gambar ? (
          <img
            src={product.gambar}
            alt={product.nama_barang}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <Package className="w-12 h-12 mb-2" />
            <span className="text-sm">Tidak ada gambar</span>
          </div>
        )}

        <div className="absolute top-2 right-2 bg-purple-700 text-white text-xs px-2 py-1 rounded">
          Promo
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="flex flex-col flex-grow">
          <div className="text-xs text-purple-700 font-medium mb-2 bg-purple-50 inline-block px-2 py-1 rounded">
            {product.category}
          </div>
          <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-purple-700">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">4.5</span>
            </div>
          </div>
        </div>

        {/* Tombol tambah ke keranjang */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-medium transition-all duration-200 
            ${
              isLoading
                ? "bg-purple-500 cursor-not-allowed opacity-80"
                : "bg-purple-700 hover:bg-purple-800 text-white"
            }`}
        >
          {isLoading ? (
            <>
              <DootsLoader/>
              Menambahkan...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Tambah ke Keranjang
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BarangpItem;
