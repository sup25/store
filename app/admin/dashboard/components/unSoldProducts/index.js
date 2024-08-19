import ProductList from "../productList";

export const UnsoldProducts = ({ unsoldItems }) => {
  return (
    <>
      {unsoldItems.length === 0 ? (
        ""
      ) : (
        <div className="mb-6 shadow-lg w-full md:max-w-[500px] h-full max-h-96 rounded-md px-2 py-4">
          <h3 className="md:text-2xl text-xl font-bold mb-4">
            Unsold Items ({unsoldItems.length})
          </h3>
          <div className="overflow-y-auto">
            {unsoldItems.map((item) => (
              <ProductList key={item.id} unsoldData={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
