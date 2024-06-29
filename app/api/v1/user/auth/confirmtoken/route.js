import prisma from "@/_lib/prisma";
import { internalRes } from "@/app/api/utils/globalResponse";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  console.log(token);

  try {
    const foundToken = await prisma.token.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!foundToken || foundToken.expire < new Date()) {
      return internalRes("Invalid or expired token", {}, 400);
    }

    await prisma.user.update({
      where: { id: foundToken.userId },
      data: { verified_email: true },
    });

    await prisma.token.delete({ where: { id: foundToken.id } });

    return internalRes("Email verified successfully", {}, 200);
  } catch (error) {
    console.error("Error verifying email:", error);
    return internalRes("Internal Server Error", {}, 500);
  }
}
