import prisma from "@/_lib/prisma";
import { internalRes } from "@/app/api/utils/globalResponse";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  console.log("Received token:", token);

  try {
    const foundToken = await prisma.token.findUnique({
      where: { token },
      include: { user: true },
    });

    console.log("Found token:", foundToken);

    if (!foundToken || foundToken.expire < new Date() || foundToken.used) {
      console.error("Token not found, expired, or already used.");
      return internalRes("Invalid, expired, or already used token", {}, 400);
    }

    await prisma.user.update({
      where: { id: foundToken.userId },
      data: { verified_email: true },
    });

    await prisma.token.update({
      where: { id: foundToken.id },
      data: { used: true },
    });

    return internalRes("Email verified successfully", {}, 200);
  } catch (error) {
    console.error("Error verifying email:", error);
    return internalRes("Internal Server Error", {}, 500);
  }
}
