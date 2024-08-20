import { EmptyMessage } from "../infoMessage";
import ProductList from "../productList";

export const SoldProducts = ({ soldItems }) => {
  return (
    <div className="list">
      <h3 className="md:text-2xl font-heading py-2 text-xl font-bold ">
        Sold Items({soldItems.length})
      </h3>
      <div className="h-full overflow-y-scroll">
        {soldItems.length === 0 ? (
          <EmptyMessage />
        ) : (
          <div className="">
            {soldItems.map((item) => (
              <ProductList key={item.id} soldData={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
