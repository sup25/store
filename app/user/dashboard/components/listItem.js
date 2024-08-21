const ListItem = ({ item }) => {
  return (
    <div className="flex items-center border-b border-gray-200  py-4">
      <div className="flex items-center justify-between w-full">
        <img
          className="w-20 h-20 object-cover rounded-full"
          src={item.images[0].original_url}
          alt={item.title}
        ></img>
        <h2 className="font-others font-semibold">{item.title}</h2>

        <p className="text-[#BFA100] font-others text-xl font-bold">
          ${item.price}
        </p>
      </div>
    </div>
  );
};

export default ListItem;
