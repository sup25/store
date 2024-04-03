import jwt from "jsonwebtoken";
import config from "@/app/api/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const verifyToken = async (token, isRefreshToken = false) => {
  try {
    const verifySecretKey = isRefreshToken
      ? config.refreshTokenSecret
      : config.secretKey;

    const payload = jwt.verify(token, verifySecretKey);

    const blacklistedToken = await prisma.token.findFirst({
      where: {
        token,
        black_list: true,
        id: payload.id,
      },
    });

    if (blacklistedToken) {
      throw new Error("Token blacklisted");
    }

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
