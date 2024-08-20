import { useAuth } from "@/context/AuthContext";

export const MemberDate = ({ totalProducts }) => {
  const { admin } = useAuth();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const svgBackground = `
    <svg width="100%" height="100" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FFDDC1;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:#FFABAB;stop-opacity:0.2" />
        </linearGradient>
      </defs>
      <path fill="url(#grad1)"  d="M0,128L30,128C60,128,120,128,180,144C240,160,300,192,360,186.7C420,181,480,139,540,128C600,117,660,139,720,160C780,181,840,203,900,186.7C960,171,1020,117,1080,128C1140,139,1200,213,1260,202.7C1320,192,1380,96,1440,80L1500,64V320H0Z"></path>
    </svg>
  `;

  return (
    <div
      className="admin-dash-card md:max-w-[500px] gap-10 p-6"
      style={{
        position: "relative",
        overflow: "hidden",
        background: `url('data:image/svg+xml;base64,${btoa(
          svgBackground
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
