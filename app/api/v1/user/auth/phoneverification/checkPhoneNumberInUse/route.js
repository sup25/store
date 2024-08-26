import prisma from "@/_lib/prisma";
import { internalRes } from "@/app/api/utils/globalResponse";

export async function POST(request) {
  try {
    const { phoneNumber, userId } = await request.json();

    if (!phoneNumber) {
      return internalRes("Missing phone number", { success: false }, 400);
    }

    const existingUser = await prisma.User.findFirst({
      where: { phone: phoneNumber, NOT: { id: userId } },
    });

    if (existingUser) {
      return internalRes(
        "Phone number is already in use by another account.",
        { success: false },
        409
      );
    }

    return internalRes("Phone number is available", { success: true }, 200);
  } catch (error) {
    console.error("Internal server error:", error);
    return internalRes(
      "Internal server error",
      { success: false, error: error.message },
      500
    );
  }
}
