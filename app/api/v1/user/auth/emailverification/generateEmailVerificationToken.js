import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateEmailVerificationToken = async (userId) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expire = new Date();
  expire.setHours(expire.getHours() + 1);

  await prisma.token.create({
    data: {
      token,
      userId,
      type: "EMAIL_VERIFICATION",
      black_list: false,
      expire,
    },
  });

  return token;
};

export default generateEmailVerificationToken;
