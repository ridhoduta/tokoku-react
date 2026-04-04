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
    <div className="mx-auto w-full mb-6">
      <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-premium transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full active:scale-[0.98]">

        {/* IMAGE */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-[4/3] overflow-hidden">
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
            <span className="inline-block text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-100 uppercase tracking-wider">
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
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Harga</span>
              <span className="text-xl sm:text-2xl font-black text-brand-700">
                Rp{Number(displayPrice).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1.5 rounded-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">4.5</span>
            </div>
          </div>

          {/* SATUAN & HARGA DETAIL */}
          <div className="mt-2 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-200 pb-1">
              Satuan Utama: <span className="text-brand-600">{product.satuan}</span>
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
          <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
            {/* Details */}
            <button
              onClick={() => onSelect(product)}
              className="flex items-center justify-center p-3 rounded-xl 
                bg-brand-50 text-brand-600 hover:bg-brand-100 hover:text-brand-800 transition-colors duration-200"
              title="Lihat Detail Produk"
            >
              <Eye className="w-5 h-5" />
            </button>

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-xl font-bold text-sm
                transition-all duration-300
                ${isLoading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "btn-primary shadow-lg shadow-brand-500/20 hover:-translate-y-0.5"
                }`}
            >
              {isLoading ? (
                <>
                  <DootsLoader />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-white" />
                  <span>+ Keranjang</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BarangpItem;
