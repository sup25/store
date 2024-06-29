import { useAuth } from "@/context/AuthContext";

export const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div className="px-2 w-full flex flex-col justify-center items-center">
      <div className="relative w-full flex items-center justify-center max-w-[400px]">
        <div className="w-full h-[100px] bg-[url('/images/wall.png')] bg-cover flex justify-center">
          <div className="bg-[#2D2D2D] absolute w-[103px] h-[103px] rounded-full top-12 border-white border-2 "></div>
        </div>
      </div>
      <div className="flex mt-14 flex-col gap-1 text-center">
        <p className="font-bold  text-base">{user?.first_name}</p>
        <p className="font-medium  text-base">{user?.email}</p>
      </div>
    </div>
  );
};
