import Spinner from "@/common/spinner";

export const UserBtn = ({ handler = () => {}, text, loading }) => {
  return (
    <button
      className="px-1 py-1 min-h-8 outline hover:bg-tertiary flex items-center justify-center"
      onClick={handler}
    >
      {loading ? <Spinner /> : text}
    </button>
  );
};
