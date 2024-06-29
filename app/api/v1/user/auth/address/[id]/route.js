import { internalRes } from "@/app/api/utils/globalResponse";
import { addAddressController } from "../../controller";

export async function POST(request, { params }) {
  const { id: userId } = params;
  const body = await request.json();

  try {
    const address = await addAddressController(userId, body);
    return internalRes("address added successfully", { address }, 200);
  } catch (error) {
    console.log(error);
    return internalRes("Internal Server Error", null, 500);
  }
}
