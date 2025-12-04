import React from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Fixed with full width */}
      <header className="border-b w-full fixed top-0 bg-white z-50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16 max-w-screen-2xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-700 rounded flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TOKOKU</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#beranda" className="text-gray-600 hover:text-gray-900 transition">
                Beranda
              </a>
              <a href="#fitur" className="text-gray-600 hover:text-gray-900 transition">
                Fitur
              </a>
              <a href="#cara-kerja" className="text-gray-600 hover:text-gray-900 transition">
                Cara Kerja
              </a>
              <a href="#kontak" className="text-gray-600 hover:text-gray-900 transition">
                Kontak
              </a>
            </nav>
            <button className="bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-purple-800 transition text-sm sm:text-base" onClick={()=> navigate('/login') }>
              Daftar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Full Width */}
      <section id="beranda" className="w-full bg-gradient-to-br from-purple-50 via-purple-25 to-white pt-24 sm:pt-28 pb-12 sm:pb-20">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  BELANJA KEBUTUHAN HARIAN JADI LEBIH MUDAH
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  TOKOKU Hadir untuk memudahkan kamu belanja kebutuhan harian
                  dengan mudah dan cepat. Nikmati pengalaman belanja yang praktis dan tanpa ribet di ujung jari kamu.
                </p>
              </div>

              <div className="order-1 lg:order-2 relative w-full flex justify-center lg:justify-end">
                <img
                  src="https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/Vector.png"
                  alt="TOKOKU Dashboard"
                  className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Full Width */}
      <section id="fitur" className="w-full py-12 sm:py-20 bg-purple-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center lg:text-left">
              Fitur-fitur <span className="text-purple-700">TOKOKU</span>
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: "🍜", title: "Berbagai Produk", bg: "bg-orange-100" },
                { icon: "🍦", title: "Kualitas Terjamin", bg: "bg-yellow-100" },
                { icon: "📦", title: "Pengiriman Cepat", bg: "bg-orange-100" },
                { icon: "🏪", title: "Belanja Mudah", bg: "bg-blue-100" },
              ].map((feature, idx) => (
                <div key={idx} className="text-center group hover:transform hover:scale-105 transition-transform">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.bg} rounded-xl flex items-center justify-center text-2xl sm:text-3xl`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Full Width */}
      <section className="w-full py-12 sm:py-20 bg-purple-800 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">
              Mengapa Memilih <span className="text-purple-200">TOKOKU</span> ?
            </h2>
            <p className="text-center text-purple-200 mb-8 sm:mb-12 max-w-3xl mx-auto text-sm sm:text-base px-4">
              Kami hadir dengan pengalaman belanja yang mudah dan efisien untuk kebutuhan sehari-hari. Berikut ini keunggulan yang kami tawarkan untuk mendukung kenyamanan dan kepuasan Anda dalam berbelanja.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: "💰", title: "Harga Bersahabat", desc: "Dapatkan berbagai produk dengan harga terjangkau yang cocok untuk kantong Anda." },
                { icon: "🛍️", title: "Produk Berkualitas", desc: "Semua produk dipilih dengan teliti untuk memastikan kualitas terbaik yang Anda dapatkan." },
                { icon: "📋", title: "Pembayaran Fleksibel", desc: "Berbagai pilihan metode pembayaran yang memudahkan Anda dalam setiap transaksi." },
                { icon: "👥", title: "Pelayanan Ramah", desc: "Tim customer service yang siap membantu Anda dengan responsif dan ramah." },
              ].map((benefit, idx) => (
                <div key={idx} className="text-center hover:transform hover:scale-105 transition-transform">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-white rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-lg">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold mb-2 text-base sm:text-lg">{benefit.title}</h3>
                  <p className="text-xs sm:text-sm text-purple-200 px-2">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Shop Section - Full Width */}
      <section id="cara-kerja" className="w-full py-12 sm:py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">
              Cara Belanja di <span className="text-purple-700">TOKOKU</span> ?
            </h2>
            <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">
              Proses belanja yang mudah hanya dengan 3 langkah sederhana
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              {[
                { num: "1", title: "Pilih Produk", desc: "Jelajahi berbagai produk yang tersedia. Pilih produk yang Anda inginkan, lihat detail informasi produk yang tersedia." },
                { num: "2", title: "Pesan & Bayar", desc: "Masukkan produk ke keranjang belanja Anda. Pilih metode pembayaran yang sesuai dengan kebutuhan Anda." },
                { num: "3", title: "Terima Pesanan", desc: "Tunggu pesanan Anda tiba di alamat yang telah Anda daftarkan. Nikmati produk berkualitas yang Anda pesan." },
              ].map((step) => (
                <div key={step.num} className="text-center hover:transform hover:scale-105 transition-transform">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-purple-700 text-white rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-lg hover:bg-purple-600 transition">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Full Width */}
      <section id="kontak" className="w-full py-12 sm:py-20 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1 relative w-full flex justify-center">
                <img
                  src="https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/Vector.png"
                  alt="TOKOKU CTA"
                  className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-3xl shadow-2xl object-cover"
                />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                  Siap Memulai Belanja?
                </h2>
                <p className="text-base sm:text-lg text-purple-100 mb-6 sm:mb-8 leading-relaxed">
                  Daftar untuk membuat akun baru dan mulai berbelanja produk-produk terbaik dengan berbagai penawaran menarik. Dapatkan kemudahan dalam berbelanja dan temukan produk yang Anda inginkan.
                </p>
                <button className="bg-white text-purple-700 px-6 sm:px-8 py-3 rounded-lg hover:bg-purple-50 transition font-bold shadow-lg hover:shadow-xl w-full sm:w-auto" 
                onClick={()=> navigate('/login')}>
                  Daftar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Full Width */}
      <footer className="w-full bg-gray-900 text-white py-8 sm:py-12">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-purple-700 rounded flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">TOKOKU</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Belanja kebutuhan harian jadi lebih mudah dan praktis
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Tentang</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
                  <li><a href="#" className="hover:text-white transition">Karir</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Bantuan</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition">Hubungi Kami</a></li>
                  <li><a href="#" className="hover:text-white transition">Syarat & Ketentuan</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Ikuti Kami</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                  <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2025 TOKOKU. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}