import { useAuth } from "@/context/AuthContext";
import { GiAbstract087 } from "react-icons/gi";
export const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div className="px-2 w-full flex flex-col justify-center items-center">
      <div className="relative w-full flex items-center justify-center max-w-[400px]">
        <div className="w-full h-[100px] bg-[url('/images/wall.png')] bg-cover flex justify-center">
          <div className=" bg-[#2D2D2D] absolute w-[102px] h-[102px] rounded-full top-12 text-white flex items-center justify-center border-white border-2 ">
            <GiAbstract087 size={70} />
          </div>
        </div>
      </div>
      <div className="flex mt-14 flex-col gap-1 text-center">
        <p className="font-bold font-others capitalize ">
          {user?.first_name} {user?.last_name}
        </p>
        <p className=" font-others">{user?.email}</p>
      </div>
    </div>
  );
};
