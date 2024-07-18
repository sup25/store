import { EmptyMessage } from "../infoMessage";
import ProductListItems from "../productListItems";

const ProductList = ({ soldData, unsoldData }) => {
  if (!soldData && !unsoldData) return <EmptyMessage />;

  return (
    <div className="mt-6 w-full">
      {soldData && <ProductListItems key={soldData.id} item={soldData} sold />}
      {unsoldData && <ProductListItems key={unsoldData.id} item={unsoldData} />}
    </div>
  );
};

export default ProductList;
