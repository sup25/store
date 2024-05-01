"use client";

import React, { useEffect } from "react";
import withAuthAdmin from "../api/utils/adminHoc/page";

const adminDashboard = () => {
  return <div>test</div>;
};

export default withAuthAdmin(adminDashboard);
