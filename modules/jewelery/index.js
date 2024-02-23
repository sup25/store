"use client";
import axios from "axios";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Card from "../card";

const Jewelery = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchJewelery = async () => {
      const jeweleryUrl = "https://fakestoreapi.com/products/category/jewelery";
      try {
        const res = await axios.get(jeweleryUrl);
        console.log(res);

        if (res.status >= 200 && res.status < 300) {
          setDatas(res.data);
        } else {
          throw new Error("Failed to get the jewelery");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchJewelery();
  }, []);

  return (
    <div className="section">
      <div className="container ">
        <div className="flex w-full justify-between gap-10  flex-wrap  ">
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
    </div>
  );
};

export default Jewelery;
