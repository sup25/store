"use client";
import UserProfile from "./userProfile";
import withAuthUser from "../utils/userHoc/page";
import RecentPurchasedItem from "./recentPurchasedItems";
import RelatedProduct from "@/common/relatedProduct";

const Dashboard = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="flex flex-col  gap-20 w-full">
          <div className="flex justify-between gap-3 w-full  flex-wrap">
            <UserProfile />
            <RecentPurchasedItem />
          </div>
          <RelatedProduct heading="For you" />
        </div>
      </div>
    </div>
  );
};

export default withAuthUser(Dashboard);
