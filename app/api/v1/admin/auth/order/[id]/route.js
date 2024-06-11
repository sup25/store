import { internalRes } from "@/app/api/utils/globalResponse";
import { getOrderController } from "../controller";

export async function GET(request, { params }) {
  const id = params;
  console.log(id);
  try {
    const getSuccessfulOrder = await getOrderController(id);
    return internalRes("successful order recived", getSuccessfulOrder, 200);
  } catch (error) {
    return internalRes("internal server error", null, 500);
  }
}
