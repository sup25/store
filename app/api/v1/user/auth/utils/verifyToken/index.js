import jwt from "jsonwebtoken";
import config from "@/app/api/config";

const verifyToken = async (token, isRefreshToken = false) => {
  try {
    const verifySecretKey = isRefreshToken
      ? config.refreshTokenSecret
      : config.secretKey;

    const payload = jwt.verify(token, verifySecretKey);

    return payload;
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return { error: "Token expired" };
    }
    return { error: "Token verification failed" };
  }
};

export default verifyToken;
