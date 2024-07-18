import { EmptyMessage } from "../infoMessage";
import ProductList from "../productList";

export const SoldProducts = ({ soldItems }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4">
        Sold Items({soldItems.length})
      </h3>
      {soldItems.length === 0 ? (
        <EmptyMessage />
      ) : (
        <div className="max-h-96 overflow-y-auto">
          {soldItems.map((item) => (
            <ProductList key={item.id} soldData={item} />
          ))}
        </div>
      )}
    </div>
  );
};
