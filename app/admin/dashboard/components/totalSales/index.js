import React from "react";
import "../../../../../common/styles.css";
import { totalSellSvg } from "./svgBackground";
export const TotalSales = ({ soldItems }) => {
  const totalSales =
    soldItems.reduce((sum, item) => sum + item.total_price, 0) / 100;

  return (
    <div
      className="admin-dash-card md:max-w-[500px] gap-10 "
      style={{
        position: "relative",
        overflow: "hidden",
        background: `url('data:image/svg+xml;base64,${btoa(
          totalSellSvg
        )}') no-repeat center bottom`,
        backgroundSize: "cover",
      }}
    >
      <h2 className="md:text-2xl font-heading text-xl font-bold">
        Earning Report
      </h2>
      <h3 className="md:text-2xl font-heading  text-xl font-bold flex items-center w-full gap-3">
        Total:{" "}
        <span className="md:text-5xl text:2xl font-bold text-[#BFA100]">
          ${totalSales.toFixed(2)}
        </span>
      </h3>
    </div>
  );
};
