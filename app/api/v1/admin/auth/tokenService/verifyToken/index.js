import jwt from "jsonwebtoken";
import config from "@/app/api/config";

const adminVerifyToken = async (token) => {
  try {
    const verifySecretKey = config.secretKey;
    const payload = jwt.verify(token, verifySecretKey);
    console.log(payload);
    return payload;
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return { error: "Token expired" };
    }
    return { error: "Token verification failed" };
  }
};

export default adminVerifyToken;
