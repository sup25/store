import { useAuth } from "@/context/AuthContext";
import { memberJoinSVG } from "./svgBackground";

export const MemberJoinDate = ({ totalProducts }) => {
  const { admin } = useAuth();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div
      className="admin-dash-card md:max-w-[500px] gap-10 p-6"
      style={{
        position: "relative",
        overflow: "hidden",
        background: `url('data:image/svg+xml;base64,${btoa(
          memberJoinSVG
        )}') no-repeat center bottom`,
        backgroundSize: "cover",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        color: "#333",
      }}
    >
      <p className="md:text-2xl font-heading  text-xl font-bold">
        Joined:{" "}
        {admin?.createdAt ? formatDate(admin.createdAt) : "Date not available"}
      </p>
      <h2 className="md:text-2xl text-xl font-heading  font-bold">
        Total Products ({totalProducts})
      </h2>
    </div>
  );
};
