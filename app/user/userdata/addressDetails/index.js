"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { IoLocationOutline } from "react-icons/io5";
import InputAddressPopUp from "./inputAddressPopUp";
import { UserBtn } from "../common";

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
    <div className="flex flex-col gap-2 w-full items-start">
      {showAddAddress && (
        <InputAddressPopUp
          userId={user.id}
          updateUserAddress={updateUserAddress}
          handler={() => {
            setShowAddAddress(false);
          }}
        />
      )}
      <div className="flex gap-1 items-center">
        <IoLocationOutline size={20} />
        <p className="font-others font-bold">User Address</p>
      </div>
      {user.addresses && user.addresses.length > 0 ? (
        <div>
          {user.addresses.map((address) => (
            <div key={address.id}>
              <p className="font-others">
                {address.street}, {address.city}, {address.state},{" "}
                {address.country}, {address.zipcode}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          <p className="font-others">No address details found</p>
          {!user.addresses || user.addresses.length === 0 ? (
            <UserBtn handler={handleAddAddress} text="Add Address" />
          ) : null}
        </div>
      )}
    </div>
  );
};
