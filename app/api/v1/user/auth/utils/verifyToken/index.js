import jwt from "jsonwebtoken";
import config from "@/app/api/config";

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, config.secretKey);
    console.log("verify", verify);
    return verify;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

export default verifyToken;
