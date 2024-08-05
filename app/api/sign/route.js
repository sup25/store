import { v2 as cloudinary } from "cloudinary";
import { internalRes } from "../utils/globalResponse";

export async function POST(request) {
  try {
    const body = await request.json();
    const { paramsToSign, api_key } = body;
    console.log(body);

    const expectedApiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (api_key !== expectedApiKey) {
      return internalRes("Invalid API Key", null, 401);
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      apiSecret
    );
    console.log(signature);
    return internalRes("successful", { signature }, 200);
  } catch (error) {
    console.error("Error generating signature:", error);
    return internalRes("Internal Server Error", null, 500);
  }
}
