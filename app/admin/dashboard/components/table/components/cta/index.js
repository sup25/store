import { EditButton, DeleteButton } from "./buttons";

const CTA = ({ item, setIsLoading, setProducts, products }) => (
  <div className=" flex w-full gap-5">
    <EditButton item={item} />
    <DeleteButton
      item={item}
      setIsLoading={setIsLoading}
      setProducts={setProducts}
      products={products}
    />
  </div>
);

export default CTA;
