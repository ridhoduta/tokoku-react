import { useEffect, useState } from "react";
import BarangpList from "../../component/BarangPelanggan/BarangpList";
import { getBarangByKategori } from "../../api/barangApi";
import DootsLoader from "../../component/Loader/DootsLoader";
import { CheckCircle, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function KategoriPelanggan() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
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
  const kategori_id = state?.kategori_id;
  const kategori_nama = state?.nama_kategori;
  const fetchBarang = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getBarangByKategori(kategori_id);
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
      state: { product },
    });
  };

  useEffect(() => {
    fetchBarang();
  }, [kategori_id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Kategori</h2>
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
        <h2 className="text-2xl font-bold mb-6">{kategori_nama}</h2>
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
  if (products <= 0) {
    return (
      <div className="max-w-7xl mx-auto my-10 px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">{kategori_nama}</h2>
        <div className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded">
          <p>Barang dengan kategori {kategori_nama} kosong</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8">
      {/* 🔥 Alert muncul di atas, tanpa menghapus halaman */}
      {showAlert && (
        <div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 
          bg-green-600 text-white text-sm px-5 py-2 rounded-full shadow-lg 
          flex items-center gap-2 animate-fadeInOut z-20"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Berhasil ditambahkan ke keranjang!</span>
          <button onClick={closeAlert} className="ml-3 font-bold bg-green-600">
            <X />
          </button>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Kategori {kategori_nama}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <BarangpList
          products={products}
          setAlert={setAlert}
          onSelect={goToDetail}
        />
      </div>
    </div>
  );
}
