import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleDeleteProduct } from "@/app/admin/dashboard/components/handler";

export const EditButton = ({ item }) => {
  const router = useRouter();

  const handleEditProduct = (e, item) => {
    e.stopPropagation();
    const productQuery = encodeURIComponent(JSON.stringify(item));
    router.push(`/admin/dashboard/createproduct?product=${productQuery}`);
  };
  return (
    <MdOutlineModeEdit
      size={20}
      onClick={(e) => handleEditProduct(e, item)}
      className="cursor-pointer text-primary"
    />
  );
};

export const DeleteButton = ({ item, setIsLoading, setProducts, products }) => {
  const handleClick = (e) => {
    handleDeleteProduct({
      e,
      productId: item.id,
      products,
      setProducts,
      setIsLoading,
      toast,
    });
  };

  return (
    <>
      <MdDeleteOutline
        size={20}
        className="text-red-500 cursor-pointer hover:text-black"
        onClick={handleClick}
      />
    </>
  );
};
