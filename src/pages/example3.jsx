import React, { useState } from 'react';
import { CheckCircle, X, Package, Calendar, MapPin } from 'lucide-react';

export default function OrderSuccessAlert() {
  const [showAlert, setShowAlert] = useState(true);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  if (showOrderDetail) {
    return <OrderDetailView onBack={() => setShowOrderDetail(false)} />;
  }

  if (!showAlert) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <button 
          onClick={() => setShowAlert(true)}
          className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800"
        >
          Show Success Alert
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"  />
      
      {/* Modal */}
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full z-50 relative animate-scale-in">
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

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
            Pesanan Anda telah berhasil dibuat dan sedang diproses. Kami akan mengirimkan notifikasi untuk update pesanan Anda.
          </p>

          {/* Order Info Card */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Nomor Pesanan</span>
              <span className="font-semibold text-purple-700">O-250921-AGPDDMI</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Total Pembayaran</span>
              <span className="font-bold text-lg">Rp 45.000</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">Senin, 21 Agustus 2025</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => setShowOrderDetail(true)}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Lihat Detail Pesanan
            </button>
            <button 
              
              className="w-full bg-white hover:bg-gray-50 text-purple-700 font-semibold py-3 rounded-lg border-2 border-purple-700 transition-colors"
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
}

function OrderDetailView({ onBack }) {
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
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              Sedang Diproses
            </span>
            <span className="text-gray-600">No Pesanan: O-250921-AGPDDMI</span>
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
                    <p className="font-medium">Tanggal Pengiriman</p>
                    <p className="text-gray-600">Senin, 21 Agustus 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Alamat Pengiriman</p>
                    <p className="text-gray-600">
                      Anggraini Dita Mahesa - 082335123457<br />
                      Jl. Plumeria Alba 97, RT/RW: 09/27, Kenanga, Merak, Kota Singasari
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Detail Produk</h2>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-center">
                    <div className="text-white font-bold text-sm">Fortune</div>
                    <div className="text-white text-xs">MINYAK GORENG</div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Minyak Fortune 2 Liter</h3>
                  <p className="text-xs text-gray-400 line-through">Rp 150.000</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded">
                      10 %
                    </span>
                    <span className="font-bold">Rp 45.000</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Jumlah: 1</p>
                </div>
                
                <div className="text-right font-bold">
                  Rp 45.000
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="space-y-6">
            {/* A-Point */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Potensi A-Point</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>A-Poin Belanja</span>
                  <span className="font-semibold text-purple-700">285 A-Poin</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bonus A-Poin</span>
                  <span className="font-semibold text-purple-700">0 A-Poin</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Ringkasan Pembayaran</h2>
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rp 45.000</span>
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
                <span className="text-xl font-bold text-purple-700">Rp 45.000</span>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors">
              Hubungi Penjual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}