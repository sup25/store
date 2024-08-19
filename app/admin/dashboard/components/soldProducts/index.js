import { EmptyMessage } from "../infoMessage";
import ProductList from "../productList";

export const SoldProducts = ({ soldItems }) => {
  return (
    <div className="mb-6 shadow-lg w-full md:max-w-[500px] h-full max-h-96 rounded-md px-2 py-4 ">
      <h3 className="md:text-2xl text-xl font-bold mb-4">
        Sold Items({soldItems.length})
      </h3>
      {soldItems.length === 0 ? (
        <EmptyMessage />
      ) : (
        <div className=" overflow-y-auto">
          {soldItems.map((item) => (
            <ProductList key={item.id} soldData={item} />
          ))}
        </div>
      )}
    </div>
  );
};
