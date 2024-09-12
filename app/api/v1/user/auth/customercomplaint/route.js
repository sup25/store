import { internalRes } from "@/app/api/utils/globalResponse";
import { sendComplaintEmailController } from "../controller";

export async function POST(request) {
  try {
    const body = await request.json();

    const complaint = sendComplaintEmailController({
      body,
    });
    return internalRes("Complaint sent successfully", { complaint }, 200);
  } catch (error) {
    console.log("error sending complaint", error);
    return internalRes("Internal Server Error", null, 500);
  }
}
