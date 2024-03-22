import prisma from "@/_lib/prisma";
import verifyToken from "../utils/verifyToken";
import { internalRes } from "@/app/api/utils/globalResponse";

export async function GET(request) {
  const user = await prisma.User.findUnique({
    where: {
      id: Number(request.user.id),
    },
  });
  delete user.password;
  if (!user) {
    return internalRes("User not found", null, 404);
  }
  return internalRes("User found", user, 200);
}
