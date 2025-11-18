import { useEffect, useState } from "react";
import BarangpList from "../../component/BarangPelanggan/BarangpList";
import { getBarang } from "../../api/barangApi";
import DootsLoader from "../../component/Loader/DootsLoader";
import { useCart } from "../../component/BarangPelanggan/CartContext";
import { CheckCircle, CloudSun, X } from "lucide-react";

export default function HomePelanggan() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
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
      // console.log("Response dari API:", response.data);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      const formattedProducts = data.map((item) => ({
        id: item.id,
        name: item.data?.nama_barang || "Tanpa Nama",
        category: item.data?.kategori_id || "-",
        price: Number(item.data?.harga_barang) || 0,
        stock: Number(item.data?.stok_barang) || 0,
        gambar: item.data?.gambar_barang
      }))

      setProducts(formattedProducts);
    } catch (err) {
      console.error("Error fetching barang:", err);
      setError("Terjadi kesalahan saat mengambil data barang");
    } finally {
      setLoading(false);
    }
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
        <p className="flex justify-center ml-3 text-gray-600">Memuat produk...</p>
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
    <div className="relative max-w-7xl mx-auto px-4 py-8">

      {/* 🔥 Alert muncul di atas, tanpa menghapus halaman */}
      {showAlert && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 
          bg-green-600 text-white text-sm px-5 py-2 rounded-full shadow-lg 
          flex items-center gap-2 animate-fadeInOut z-20">
          <CheckCircle className="w-4 h-4" />
          <span>Berhasil ditambahkan ke keranjang!</span>
          <button onClick={closeAlert} className="ml-3 font-bold bg-green-600">
            <X/>
          </button>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Produk Rekomendasi</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <BarangpList products={products} setAlert={setAlert} />
      </div>
    </div>
  );
}
