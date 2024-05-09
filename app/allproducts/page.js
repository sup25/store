"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminAccessToken");
    if (adminToken) {
      const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
      setAdminId(decodedToken.id);
    }
    if (adminId) {
      getProducts(adminId);
    }
  }, [adminId]);

  const getProducts = async (adminId) => {
    try {
      const response = await axios.get(`/api/v1/admin/auth/product/${adminId}`);

      setProducts(response.data.returnedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="section">
      <div className="container mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border  w-full">
                <thead>
                  <tr className="bg-gray-200  ">
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
                    <tr key={product.id} className="hover:bg-gray-100  ">
                      <td className="border px-4 py-2">{product.id}</td>
                      <td className="border px-4 py-2">{product.title}</td>
                      <td className="border px-4 py-2">{product.handle}</td>
                      <td className="border px-4 py-2">{product.desc}</td>
                      <td className="border px-4 py-2">{product.short_desc}</td>
                      <td className="border px-4 py-2">{product.price}</td>
                      <td className="border px-4 py-2">{product.quantity}</td>
                      <td className="border px-4 py-2">{product.sku}</td>
                      <td className="border px-4 py-2">
                        {product.tags.join(", ")}
                      </td>
                      <td className="border px-4 py-2">{product.type}</td>
                      <td className=" px-4 py-2 flex items-center justify-center gap-2">
                        <MdOutlineModeEdit
                          size={20}
                          className="text-blue-500 cursor-pointer  hover:text-black"
                        />
                        <MdDeleteOutline
                          size={20}
                          className="text-red-500 cursor-pointer  hover:text-black"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
