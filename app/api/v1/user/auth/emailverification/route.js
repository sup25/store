import { sendVerificationEmailController } from "../controller";
import { internalRes } from "@/app/api/utils/globalResponse";
import prisma from "@/_lib/prisma";
import generateEmailVerificationToken from "./generateEmailVerificationToken";

export async function POST(request) {
  const body = await request.json();
  const { token, user } = body;
  const userId = user.id;
  console.log(token);
  try {
    const createdToken = await prisma.token.create({
      data: {
        token,
        type: "EMAIL_VERIFICATION",
        userId,
        expire: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const emailVerificationToken = await generateEmailVerificationToken(userId);

    await sendVerificationEmailController(user, emailVerificationToken);

    return internalRes("data saved successfully", { createdToken }, 200);
  } catch (error) {
    console.error("Error saving:", error);

    return internalRes("Internal Server Error", null, 500);
  }
}
