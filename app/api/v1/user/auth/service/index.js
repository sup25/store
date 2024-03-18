import prisma from "@/_lib/prisma";
import { comparePassword } from "../utils/comparePassword";

export const createUserService = async (body) => {
  const user = await prisma.user_information.create({
    data: body,
  });

  return user;
};

export const loginUserService = async (email, password) => {
  const user = await prisma.user_information.findUnique({
    where: {
      Email: email,
    },
  });

  if (!user) {
    throw new Error("Email or password is incorrect");
  }

  const isPasswordValid = await comparePassword(password, user.Password);
  if (!isPasswordValid) {
    throw new Error("Email or password is incorrect");
  }
  delete user.Password;
  return user;
};
