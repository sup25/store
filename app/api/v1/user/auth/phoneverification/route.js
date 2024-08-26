import prisma from "@/_lib/prisma";
import { internalRes } from "@/app/api/utils/globalResponse";

export async function POST(request) {
  try {
    const { phoneNumber, userId } = await request.json();

    if (!phoneNumber || !userId) {
      return internalRes("Missing required fields", { success: false }, 400);
    }

    await prisma.User.update({
      where: { id: userId },
      data: { phone: phoneNumber, verified_phone: true },
    });

    return internalRes(
      "Phone number stored successfully",
      { success: true },
      200
    );
  } catch (error) {
    console.error("Internal server error:", error);
    return internalRes(
      "Internal server error",
      { success: false, error: error.message },
      500
    );
  }
}
