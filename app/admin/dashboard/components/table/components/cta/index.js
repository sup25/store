import { EditButton, DeleteButton } from "./buttons";

const CTA = ({ item, setIsLoading, data, setData }) => (
  <div className=" flex w-full gap-5">
    <EditButton item={item} />
    <DeleteButton
      item={item}
      setIsLoading={setIsLoading}
      setProducts={setData}
      products={data}
    />
  </div>
);

export default CTA;
