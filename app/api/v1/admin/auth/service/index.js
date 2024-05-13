import prisma from "@/_lib/prisma";
import { comparePassword } from "@/app/api/utils/comparePassword";
export const createAdminService = async (body) => {
  try {
    const admin = await prisma.Admin.create({
      data: body,
    });
    return admin;
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      throw new Error("Email already in use");
    } else {
      throw new Error("Could not create Admin");
    }
  }
};
export const loginAdminService = async (body) => {
  const { email, password } = body;

  const admin = await prisma.Admin.findUnique({
    where: {
      email,
    },
  });

  if (!admin || !(await comparePassword(password, admin.password))) {
    throw new Error("Email or password is incorrect");
  }
  delete admin.password;
  return { admin, role: admin.role };
};
