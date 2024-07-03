import { CgSpinnerTwo } from "react-icons/cg";

const Spinner = () => {
  return (
    <div
      className="left-0 top-0 absolute w-full h-full flex justify-center items-center"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <CgSpinnerTwo size={30} className="animate-spin" />
    </div>
  );
};

export default Spinner;
