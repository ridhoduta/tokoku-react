import React, { useState } from "react";
import { Package, Star, ShoppingCart, Eye } from "lucide-react";
import DootsLoader from "../Loader/DootsLoader";
import { useCart } from "./CartContext";

const BarangpItem = ({ product, setAlert, onSelect }) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    addToCart(product);
    setIsLoading(false);
    setAlert();
  };

  // ==========================
  //   AMBIL HARGA UTAMA
  // ==========================
  const getDisplayPrice = () => {
    const h = product?.harga;

    if (!h) return 0;

    if (product.satuan === "pcs") return h.pcs || 0;
    if (product.satuan === "dus") return h.dus?.harga_dus || 0;
    if (product.satuan === "kg") return h.kilo?.per_kilo || 0;

    return 0;
  };

  // ==========================
  //   HARGA LIST PER SATUAN
  // ==========================
  const getHargaList = () => {
    const h = product?.harga;

    if (!h) return [];

    if (product.satuan === "pcs") {
      return [{ label: "Harga per PCS", value: h.pcs }];
    }

    if (product.satuan === "dus") {
      return [
        { label: "Harga per Dus", value: h.dus?.harga_dus },
        { label: "Harga per PCS", value: h.dus?.harga_pcs_dus },
      ];
    }

    if (product.satuan === "kg") {
      return [
        { label: "Harga per KG", value: h.kilo?.per_kilo },
        { label: "Harga per 500g", value: h.kilo?.setengah_kilo },
        { label: "Harga per 250g", value: h.kilo?.seperempat_kilo },
      ];
    }

    return [];
  };

  const displayPrice = getDisplayPrice();

  return (
    <div className="max-w-sm mx-auto p-4 mb-6">
      <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col h-full">

        {/* IMAGE */}
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

        {/* CONTENT */}
        <div className="p-5 flex flex-col flex-grow">

          {/* Category */}
          <div className="mb-3">
            <span className="inline-block text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 leading-tight min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* PRICE */}
          <div className="flex items-center justify-between mb-4 mt-auto">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-0.5">Harga</span>
              <span className="text-2xl font-bold text-purple-700">
                Rp{Number(displayPrice).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1.5 rounded-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">4.5</span>
            </div>
          </div>

          {/* SATUAN & HARGA DETAIL */}
          <div className="mt-2 mb-4 bg-purple-50 p-3 rounded-lg">
            <div className="text-xs font-semibold text-purple-700 mb-1">
              Satuan: {product.satuan}
            </div>

            {getHargaList().map((item, i) => (
              <div key={i} className="flex justify-between text-sm text-gray-700">
                <span>{item.label}</span>
                <span className="font-semibold">
                  {typeof item.value === "number" && item.value !== null
                    ? "Rp " + item.value.toLocaleString("id-ID")
                    : item.value || "-"}
                </span>
              </div>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 flex-1 py-3 rounded-lg font-semibold text-sm
                transition-all duration-200 text-white shadow-sm
                ${isLoading
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

            {/* Details */}
            <button
              onClick={() => onSelect(product)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm
                bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 hover:shadow-sm active:scale-95"
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
