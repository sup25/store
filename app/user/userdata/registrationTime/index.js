import { useAuth } from "@/context/AuthContext";
import { FaRegCalendarAlt } from "react-icons/fa";
export const RegistrationTime = () => {
  const { user } = useAuth();
  const dateToConvert = user?.created_at;
  const date = new Date(dateToConvert);
  const formattedDate = date.toLocaleString();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt />
        <p className="font-others font-bold">Registration Date</p>
      </div>
      <p className="font-others font-medium">{formattedDate}</p>
    </div>
  );
};
