import jwt from "jsonwebtoken";
import config from "@/app/api/config";

const verifyToken = async (token) => {
  try {
    const payload = jwt.verify(token, config.secretKey);

    return payload;
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return { error: "Token expired" };
    }
    return { error: "Token verification failed" };
  }
};

export default verifyToken;
