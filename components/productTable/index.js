import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { CgSpinnerTwo } from "react-icons/cg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductTable = ({ products, onDelete }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEditProduct = (product) => {
    const productQuery = encodeURIComponent(JSON.stringify(product));
    router.push(`/createproduct?product=${productQuery}`);
  };

  const handleDeleteProduct = async (productId) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/v1/admin/auth/product/${productId}`);
      toast.success("Product deleted successfully");
      onDelete();
    } catch (error) {
      console.log("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <CgSpinnerTwo size={30} className="animate-spin" />
        </div>
      )}
      <table className="table-auto border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Handle</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Short Description</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">SKU</th>
            <th className="px-4 py-2">Tags</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.title}</td>
              <td className="border px-4 py-2">{product.handle}</td>
              <td className="border px-4 py-2">{product.desc}</td>
              <td className="border px-4 py-2">{product.short_desc}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              <td className="border px-4 py-2">{product.sku}</td>
              <td className="border px-4 py-2">{product.tags.join(", ")}</td>
              <td className="border px-4 py-2">{product.type}</td>
              <td className="px-4 py-2 flex items-center justify-center gap-2">
                <MdOutlineModeEdit
                  size={20}
                  className="text-blue-500 cursor-pointer hover:text-black"
                  onClick={() => handleEditProduct(product)}
                />
                <MdDeleteOutline
                  size={20}
                  className="text-red-500 cursor-pointer hover:text-black"
                  onClick={() => handleDeleteProduct(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
