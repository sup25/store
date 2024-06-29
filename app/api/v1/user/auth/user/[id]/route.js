import prisma from "@/_lib/prisma";
import auth from "@/app/api/utils/auth";
import { internalRes } from "@/app/api/utils/globalResponse";

export async function GET(request, { params }) {
  const getUserInfo = async (user) => {
    const userData = await prisma.user.findUnique({
      where: {
        id: Number(params.id),
      },
      include: { addresses: true },
    });

    if (!userData) {
      return internalRes("User not found", null, 404);
    }

    delete userData.password;

    return internalRes("User found", userData, 200);
  };

  try {
    const res = await auth(request, getUserInfo);
    return res;
  } catch (error) {
    console.error("Authentication error:", error);
    return internalRes("Unauthorized", null, 401);
  }
}
