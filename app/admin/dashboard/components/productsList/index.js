import { EmptyMessage } from "../ProductStatusMessages";
import ProductListItems from "./productListItems";

const ProductsList = ({ soldData, unsoldData, showpopup }) => {
  if (!soldData && !unsoldData) return <EmptyMessage />;

  return (
    <div className="mt-6 w-full">
      {soldData && (
        <ProductListItems
          key={soldData.id}
          item={soldData}
          sold
          showpopup={showpopup}
        />
      )}
      {unsoldData && (
        <ProductListItems
          key={unsoldData.id}
          item={unsoldData}
          showpopup={showpopup}
        />
      )}
    </div>
  );
};

export default ProductsList;
