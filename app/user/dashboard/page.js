"use client";

import Userdata from "../userdata";
import withAuthUser from "../utils/userHoc/page";
import ProductRecommendation from "./productsRecommendation";
import RecentPurchasedItem from "./recentPurchasedItems";

const Dashboard = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col  gap-20 w-full">
          <div className="flex justify-between gap-5 w-full md:flex-nowrap flex-wrap">
            <Userdata />
            <RecentPurchasedItem />
          </div>
          <ProductRecommendation />
        </div>
      </div>
    </div>
  );
};

export default withAuthUser(Dashboard);
