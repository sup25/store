"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { IoLocationOutline } from "react-icons/io5";
import InputAddressPopUp from "./inputAddressPopUp";

export const AddressDetails = () => {
  const { user, updateUserAddress } = useAuth();
  const [showAddAddress, setShowAddAddress] = useState(false);

  if (!user) {
    return <p>User not logged in</p>;
  }

  const handleAddAddress = () => {
    setShowAddAddress(true);
  };

  return (
    <div className="flex flex-col w-full items-start">
      <div className="flex gap-1 items-center">
        <IoLocationOutline size={20} />
        <p className="text-base font-bold">User Address</p>
        {!user.addresses || user.addresses.length === 0 ? (
          <div
            className="underline cursor-pointer text-sm font-medium"
            onClick={handleAddAddress}
          >
            Add Address
          </div>
        ) : null}
      </div>
      {user.addresses && user.addresses.length > 0 ? (
        <div>
          {user.addresses.map((address) => (
            <div key={address.id}>
              <p>
                {address.street}, {address.city}, {address.state},{" "}
                {address.country}, {address.zipcode}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No address details found</p>
      )}

      {showAddAddress && (
        <InputAddressPopUp
          userId={user.id}
          updateUserAddress={updateUserAddress}
          handler={() => {
            setShowAddAddress(false);
          }}
        />
      )}
    </div>
  );
};
