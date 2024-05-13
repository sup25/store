import prisma from "@/_lib/prisma";
import { comparePassword } from "@/app/api/utils/comparePassword";

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
  delete user.Password;
  return { user, role: user.role };
};

export const invalidateUserTokens = async (token) => {
  const result = await prisma.token.updateMany({
    where: {
      token,
      black_list: false,
    },
    data: {
      black_list: true,
    },
  });

  return result;
};
