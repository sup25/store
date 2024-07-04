import { internalRes } from "@/app/api/utils/globalResponse";
import twilio from "twilio";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.NEXT_PUBLIC_TWILIO_VERIFY_SERVICE_SID;

const client = twilio(accountSid, authToken);

export async function POST(request) {
  const { phoneNumber } = await request.json();

  try {
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({ to: phoneNumber, channel: "sms" });
    return internalRes("phone verification code sent", { verification }, 200);
  } catch (error) {
    return internalRes("internal server error", { success: false }, 500);
  }
}
