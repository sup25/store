import jwt from "jsonwebtoken";
import config from "@/app/api/config";
import { PrismaClient } from "@prisma/client";
import Expiration from "../../utils/checkExpiration";

const prisma = new PrismaClient();

const generateAccessToken = async (user) => {
  const accessToken = jwt.sign({ id: user.id }, config.secretKey, {
    expiresIn: config.accessTokenExpiration,
  });

  const expDate = Expiration(config.accessTokenExpiration);

  await prisma.token.create({
    data: {
      token: accessToken,
      userId: user.id,
      type: "ACCESS_TOKEN",
      black_list: false,
      expire: expDate,
    },
  });

  return accessToken;
};

const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign({ id: user.id }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiration,
  });

  const expDate = Expiration(config.refreshTokenExpiration);
  await prisma.token.create({
    data: {
      token: refreshToken,
      userId: user.id,
      type: "REFRESTH_TOKEN",
      black_list: false,
      expire: expDate,
    },
  });

  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
