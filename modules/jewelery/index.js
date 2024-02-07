import axios from "axios";
import React from "react";

const Jewelery = () => {
  const jeweleryUrl = "https://fakestoreapi.com/products/category/jewelery";

  const res = axios.get(jeweleryUrl);
  console.log(res);

  return (
    <div className="section">
      <div className="container"></div>
    </div>
  );
};

export default Jewelery;
