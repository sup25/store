import Spinner from "@/common/spinner";

export const UserBtn = ({ handler = () => {}, text, loading, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`px-1 py-1 min-h-8 outline  font-others flex items-center justify-center ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : " hover:bg-secondary hover:text-white hover:outline-black"
      }`}
      onClick={handler}
    >
      {loading ? <Spinner /> : text}
    </button>
  );
};
