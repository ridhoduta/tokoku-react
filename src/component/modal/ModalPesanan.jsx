import { Calendar, CheckCircle, X, XCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ModalPesanan = ({ pesananId, subtotal, tanggal, onDetail }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

      {/* Modal */}
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full z-50 relative animate-scale-in">
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Pesanan Berhasil!
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            Pesanan Anda telah berhasil dibuat dan sedang diproses. Kami akan
            mengirimkan notifikasi untuk update pesanan Anda.
          </p>

          {/* Order Info Card */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Nomor Pesanan</span>
              <span className="font-semibold text-purple-700">{pesananId}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Total Pembayaran</span>
              <span className="font-bold text-lg">{subtotal}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">{tanggal}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors"
              onClick={onDetail}
            >
              Lihat Detail Pesanan
            </button>
            <button
              className="w-full bg-white hover:bg-gray-50 text-purple-700 font-semibold py-3 rounded-lg border-2 border-purple-700 transition-colors"
              onClick={() => navigate("/pelanggan/home")}
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ModalPesanan;
