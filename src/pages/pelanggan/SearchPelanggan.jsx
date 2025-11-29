import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBarang } from "../../api/barangApi";
import BarangpList from "../../component/BarangPelanggan/BarangpList";
import DootsLoader from "../../component/Loader/DootsLoader";

export default function SearchPelanggan() {
  const { state } = useLocation();
  const keyword = state?.keyword || "";
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const[error, setError] = useState("")
  const fetchSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getBarang();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      const formattedProducts = data.map((item) => {
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
      });
      const filtered = formattedProducts.filter((p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setResult(filtered);
    } catch (err) {
      console.error("Error fetching barang:", err);
      setError("Terjadi kesalahan saat mengambil data barang");
    } finally {
      setLoading(false);
    }
  };

  // const fetchSearch = async () => {
  //   setLoading(true);
  //   const res = await getBarang();

  //   const data = Array.isArray(res.data)
  //     ? res.data
  //     : res.data?.data || [];

  //   const formatted = data.map(item => ({
  //     id: item.id,
  //     name: item.data.nama_barang,
  //     category: item.data.kategori_id,
  //     price: Number(item.data.harga_barang),
  //     stock: Number(item.data.stok_barang),
  //     gambar: item.data.gambar_barang
  //   }));

  //   const filtered = formatted.filter(p =>
  //     p.name.toLowerCase().includes(keyword.toLowerCase())
  //   );

  //   setResult(filtered);
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchSearch();
  }, [keyword]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Produk Rekomendasi</h2>
        <div className="flex justify-center items-center py-12">
          <DootsLoader />
        </div>
        <p className="flex justify-center ml-3 text-gray-600">
          Mencari barang {keyword}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <h2 className="text-xl font-bold mb-4">Hasil pencarian: "{keyword}"</h2>

      {result.length === 0 ? (
        <p className="text-gray-600">Tidak ada produk ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <BarangpList products={result} />
        </div>
      )}
    </div>
  );
}
