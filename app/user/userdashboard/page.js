"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import withAuthUser from "@/app/api/utils/userHoc/page";

const userDashboard = () => {
  const { user } = useAuth();

  return <div>{user?.first_name}</div>;
};

export default withAuthUser(userDashboard);
