import jwt from "jsonwebtoken";
import config from "@/app/api/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateAccessToken = async (user) => {
  await prisma.token.updateMany({
    where: {
      userId: user.id,
      black_list: false,
    },
    data: {
      black_list: true,
    },
  });

  const accessToken = jwt.sign({ id: user.id }, config.secretKey, {
    expiresIn: config.accessTokenExpiration,
  });

  const decodedAccessToken = jwt.decode(accessToken);

  const expDate = new Date(decodedAccessToken.exp * 1000).toISOString();

  await prisma.token.create({
    data: {
      token: accessToken,
      userId: user.id,
      type: "ACCESS_TOKEN ",
      black_list: false,
      expire: expDate,
    },
  });

  return accessToken;
};

const generateRefreshToken = async (user) => {
  await prisma.token.updateMany({
    where: {
      userId: user.id,
      black_list: false,
    },
    data: {
      black_list: true,
    },
  });

  const refreshToken = jwt.sign({ id: user.id }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiration,
  });

  const decodedRefreshToken = jwt.decode(refreshToken);

  const expDate = new Date(decodedRefreshToken.exp * 1000).toISOString();
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
