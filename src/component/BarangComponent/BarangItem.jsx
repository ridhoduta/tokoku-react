import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const BarangItem = ({ product, index, onDelete, onEdit}) => {
    const handleDelete = () =>{
        onDelete(product.data.barang_id)
        
    }
    const handleEdit = () =>{
        onEdit(product.data)
    }
    // console.log(product)
  return (
    <>
      <tr
        className="border-b border-gray-100 hover:bg-gray-50 transition"
      >
        <td className="text-center py-2 px-4 text-gray-700">{index+1}</td>
        <td className="py-2 px-4 text-gray-700">{product.data.nama_barang}</td>
        <td className="text-center py-2 px-4">
          {/* <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                product.k
              )}`}
            > */}
          {product.data.kategori_id}
          {/* </span> */}
        </td>
        <td className="text-center py-2 px-4 text-gray-700">
          Rp {(product?.data.harga_barang || 0).toLocaleString()}
        </td>
        <td className="text-center py-2 px-4 text-gray-700">{product.data.stok_barang}</td>
        <td className="text-center py-2 px-4">
            status
        </td>
        <td className="py-3 px-4">
          <div className="flex gap-3 justify-center place-item-center">
            <button className="text-blue-600 hover:text-blue-800 transition" onClick={handleEdit}>
              <Edit2 className="w-4 h-4" />
            </button>
            <button className="text-red-600 hover:text-red-800 transition" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default BarangItem;
