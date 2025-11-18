import React, { useEffect, useState } from "react";
import { getLaporan } from "../../../api/pesananApi";
import DootsLoader from "../../../component/Loader/DootsLoader";
import TableLoader from "../../../component/Loader/TableLoader";
import { exportToExcel } from "../../../utils/exportExcel";

const LaporanPesanan = () => {
  const [laporan, setLaporan] = useState([]);
  const [filter, setFilter] = useState("all"); // all, minggu, bulan, tahun
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    setLoading(true);
    const res = await getLaporan();
    if (res.success) {
      setLaporan(res.data);
    }
    setLoading(false);
  };

  const filterLaporan = () => {
    const now = new Date();
    return laporan.filter((item) => {
      const itemDate = new Date(item.tanggal);

      // Filter by tombol
      if (filter === "minggu") {
        const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
        if (diffDays > 7) return false;
      } else if (filter === "bulan") {
        if (
          itemDate.getMonth() !== now.getMonth() ||
          itemDate.getFullYear() !== now.getFullYear()
        )
          return false;
      } else if (filter === "tahun") {
        if (itemDate.getFullYear() !== now.getFullYear()) return false;
      }

      // Filter by search
      if (
        search &&
        !(
          item.nama_pemesan.toLowerCase().includes(search.toLowerCase()) ||
          item.pesanan_id?.toLowerCase().includes(search.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredData = filterLaporan();

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Laporan Pesanan</h2>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded px-3 py-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Semua</option>
            <option value="minggu">Minggu ini</option>
            <option value="bulan">Bulan ini</option>
            <option value="tahun">Tahun ini</option>
          </select>
          <button
            onClick={() => exportToExcel(filteredData, "laporan-pesanan")}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Export Excel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Nama Pelanggan
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  Tanggal
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="py-4">
                    <TableLoader />
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-2 px-4">{item.nama_pemesan}</td>
                    <td className="text-center py-2 px-4">{item.tanggal}</td>
                    <td className="text-right py-2 px-4">
                      Rp {Number(item.total).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LaporanPesanan;
