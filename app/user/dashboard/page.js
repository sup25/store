"use client";
import Userdata from "../userdata";
import withAuthUser from "../utils/userHoc/page";

const Dashboard = () => {
  return (
    <div className="section">
      <div className="container">
        <Userdata />
      </div>
    </div>
  );
};

export default withAuthUser(Dashboard);
