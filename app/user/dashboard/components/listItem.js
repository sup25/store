import Link from "next/link";

const ListItem = ({ item }) => {
  const product = item.sale?.products?.[0];
  const handle = product?.handle;
  const image = product?.images?.[0]?.original_url;

  return (
    <Link
      className="cursor-pointer"
      href={`/user/dashboard/completed-order/${handle}`}
    >
      <div className="flex items-center border-b border-gray-200 w-full p-2 hover:bg-slate-200 transition duration-300 ease-in-out">
        <div className="flex items-center gap-2 justify-between w-full md:flex-row flex-col">
          <img
            className="w-20 h-20 object-cover rounded-full"
            src={image}
            alt={product?.title || "Product Image"}
          />
          <h2 className="font-others text-center font-semibold">
            {product?.title || "No Title Available"}
          </h2>

          <p className="text-[#BFA100] font-others text-xl font-bold">
            ${item.net_price / 100}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListItem;
