import React from "react";
import { ShoppingBag, Users, Github, Music, Instagram } from "lucide-react";
import Navbar from "../component/layout/Navbar";
import Footer from "../component/layout/Footer";

export default function Tentang() {
  const teamMembers = [
    {
      name: "Ridho Duta Yuwana",
      role: "PM",
      photo:
        "https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/WhatsApp%20Image%202025-12-11%20at%2016.06.55.jpeg",
      description:
        "Ridho Duta Yuwana bertanggung jawab penuh pada pengembangan kode (coding) serta implementasi fungsi-fungsi utama sistem. Selain membangun fitur aplikasi, Ridho juga melakukan hosting dan deployment agar aplikasi dapat dijalankan secara online dan diakses oleh pengguna.",
      instagram: "https://www.instagram.com/dutaywn/",
      tiktok: "#",
      github: "#",
    },
    {
      name: "Serly Tritanti",
      role: "Anggota",
      photo:
        "https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/WhatsApp%20Image%202025-12-11%20at%2019.31.49.jpeg",
      description:
        "Serly Tritanti berperan sebagai perancang antarmuka aplikasi dengan membuat desain UI melalui Figma agar tampilan sistem mudah digunakan dan konsisten. Selain itu, Serli juga menyusun Configuration Guide Book sebagai panduan konfigurasi sistem untuk memastikan proses setup dapat dilakukan dengan benar.",
      instagram: "https://www.instagram.com/errrianaaa?igsh=MWh2ZXRtMHdtdmZoeQ==",
      tiktok: " https://www.tiktok.com/@albirunifarabi?_r=1&_t=ZS-928MOasFDxk",
      github: "#",
    },
    {
      name: "Aldo Wahyu Adiwangsa",
      role: "Anggota",
      photo:
        "https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/WhatsApp%20Image%202025-12-11%20at%2019.31.49%20(1).jpeg",
      description:
        "Aldo Wahyu Adiwangsa bertanggung jawab dalam penyusunan dokumen Software Requirements Specification (SRS) sebagai dasar kebutuhan sistem. Aldo juga membantu dokumentasi proyek serta melakukan quality control untuk memastikan seluruh dokumen dan hasil pekerjaan memenuhi standar dan terbebas dari kesalahan.",
      instagram: "https://www.instagram.com/aldowhyu_05?igsh=MXFyNzRhdW1ubmhsbg==",
      tiktok: "https://www.tiktok.com/@aldowhyu_05",
      github: "#",
    },
    {
      name: "Muhammad Ghibran Rafaelo",
      role: "Anggota",
      photo:
        "https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/WhatsApp%20Image%202025-12-11%20at%2019.31.48.jpeg",
      description:
        "Muhammad Ghibran Rafaelo bertugas membuat video demonstrasi aplikasi sebagai dokumentasi multimedia yang menjelaskan fungsi dan cara kerja sistem. Selain itu, Ghibran turut mendukung proses quality control dengan memastikan kesesuaian antara video, dokumentasi, dan fitur aplikasi.",
      instagram: "https://www.instagram.com/muhh.ghibranr/",
      tiktok: "",
      github: "#",
    },
    {
      name: "Bima Nur Khoiri",
      role: "Anggota",
      photo:
        "https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/WhatsApp%20Image%202025-12-11%20at%2019.31.48%20(1).jpeg",
      description:
        "Bima Nur Khoiri menyusun Manual Book sebagai panduan penggunaan aplikasi agar pengguna memahami cara mengoperasikan sistem. Bima juga berkontribusi dalam dokumentasi tambahan serta quality control, termasuk pengecekan akhir sebelum laporan dan hasil proyek diselesaikan.",
      instagram: "https://www.instagram.com/_biim4?igsh=Y3N0bGNhdXdieXhx",
      tiktok: "https://www.tiktok.com/@_bimbima?_r=1&_t=ZS-928MdtyKFFq",
      github: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Fixed */}
      <header className="border-b w-full fixed top-0 bg-white z-50 shadow-sm">
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Tentang <span className="text-purple-200">TOKOKU</span>
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Kami adalah tim yang berdedikasi untuk menghadirkan pengalaman
              belanja online terbaik untuk kebutuhan harian Anda
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-16 sm:py-24 bg-purple-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Cerita <span className="text-purple-700">TOKOKU</span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    TOKOKU dimulai dari sebuah visi sederhana: membuat belanja
                    kebutuhan harian menjadi lebih mudah dan menyenangkan. Kami
                    memahami bahwa waktu adalah aset berharga, dan tidak semua
                    orang memiliki waktu luang untuk pergi ke pasar atau
                    supermarket.
                  </p>
                  <p>
                    Sejak diluncurkan pada tahun 2020, kami telah melayani
                    ribuan pelanggan di seluruh Indonesia. Dengan komitmen untuk
                    terus berinovasi, kami menghadirkan berbagai fitur yang
                    memudahkan proses belanja online Anda.
                  </p>
                  <p>
                    Tim kami terdiri dari profesional berpengalaman yang
                    berdedikasi untuk memberikan layanan terbaik. Kami percaya
                    bahwa kepuasan pelanggan adalah kunci kesuksesan, dan kami
                    bekerja keras setiap hari untuk mewujudkannya.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <img
                  src="https://qvpjaduprxeeowfxzrkk.supabase.co/storage/v1/object/public/Storage/WhatsApp%20Image%202025-12-04%20at%2023.40.58.jpeg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-16 sm:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <Users className="w-8 h-8 text-purple-700" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Tim <span className="text-purple-700">TOKOKU</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Kenalan dengan orang-orang hebat di balik kesuksesan TOKOKU yang
                siap melayani Anda dengan sepenuh hati
              </p>
            </div>

            {/* Team Members Grid */}
            <div className="space-y-12">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-12 items-center bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-all group`}
                >
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-purple-200 shadow-2xl group-hover:scale-105 transition-transform">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-700 rounded-full flex items-center justify-center shadow-xl">
                        <span className="text-3xl font-bold text-white">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <div className="inline-block bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      {member.role}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6 text-base sm:text-lg">
                      {member.description}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                      {/* TikTok */}
                      <a
                        href={member.tiktok}
                        className="w-12 h-12 bg-white border-2 border-purple-200 rounded-full flex items-center justify-center hover:bg-purple-700 hover:border-purple-700 hover:text-white transition group/icon"
                      >
                        <Music className="w-5 h-5 text-purple-700 group-hover/icon:text-white" />
                      </a>

                      {/* Instagram */}
                      <a
                        href={member.instagram}
                        className="w-12 h-12 bg-white border-2 border-purple-200 rounded-full flex items-center justify-center hover:bg-purple-700 hover:border-purple-700 hover:text-white transition group/icon"
                      >
                        <Instagram className="w-5 h-5 text-purple-700 group-hover/icon:text-white" />
                      </a>

                      {/* GitHub */}
                      <a
                        href={member.github}
                        className="w-12 h-12 bg-white border-2 border-purple-200 rounded-full flex items-center justify-center hover:bg-purple-700 hover:border-purple-700 hover:text-white transition group/icon"
                      >
                        <Github className="w-5 h-5 text-purple-700 group-hover/icon:text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-16 sm:py-24 bg-white" id="video">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Video <span className="text-purple-700">TOKOKU</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Berikut adalah video dokumentasi dan penjelasan mengenai sistem
              TOKOKU.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/-H_mBqjyr-k?si=5vke6sE9-lAgrF6N"
                title="Video TOKOKU"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 sm:py-24 bg-purple-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-screen-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Dokumentasi <span className="text-purple-700">TOKOKU</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Akses berbagai panduan dan dokumentasi resmi untuk memahami
              bagaimana aplikasi ini berjalan dan dibuat
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* API Documentation */}
            <a
              href="https://drive.google.com/file/d/11nrfiSoTulFqa9CsUntj-e86rXkXx8jG/view?usp=drive_link"
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
              target="blank"
            >
              <div className="text-purple-700 mb-4 text-4xl group-hover:scale-110 transition">
                📘
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dokumen Development
              </h3>
              <p className="text-gray-600">
                Penjelasan lengkap tentang bagaimana aplikasi dibuat
              </p>
            </a>

            {/* Admin Guide */}
            <a
              href="https://drive.google.com/file/d/1c_5mmzONJtojKMSZ3qvgemQwNn1hDQzy/view?usp=drive_link"
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
              target="blank"
            >
              <div className="text-purple-700 mb-4 text-4xl group-hover:scale-110 transition">
                🛠️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Manual Book
              </h3>
              <p className="text-gray-600">
                Panduan lengkap untuk menggunakan aplikasi ini.
              </p>
            </a>

            {/* User Guide */}
            <a
              href="https://drive.google.com/file/d/1Z3_y7TsYQAPwRf8R75nQaZAgU9pHsQ-H/view?usp=drive_link"
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition group"
              target="blank"
            >
              <div className="text-purple-700 mb-4 text-4xl group-hover:scale-110 transition">
                📱
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dokument Deployment
              </h3>
              <p className="text-gray-600">
                Berisi langkah langkah aplikasi ini di deploy
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
