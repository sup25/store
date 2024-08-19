import React from "react";
import "../../../../../common/styles.css";
export const TotalSales = ({ soldItems }) => {
  const totalSales =
    soldItems.reduce((sum, item) => sum + item.total_price, 0) / 100;

  const svgBackground = `
    <svg width="100%" height="100" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#ADD8E6;stop-opacity:0.5" />
          <stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:0.5" />
        </linearGradient>
      </defs>
      <path fill="url(#grad1)" d="M0,128L30,128C60,128,120,128,180,144C240,160,300,192,360,186.7C420,181,480,139,540,128C600,117,660,139,720,160C780,181,840,203,900,186.7C960,171,1020,117,1080,128C1140,139,1200,213,1260,202.7C1320,192,1380,96,1440,80L1500,64V320H0Z"></path>
    </svg>
  `;

  return (
    <div
      className="admin-dash-card md:max-w-[500px] gap-10 "
      style={{
        position: "relative",
        overflow: "hidden",
        background: `url('data:image/svg+xml;base64,${btoa(
          svgBackground
        )}') no-repeat center bottom`,
        backgroundSize: "cover",
      }}
    >
      <h2 className="md:text-2xl text-xl font-bold">Earning Report</h2>
      <h3 className="md:text-2xl text-xl font-bold flex items-center w-full gap-3">
        Total:{" "}
        <span className="md:text-5xl text:2xl font-bold text-[#BFA100]">
          ${totalSales.toFixed(2)}
        </span>
      </h3>
    </div>
  );
};
