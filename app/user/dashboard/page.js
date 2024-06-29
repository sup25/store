"use client";
import withAuthUser from "@/app/api/utils/userHoc/page";
import Userdata from "../userdata";

const Dashboard = () => {
  return (
    <div className="section">
      <div className="container">
        <Userdata />
      </div>
    </div>
  );
};

export default Dashboard;
