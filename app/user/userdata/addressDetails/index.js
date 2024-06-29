import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useUserDetails from "./hook";
import { IoLocationOutline } from "react-icons/io5";
import InputAddressPopUp from "./inputAddressPopUp";

export const AddressDetails = () => {
  const { user } = useAuth();
  const { details, loading, error } = useUserDetails(user?.id);

  const [showAddAddress, setShowAddAddress] = useState(false);

  if (!user) {
    return <p>User not logged in</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching user details: {error.message}</p>;
  }

  const handleAddAddress = async () => {
    setShowAddAddress(true);
  };

  return (
    <div className="flex flex-col w-full items-start">
      <div className="flex gap-1 items-center">
        <IoLocationOutline size={20} />
        <p className="text-base font-bold">User Address</p>
        {!details || !details.addresses || details.addresses.length === 0 ? (
          <div
            className="underline cursor-pointer text-sm font-medium"
            onClick={handleAddAddress}
          >
            Add Address
          </div>
        ) : null}
      </div>
      {details ? (
        <div>
          {details.addresses && details.addresses.length > 0 ? (
            details.addresses.map((address) => (
              <p key={address.id}>
                {address.street}, {address.city}, {address.state},{" "}
                {address.country}, {address.zipcode}
              </p>
            ))
          ) : (
            <p>No address details found</p>
          )}
        </div>
      ) : (
        <p>No user details found</p>
      )}

      {showAddAddress && (
        <InputAddressPopUp
          userId={user.id}
          handler={() => {
            setShowAddAddress(false);
          }}
        />
      )}
    </div>
  );
};
