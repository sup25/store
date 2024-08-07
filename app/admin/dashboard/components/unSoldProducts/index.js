import { EmptyMessage } from "../infoMessage";
import ProductList from "../productList";

export const UnsoldProducts = ({ unsoldItems }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4">
        Unsold Items({unsoldItems.length})
      </h3>
      {unsoldItems.length === 0 ? (
        <EmptyMessage />
      ) : (
        <div className="max-h-96 overflow-y-auto">
          {unsoldItems.map((item) => (
            <ProductList key={item.id} unsoldData={item} />
          ))}
        </div>
      )}
    </div>
  );
};
