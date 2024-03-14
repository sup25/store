import prisma from "@/_lib/prisma";

export const createUserService = async (body) => {
  const user = await prisma.user_information.create({
    data: body,
  });

  return user;
};

export const loginUserService = async (body) => {};
