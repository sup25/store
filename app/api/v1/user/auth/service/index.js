import prisma from "@/_lib/prisma";
import { comparePassword } from "../utils/comparePassword";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
import jwt from "jsonwebtoken";
export const createUserService = async (body) => {
  try {
    const user = await prisma.User.create({
      data: body,
    });
    return user;
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      throw new Error("Email already in use");
    } else {
      throw new Error("Could not create user");
    }
  }
};

export const loginUserService = async (email, password) => {
  const user = await prisma.User.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Email or password is incorrect");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Email or password is incorrect");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  const AccessTokenPayload = jwt.decode(accessToken);
  const RefreshTokenPayload = jwt.decode(refreshToken);

  const iatAccess = AccessTokenPayload
    ? new Date(AccessTokenPayload.iat * 1000)
    : new Date();
  const expAccess = AccessTokenPayload
    ? new Date(AccessTokenPayload.exp * 1000)
    : null;
  const iatRefresh = RefreshTokenPayload
    ? new Date(RefreshTokenPayload.iat * 1000)
    : new Date();
  const expRefresh = RefreshTokenPayload
    ? new Date(RefreshTokenPayload.exp * 1000)
    : null;

  await prisma.Token.updateMany({
    where: {
      userId: user.id,
      used: true,
      black_list: false,
    },
    data: {
      used: false,
      black_list: true,
    },
  });

  await prisma.Token.createMany({
    data: [
      {
        token: accessToken,
        type: "access",
        userId: user.id,
        created_at: iatAccess,
        expire: expAccess,
        used: true,
        black_list: false,
      },
      {
        token: refreshToken,
        type: "refresh",
        userId: user.id,
        created_at: iatRefresh,
        expire: expRefresh,
        used: true,
        black_list: false,
      },
    ],
  });

  delete user.Password;
  return user;
};
