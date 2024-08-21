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
  }, []);

  const handleDeleteAll = () => {
    const itemIds = items.map((item) => item.id);
    handleDeleteItem(
      itemIds,
      setLoading,
      fetchItems,
      toast,
      user,
      setItems,
      updateCartItems,
      false
    );
  };
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  return (
    <div className="section">
      <div className="container flex justify-center items-center">
        <div className="flex flex-col w-full max-w-[1000px] shadow rounded py-10 px-10 md:py-16 md:px-16 ">
          <h2 className="text-center font-heading  pb-10">
            Your Cart ({items.length}) {items.length === 1 ? "item" : "items"}
          </h2>
          {loading && <Spinner />}
          <div className="flex flex-col w-full justify-between gap-2">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full md:flex-row flex-col justify-between items-end gap-2 border-b-2 py-2 px-2"
                >
                  <div className="flex  w-full px-1 py-2 gap-2">
                    {item.product.images.length > 0 && (
                      <img
                        src={item.product.images[0].original_url}
                        alt={item.product.title}
                        className="w-24 h-24 object-cover"
                      />
                    )}

                    <div className="flex flex-col">
                      <p className="flex w-full font-others text-lg font-bold">
                        {item.product.title}
                      </p>
                      <p className="flex w-full text-base font-others font-medium">
                        {item.product.short_desc}
                      </p>
                      <p className="text-black text-lg  font-others font-bold">
                        Price ${item.product.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full items-center  gap-2">
                    <SelectProductQuantity
                      title={false}
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
                      size={25}
                      className="cursor-pointer hover:text-red-400"
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
                  <div className="flex w-full text-[#BFA100] text-xl font-others font-bold justify-end">
                    Total Price: ${item.product.price * item.quantity}
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-4 text-center font-others">
                No items in your cart.
              </p>
            )}
          </div>

          <div className="flex flex-col mt-14  w-full">
            {items.length >= 1 && (
              <div className="flex justify-between items-center w-full flex-wrap  ">
                <div
                  onClick={handleDeleteAll}
                  loading={loading}
                  className="hover:text-secondary animate-bounce cursor-pointer font-semibold font-others transition duration-300 ease-in-out"
                >
                  Clear All
                </div>
                <div className="flex flex-col gap-2 ">
                  <p className="text-lg font-semibold font-others flex gap-2 items-center">
                    Grand Total:
                    <span className="font-bold text-3xl text-[#BFA100]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </p>
                  <BtnCheckout
                    deleteItem={handleDeleteAll}
                    items={items}
                    user={user}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthUser(Cart);
