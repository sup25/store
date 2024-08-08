import Spinner from "@/common/spinner";

export const UserBtn = ({ handler = () => {}, text, loading, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`px-1 py-1 min-h-8 outline text-black flex items-center justify-center ${
        disabled ? "bg-gray-400 cursor-not-allowed" : " hover:bg-tertiary"
      }`}
      onClick={handler}
    >
      {loading ? <Spinner /> : text}
    </button>
  );
};
