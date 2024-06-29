import axiosClient from "@/utils/axiosClient";
import { useState, useEffect } from "react";

const useUserDetails = (userId) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token is missing in sessionStorage");
        }

        const response = await axiosClient.get(
          `/api/v1/user/auth/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setDetails(response.data.returnedData);
        console.log("Fetched user details:", response.data.returnedData);
      } catch (error) {
        setError(error);
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  return { details, loading, error };
};

export default useUserDetails;
