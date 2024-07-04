import { internalRes } from "@/app/api/utils/globalResponse";
import { addAddressController } from "../../controller";

export async function POST(request, { params }) {
  const { id: userId } = params;
  const body = await request.json();
  console.log("Received address data:", body);

  try {
    const address = await addAddressController(userId, body);
    console.log("Address added:", address); // Log the address returned by controller
    return internalRes("Address added successfully", { address }, 200);
  } catch (error) {
    console.error("Error adding address:", error);
    return internalRes("Internal Server Error", null, 500);
  }
}
