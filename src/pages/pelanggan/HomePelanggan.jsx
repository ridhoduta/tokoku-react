import { useEffect, useState } from "react";
import BarangpList from "../../component/BarangPelanggan/BarangpList";
import { getBarang } from "../../api/barangApi";
import DootsLoader from "../../component/Loader/DootsLoader";
import { useCart } from "../../component/BarangPelanggan/CartContext";
import { CheckCircle, CloudSun, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePelanggan() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const setAlert = () => {
    setShowAlert(true);

    // otomatis hilang setelah 2 detik (opsional)
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const fetchBarang = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getBarang();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      const formattedProducts = data
        .map((item) => {
          const d = item.data || {};

          return {
            id: item.id || d.barang_id,
            name: d.nama_barang || "Tanpa Nama",
            category: d.kategori_id || "-",
            stock: Number(d.stok_barang) || 0,
            gambar: d.gambar_barang || null,

            // satuan barang (pcs, dus, kilo)
            satuan: d.satuan_utama || "-",

            // harga berdasarkan satuan
            harga: {
              pcs: Number(d.harga_barang) || null,

              dus: {
                harga_dus: Number(d.harga_dus) || null,
                harga_pcs_dus: Number(d.harga_pcs) || null,
              },

              kilo: {
                per_kilo: Number(d.harga_per_kg) || null,
                setengah_kilo: Number(d.harga_per_500g) || null,
                seperempat_kilo: Number(d.harga_per_250g) || null,
              },
            },
          };
        })

        // 🔥 Urutkan dari yang terbaru
        .sort((a, b) => b.id - a.id);

      setProducts(formattedProducts);
    } catch (err) {
      console.error("Error fetching barang:", err);
      setError("Terjadi kesalahan saat mengambil data barang");
    } finally {
      setLoading(false);
    }
  };

  const goToDetail = (product) => {
    navigate("/pelanggan/detail-barang", {
      state: { product }, // ⬅ kirim data formatted product
    });
  };

  useEffect(() => {
    fetchBarang();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Produk Rekomendasi</h2>
        <div className="flex justify-center items-center py-12">
          <DootsLoader />
        </div>
        <p className="flex justify-center ml-3 text-gray-600">
          Memuat produk...
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Produk Rekomendasi</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={fetchBarang}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* 🔥 Alert muncul di atas, tanpa menghapus halaman */}
      {showAlert && (
        <div
          className="fixed top-24 left-1/2 transform -translate-x-1/2 
          bg-green-500/90 backdrop-blur-md text-white text-sm px-6 py-3 rounded-2xl shadow-xl shadow-green-500/20
          flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 z-50 border border-white/20"
        >
          <CheckCircle className="w-5 h-5 text-green-100" />
          <span className="font-medium tracking-wide">Berhasil ditambahkan ke keranjang!</span>
          <button onClick={closeAlert} className="ml-2 hover:bg-green-600/50 p-1 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Belanja Sekarang</h2>
          <p className="text-gray-500 font-medium mt-1">Temukan penawaran terbaik hari ini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        <BarangpList
          products={products}
          setAlert={setAlert}
          onSelect={goToDetail}
        />
      </div>
    </div>
  );
}
