import { CgSpinnerTwo } from "react-icons/cg";

const Spinner = () => {
  return (
    <div className="fixed left-0 top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30 z-50">
      <CgSpinnerTwo size={30} className="animate-spin" />
    </div>
  );
};

export default Spinner;
