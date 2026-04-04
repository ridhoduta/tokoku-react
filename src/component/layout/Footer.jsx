import React from "react";
import { ShoppingBag, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 via-brand-600 to-accent-500"></div>

            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">TOKOKU</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Solusi belanja kebutuhan harian terlengkap, termurah, dan tercepat. Kami hadir untuk memudahkan hidup Anda setiap hari.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Navigasi Cepat</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#beranda" className="hover:text-brand-400 transition-colors">Beranda</a></li>
                            <li><a href="#fitur" className="hover:text-brand-400 transition-colors">Fitur Utama</a></li>
                            <li><a href="#cara-kerja" className="hover:text-brand-400 transition-colors">Cara Kerja</a></li>
                            <li><a href="/tentang" className="hover:text-brand-400 transition-colors">Tentang Kami</a></li>
                            <li><a href="#kontak" className="hover:text-brand-400 transition-colors">Hubungi Kami</a></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Layanan Pelanggan</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Bantuan FAQ</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Metode Pembayaran</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Pengembalian Barang</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Hubungi Kami</h4>
                        <ul className="space-y-5 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-brand-500 mt-0.5" />
                                <span>Jl. Raya Tokoku No. 123, Jakarta Selatan, Indonesia</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-brand-500" />
                                <span>+62 812 3456 7890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-brand-500" />
                                <span>support@tokoku.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© {currentYear} TOKOKU. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <span>Built with ❤️ for better shopping</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
