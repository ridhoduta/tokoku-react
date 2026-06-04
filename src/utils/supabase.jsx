import { createClient } from "@supabase/supabase-js";

// Credential Supabase dari file .env (Vite menggunakan import.meta.env)
// Placeholder akan digunakan jika environment variable belum didefinisikan
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://your-project-id.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-public-api-key";

// Inisialisasi client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper untuk mengunggah file ke Supabase Storage
 * 
 * @param {File} file - Object file dari input type="file" atau event handler
 * @param {string} bucket - Nama bucket di Supabase Storage (default: 'uploads')
 * @param {string} folder - Nama folder/sub-path di dalam bucket (optional, e.g. 'products', 'avatars')
 * @returns {Promise<{success: boolean, publicUrl: string|null, error: string|null, data: any}>}
 */
export const uploadToSupabase = async (file, bucket = "uploads", folder = "") => {
  try {
    if (!file) {
      throw new Error("File tidak ditemukan / kosong.");
    }

    // Ekstrak nama asli dan ekstensi file
    const fileParts = file.name.split(".");
    const ext = fileParts.pop();
    const originalNameWithoutExt = fileParts.join(".");

    // Sanitasi nama file agar aman dari karakter khusus, ganti dengan underscore
    const sanitizedName = originalNameWithoutExt.replace(/[^a-zA-Z0-9]/g, "_");

    // Buat nama file unik agar tidak saling menimpa
    const uniqueFileName = `${sanitizedName}_${Date.now()}.${ext}`;

    // Tentukan path lengkap (jika ada sub-folder)
    const filePath = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

    // Proses upload ke Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Dapatkan Public URL untuk file yang baru saja diunggah
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      publicUrl,
      error: null,
      data,
    };
  } catch (error) {
    console.error("Gagal mengunggah ke Supabase Storage:", error);
    return {
      success: false,
      publicUrl: null,
      error: error.message || "Terjadi kesalahan saat upload",
      data: null,
    };
  }
};
