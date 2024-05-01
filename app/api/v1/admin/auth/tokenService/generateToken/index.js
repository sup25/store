import jwt from "jsonwebtoken";
import config from "@/app/api/config";
import { PrismaClient } from "@prisma/client";
import Expiration from "@/app/api/utils/checkExpiration";

const prisma = new PrismaClient();

const adminGenerateAccessToken = async (admin) => {
  const accessToken = jwt.sign(
    { id: admin.id, role: admin.role },
    config.secretKey,
    {
      expiresIn: config.adminAccessTokenExpiration,
    }
  );

  const expDate = Expiration(config.adminAccessTokenExpiration);

  await prisma.token.create({
    data: {
      token: accessToken,
      adminId: admin.id,
      type: "ACCESS_TOKEN",
      expire: expDate,
    },
  });

  return accessToken;
};

export { adminGenerateAccessToken };
