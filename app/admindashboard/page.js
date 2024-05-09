"use client";

import withAuthAdmin from "../api/utils/adminHoc/page";
import AllProducts from "../allproducts/page";

const AdminDashboard = () => {
  return <AllProducts />;
};

export default withAuthAdmin(AdminDashboard);
