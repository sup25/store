import prisma from "@/_lib/prisma";
import { internalRes } from "@/app/api/utils/globalResponse";
import twilio from "twilio";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.NEXT_PUBLIC_TWILIO_VERIFY_SERVICE_SID;

const client = twilio(accountSid, authToken);

export async function POST(request) {
  try {
    const { phoneNumber, code, userId } = await request.json();

    if (!phoneNumber || !code || !userId) {
      return internalRes("Missing required fields", { success: false }, 400);
    }

    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({ to: phoneNumber, code });

    if (verificationCheck.status === "approved") {
      await prisma.User.update({
        where: { id: userId },
        data: { phone: phoneNumber, verified_phone: true },
      });
      return internalRes("Phone verification success", { success: true }, 200);
    } else {
      console.error("Verification failed:", verificationCheck);
      return internalRes("Phone verification failed", { success: false }, 400);
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return internalRes(
      "Internal server error",
      { success: false, error: error.message },
      500
    );
  }
}
