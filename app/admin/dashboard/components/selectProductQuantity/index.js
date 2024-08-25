import { FaMinus, FaPlus } from "react-icons/fa";

const SelectProductQuantity = ({ quantity, setQuantity, title = true }) => {
  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col items-start  gap-2 w-full max-w-[150px]">
      {title && <p className="title-heading">Quantity</p>}
      <div className="flex gap-3 w-full border justify-between px-2 py-2">
        <button
          onClick={handleQuantityDecrease}
          disabled={quantity === 1}
          className={
            quantity === 1 ? "cursor-not-allowed font-others text-gray-300" : ""
          }
        >
          <FaMinus size={15} />
        </button>
        <span>{quantity}</span>
        <button onClick={handleQuantityIncrease}>
          <FaPlus size={15} />
        </button>
      </div>
    </div>
  );
};

export default SelectProductQuantity;
