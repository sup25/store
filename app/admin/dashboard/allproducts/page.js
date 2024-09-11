"use client";
import React, { useEffect, useState } from "react";
import { getProducts } from "../utils";
import Spinner from "@/common/spinner";
/* import Table from "@/common/table"; */
import withAuthAdmin from "../../utils/adminHoc/page";
import Table from "../components/table";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const columnLabels = {
    id: "ID",
    sku: "SKU",
    handle: "Handle",
    short_desc: "Short Description",
    title: "Title",
    price: "Price",
    quantity: "Quantity",
    tags: "Tags",
    type: "Type",
    desc: "Description",
  };

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminAccessToken");
    if (adminToken) {
      const decodedToken = JSON.parse(atob(adminToken.split(".")[1]));
      getProducts(decodedToken.id, setProducts, setLoading);
    }
  }, []);

  return (
    <div className="section overflow-hidden">
      <div className="container ">
        <h1 className="font-heading ">Product List</h1>
        <div className="overflow-hidden">
          {loading ? (
            <Spinner />
          ) : (
            <Table
              data={products}
              setData={setProducts}
              columns={[
                "id",
                "sku",
                "title",
                "tags",
                "type",
                "price",
                "quantity",
              ]}
              showSearch={true}
              uniqueKey="id"
              excludeKeys={["images", "adminId", "orderId"]}
              columnLabels={columnLabels}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuthAdmin(AllProducts);
