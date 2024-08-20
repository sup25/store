import ProductList from "../productList";

export const UnsoldProducts = ({ unsoldItems }) => {
  return (
    <>
      {unsoldItems.length === 0 ? (
        ""
      ) : (
        <div className="list">
          <h3 className="md:text-2xl font-heading py-2 text-xl font-bold ">
            Unsold Items ({unsoldItems.length})
          </h3>
          <div className="">
            {unsoldItems.map((item) => (
              <ProductList key={item.id} unsoldData={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
