"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@/common/card";

const ProductCategoryList = ({ categoryUrl }) => {
  const [datas, setDatas] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await axios.get(categoryUrl);
      console.log("response", res);

      if (res.status >= 200 && res.status < 300) {
        setDatas(res.data);
      } else {
        throw new Error(`Failed to get the ${title}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [categoryUrl]);

  return (
    <div className="section">
      <div className="container">
        <div className="flex md:flex-row flex-col w-full justify-between gap-10  flex-wrap">
          {datas.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              imageUrl={item.image}
              price={item.price}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryList;
