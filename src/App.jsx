import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./Route/ProtectedRoute";
import BarangAdmin from "./pages/admin/BarangAdmin";
import MainAdmin from "./Layout/admin/MainAdmin";
import PesananAdmin from "./pages/admin/PesananAdmin";
import MainPelanggan from "./Layout/pelanggan/MainPelanggan";
import HomePelanggan from "./pages/pelanggan/HomePelanggan";
import KeranjangPelanggan from "./pages/pelanggan/KeranjangPelanggan";
import Home from "./pages/Home";
import RingkasanPesanan from "./pages/pelanggan/RingkasanPesanan";
import DetailPesanan from "./pages/pelanggan/DetailPesanan";
import OrderListPage from "./pages/pelanggan/OrderListPage";
import KategoriAdmin from "./pages/admin/KategoriAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import LaporanPesanan from "./pages/admin/laporan/LaporanPesanan";
import DetailBarang from "./pages/pelanggan/DetailBarang";
import KategoriPelanggan from "./pages/pelanggan/KategoriPelanggan";
import SearchPelanggan from "./pages/pelanggan/SearchPelanggan";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />

        {/* Halaman Admin (hanya R001) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["R001"]}>
              <MainAdmin />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardAdmin/>} />
          <Route path="barang" element={<BarangAdmin />} />
          <Route path="pesanan" element={<PesananAdmin />} />
          <Route path="kategori" element={<KategoriAdmin />} />
          <Route path="laporan/pesanan" element={<LaporanPesanan />} />
        </Route>

        {/* Halaman Pelanggan (R002 & R001 sama-sama bisa) */}
        <Route
          path="/pelanggan"
          element={
            <ProtectedRoute roles={["R001", "R002"]}>
              <MainPelanggan />
            </ProtectedRoute>
          }
        >
          {/* Route children untuk pelanggan */}
          <Route path="home" element={<HomePelanggan />} />
          <Route path="keranjang" element={<KeranjangPelanggan />} />
          <Route path="ringkasan-pesanan" element={<RingkasanPesanan />} />
          <Route path="detail-pesanan" element={<DetailPesanan />} />
          <Route path="pesanan-list" element={<OrderListPage/>} />
          <Route path="detail-barang" element={<DetailBarang/>} />
          <Route path="kategori" element={<KategoriPelanggan/>} />
          <Route path="search" element={<SearchPelanggan/>} />
          {/* Tambahkan route lain di sini */}
          {/* <Route path="profile" element={<ProfilePelanggan />} />
          <Route path="cart" element={<CartPelanggan />} /> */}
        </Route>

        {/* Route fallback atau 404 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
