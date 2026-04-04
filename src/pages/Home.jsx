import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../component/layout/Navbar";
import Footer from "../component/layout/Footer";
import { ShoppingBag } from "lucide-react";

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Fixed with full width */}
      <Navbar/>
      {/* Hero Section - Full Width */}
      <section id="beranda" className="w-full bg-gradient-to-br from-brand-50 via-white to-accent-50 pt-32 pb-20 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-200/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-200/20 rounded-full blur-3xl -z-10"></div>

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] text-balance">
                BELANJA KEBUTUHAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-800">HARIAN</span> JADI LEBIH MUDAH
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                TOKOKU hadir untuk memudahkan Anda belanja kebutuhan harian dengan pengalaman yang praktis, cepat, dan aman. Nikmati kemudahan berbelanja di ujung jari Anda.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="btn-primary px-10 py-4 text-lg" onClick={() => navigate('/login')}>Mulai Belanja</button>
                <button className="btn-secondary px-8 py-4 text-lg" onClick={() => document.getElementById('fitur')?.scrollIntoView({ behavior: 'smooth' })}>Lihat Fitur</button>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative w-full flex justify-center lg:justify-end animate-in fade-in zoom-in duration-700">
              <div className="relative p-2 bg-white/50 backdrop-blur-sm rounded-[2.5rem] shadow-premium ring-1 ring-white/20">
                <img
                  src="https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/Vector.png"
                  alt="TOKOKU Dashboard"
                  className="w-full max-w-sm sm:max-w-md lg:max-w-xl rounded-[2rem] object-cover shadow-2xl"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl flex items-center gap-3 animate-bounce shadow-xl">
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Promo Hari Ini</p>
                    <p className="text-sm font-bold text-gray-900">Diskon hingga 50%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Full Width */}
      <section id="fitur" className="w-full py-24 bg-white relative">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Fitur Unggulan <span className="text-brand-600">TOKOKU</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Nikmati berbagai kemudahan yang kami rancang khusus untuk memenuhi kebutuhan belanja harian Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🍜", title: "Berbagai Produk", desc: "Ribuan pilihan produk harian lengkap dalam satu aplikasi.", bg: "bg-orange-50", color: "text-orange-600" },
              { icon: "🍦", title: "Kualitas Terjamin", desc: "Kami hanya menyediakan produk dengan standar kualitas terbaik.", bg: "bg-blue-50", color: "text-blue-600" },
              { icon: "📦", title: "Pengiriman Cepat", desc: "Pesanan Anda sampai tepat waktu di depan pintu rumah.", bg: "bg-green-50", color: "text-green-600" },
              { icon: "🏪", title: "Belanja Mudah", desc: "Antarmuka yang simpel memudahkan siapa saja berbelanja.", bg: "bg-brand-50", color: "text-brand-600" },
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-premium transition-all duration-300 border border-transparent hover:border-brand-100">
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section - Full Width */}
      <section className="w-full py-24 bg-brand-900 text-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-800/50 skew-x-12 transform translate-x-1/4 -z-0"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Mengapa Memilih <span className="text-brand-400">TOKOKU</span>?
              </h2>
              <p className="text-lg text-brand-100 mb-10 leading-relaxed">
                Kami berkomitmen memberikan layanan terbaik untuk setiap pelanggan. Kenyamanan dan kepuasan Anda adalah prioritas utama kami.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: "💰", title: "Harga Bersahabat", desc: "Harga kompetitif yang pas di kantong." },
                  { icon: "🛍️", title: "Produk Pilihan", desc: "Hanya produk berkualitas yang dikirim." },
                  { icon: "📋", title: "Pembayaran Mudah", desc: "Berbagai metode pembayaran aman." },
                  { icon: "👥", title: "Layanan 24/7", desc: "Tim kami siap membantu kapan saja." },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-2xl">{benefit.icon}</div>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">{benefit.title}</h4>
                      <p className="text-xs text-brand-200">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-brand-600 to-brand-400 rounded-3xl rotate-3 absolute inset-0 -z-10 blur-2xl opacity-20"></div>
              <div className="glass-card p-2 rounded-[2rem] border-white/10">
                <img 
                  src="https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/Vector.png" 
                  alt="Quality" 
                  className="rounded-[1.5rem] w-full shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Shop Section - Full Width */}
      <section id="cara-kerja" className="w-full py-24 bg-white relative">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Cara Belanja di <span className="text-brand-600">TOKOKU</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Proses belanja yang mudah hanya dengan 3 langkah sederhana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-brand-100 -z-0"></div>

            {[
              { num: "1", title: "Pilih Produk", desc: "Jelajahi berbagai produk berkualitas tinggi yang tersedia di katalog kami." },
              { num: "2", title: "Pesan & Bayar", desc: "Masukkan ke keranjang dan pilih metode pembayaran yang paling nyaman bagi Anda." },
              { num: "3", title: "Terima Pesanan", desc: "Tunggu kurir kami mengantarkan pesanan langsung ke depan pintu rumah Anda." },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 text-center space-y-6 group">
                <div className="w-24 h-24 mx-auto bg-white border-4 border-brand-50 rounded-full flex items-center justify-center text-3xl font-bold text-brand-600 shadow-xl group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  {step.num}
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-2xl text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Full Width */}
      <section id="kontak" className="w-full py-24 relative overflow-hidden bg-white">
        <div className="container-custom">
          <div className="bg-brand-600 rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-premium">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-700 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-8 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Tunggu Apa Lagi? Mulai Belanja Sekarang!
                </h2>
                <p className="text-lg text-brand-100 opacity-90 max-w-xl mx-auto lg:mx-0">
                  Bergabunglah dengan ribuan pelanggan puas lainnya. Dapatkan akses ke produk kualitas terbaik dengan harga yang tidak tertandingi.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button className="bg-white text-brand-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-brand-50 transition-all shadow-xl hover:shadow-2xl active:scale-95" onClick={() => navigate('/login')}>
                    Daftar Sekarang
                  </button>
                  <button className="bg-brand-700 text-white border border-brand-500 px-10 py-4 rounded-xl font-bold text-lg hover:bg-brand-800 transition-all shadow-xl active:scale-95" onClick={() => {document.getElementById('beranda')?.scrollIntoView({ behavior: 'smooth' })}}>
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>
              
              <div className="relative hidden lg:block animate-pulse">
                <div className="absolute inset-0 bg-white/20 rounded-[2rem] blur-xl opacity-30"></div>
                <img
                  src="https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/Vector.png"
                  alt="CTA illustration"
                  className="w-full max-w-md mx-auto rounded-[2rem] shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Full Width */}
      <Footer/>
    </div>
  );
}