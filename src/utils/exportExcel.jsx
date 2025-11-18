import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName = "laporan") => {
  if (!data || data.length === 0) {
    alert("Tidak ada data untuk diexport!");
    return;
  }

  // Buat worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Buat workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

  // Simpan file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
