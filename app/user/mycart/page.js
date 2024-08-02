"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SelectProductQuantity from "@/app/admin/dashboard/components/selectProductQuantity";
import { MdDeleteOutline } from "react-icons/md";
import { handleDeleteItem, handleQuantityChange } from "./handler";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/common/spinner";
import BtnCheckout from "@/common/btnCheckout";
import withAuthUser from "../utils/userHoc/page";
import { useCart } from "@/context/cartContext";
import { fetchItems } from "./utils";

const Cart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { updateCartItems } = useCart();

  useEffect(() => {
    fetchItems(user, setLoading, updateCartItems, setItems);
  }, [user.id]);
  console.log("items", items);
  return (
    <div className="section">
      <div className="container">
        <h2 className="text-center font-bold text-lg py-5">
          Your Cart ({items.length}) {items.length === 1 ? "item" : "items"}
        </h2>
        {loading && <Spinner />}
        <div className="flex  flex-col  w-full justify-between  gap-2  ">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="flex w-full md:flex-row flex-col justify-between items-end gap-2 border-b-2 py-2"
              >
                <div className="flex flex-col w-full px-1 gap-1">
                  {item.product.images.length > 0 && (
                    <img
                      src={item.product.images[0].original_url}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover"
                    />
                  )}
                  <div className="flex w-full text-lg  font-bold">
                    {item.product.title}
                  </div>
                  <div className="flex w-full text-base font-medium">
                    {item.product.short_desc}
                  </div>
                </div>

                <div className="flex  w-full  ">
                  <p className="text-black text-lg font-bold">
                    Price ${item.product.price}
                  </p>
                </div>

                <div className="flex w-full items-end gap-2 ">
                  <SelectProductQuantity
                    quantity={item.quantity}
                    setQuantity={(newQuantity) =>
                      handleQuantityChange(
                        items,
                        item.id,
                        newQuantity,
                        setItems,
                        updateCartItems
                      )
                    }
                  />
                  <MdDeleteOutline
                    size={35}
                    className=" cursor-pointer hover:text-red-400"
                    onClick={() =>
                      handleDeleteItem(
                        item.id,
                        setLoading,
                        fetchItems,
                        toast,
                        user,
                        setItems,
                        updateCartItems
                      )
                    }
                  />
                </div>
                <div className="flex w-full text-[#BFA100] text-xl  font-bold ">
                  Total Price: ${item.product.price * item.quantity}
                </div>

                <BtnCheckout
                  product={item.product}
                  quantity={item.quantity}
                  admin={item.product.adminId}
                  user={user}
                  deleteItem={(itemId) =>
                    handleDeleteItem(
                      itemId,
                      setLoading,
                      fetchItems,
                      toast,
                      user,
                      setItems,
                      updateCartItems,
                      false
                    )
                  }
                  itemId={item.id}
                />
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center">No items in your cart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuthUser(Cart);
