import api from "./axiosInstance";


// Buat instance axios

// ====== REGISTER ======
export const register = async (data) => {
  try {
    const res = await api.post("/register", data);
    return res.data;
  } catch (err) {
    return err.response?.data || { success: false, message: "Error register" };
  }
};

// ====== LOGIN ======
export const login = async (data) => {
  try {
    const res = await api.post("/login", data);

    if (res.data.success && res.data.token) {
      const userData = res.data.data; // ambil data user
      // Simpan token dan info user di localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role_id", userData.role_id);
      localStorage.setItem("nama", userData.nama);
      localStorage.setItem("alamat", userData.alamat);
      localStorage.setItem("nomor_hp", userData.nomor_hp);
      localStorage.setItem("data", JSON.stringify(userData)); // simpan seluruh data sebagai string
    }

    return res.data;
  } catch (err) {
    return err.response?.data || { success: false, message: "Error login" };
  }
};


export const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    // panggil API logout (opsional, backend bisa invalidasi token)
    await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error("Logout gagal:", err.response?.data || err.message);
  } finally {
    // hapus token di localStorage
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect ke login
  }
};

// ====== GET USER DARI TOKEN (opsional) ======
export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  return token || null;
};
