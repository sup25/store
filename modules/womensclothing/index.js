"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../card";

const WomensClothing = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchWomensClothing = async () => {
      const WomensClothingUrl =
        "https://fakestoreapi.com/products/category/women's%20clothing";
      try {
        const res = await axios.get(WomensClothingUrl);
        console.log("response", res);

        if (res.status >= 200 && res.status < 300) {
          setDatas(res.data);
        } else {
          throw new Error("Failed to get the Men's clothing");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchWomensClothing();
  }, []);

  return (
    <div className="section">
      <div className="container flex overflow-scroll md:gap-0 gap-5  ">
        {datas.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default WomensClothing;
