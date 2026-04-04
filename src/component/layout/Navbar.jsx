import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (path) => {
    if (path.startsWith("/#")) {
      const id = path.substring(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(path);
    }
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-card py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => handleNavigate("/")}
          >
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-gray-900" : "text-brand-900"
            }`}>
              TOKOKU
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { name: "Beranda", path: "/#beranda" },
              { name: "Fitur", path: "/#fitur" },
              { name: "Cara Kerja", path: "/#cara-kerja" },
              { name: "Tentang", path: "/tentang" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-brand-50 hover:text-brand-700 ${
                  isActive(item.path) ? "text-brand-700 bg-brand-50" : "text-gray-600"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-gray-600 hover:text-brand-700 font-medium text-sm px-4 py-2 transition-colors"
              onClick={() => handleNavigate("/login")}
            >
              Log In
            </button>
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => handleNavigate("/login")}
            >
              <User className="w-4 h-4" />
              <span>Daftar Sekarang</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-x-0 top-[72px] bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl transition-all duration-300 md:hidden ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-4">
          {[
            { name: "Beranda", path: "/#beranda" },
            { name: "Fitur", path: "/#fitur" },
            { name: "Cara Kerja", path: "/#cara-kerja" },
            { name: "Tentang", path: "/tentang" },
          ].map((item) => (
            <button 
              key={item.name}
              onClick={() => handleNavigate(item.path)} 
              className="text-left text-lg font-medium text-gray-700 hover:text-brand-700 py-2 border-b border-gray-50 last:border-0"
            >
              {item.name}
            </button>
          ))}
          <div className="pt-4 flex flex-col space-y-3">
            <button
              className="w-full text-center py-3 text-gray-600 font-medium"
              onClick={() => handleNavigate("/login")}
            >
              Log In
            </button>
            <button
              className="w-full btn-primary"
              onClick={() => handleNavigate("/login")}
            >
              Daftar Sekarang
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
