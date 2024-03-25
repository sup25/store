import prisma from "@/_lib/prisma";
import verifyToken from "../utils/verifyToken";
import { internalRes } from "@/app/api/utils/globalResponse";
import auth from "@/app/api/utils/auth";

export async function GET(request) {
  const test = async (request) => {
    console.log(request.user);
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
  };
  const res = await auth(request, test);
  return res;
}
