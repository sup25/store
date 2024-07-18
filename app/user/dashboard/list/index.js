import { EmptyState } from "../components/emptyState";
import ListItem from "../components/listItem";

const List = ({ data = [] }) => {
  if (!data || (Array.isArray(data) && data.length === 0))
    return <EmptyState />;
  return (
    <div className="mt-6  w-full">
      <ListItem item={data} />
    </div>
  );
};

export default List;
