"use client";

const ProductListItems = ({ item, sold, showpopup }) => {
  const handleShow = () => {
    showpopup(item);
  };

  return (
    <div onClick={handleShow} className="cursor-pointer">
      <li
        key={item.id}
        className={`flex md:flex-row justify-between gap-4 flex-col  hover:bg-slate-200  transition duration-300 ease-in-out items-center p-3 rounded-lg ${
          sold ? "bg-green-100 " : "bg-red-100"
        }`}
      >
        <img
          className="w-10 h-10 object-cover rounded-full"
          src={item.image}
          alt={item.title}
        />
        <span className="font-others text-center w-fit text-xl font-semibold">
          {item.handle}
        </span>
        <span
          className={`font-semibold font-others text-center w-fit text-xl text-${
            sold ? "green" : "red"
          }-700`}
        >
          {sold ? `${item.sold} sold` : "0 sold"}
        </span>
      </li>
    </div>
  );
};

export default ProductListItems;
