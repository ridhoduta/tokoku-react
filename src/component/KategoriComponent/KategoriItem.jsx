import { Edit, Trash2 } from "lucide-react";
import React from "react";

const KategoriItem = ({kategori, index, openEditModal}) => {
  return (
    <>
      <tr className="border-t hover:bg-gray-50">
        <td className="py-3 px-4">{index + 1}</td>
        <td className="py-3 px-4">{kategori.nama_kategori}</td>
        <td className="py-3 px-4 text-center space-x-2">
          <button
            onClick={() => openEditModal(kategori)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => handleDelete(kategori.id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default KategoriItem;
