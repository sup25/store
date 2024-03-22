import prisma from "@/_lib/prisma";
import verifyToken from "../../utils/verifyToken";

export async function Get(request) {
  const { id } = request.params;
  const token = request.headers.authorization?.split(" ")[1];
  console.log(id, request);
  console.log(token);
  verifyToken(token);
  const user = await prisma.User.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!user) {
    return internalRes("User not found", null, 404);
  }
  return internalRes("User found", user, 200);
}
