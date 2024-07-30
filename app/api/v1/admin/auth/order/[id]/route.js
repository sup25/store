import { internalRes } from "@/app/api/utils/globalResponse";
import { getOrderController } from "../controller";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const getSuccessfulOrder = await getOrderController(parseInt(id, 10));
    console.log(getSuccessfulOrder);
    return internalRes(
      "completed order successfully recived ",
      getSuccessfulOrder,
      200
    );
  } catch (error) {
    console.log(error);
    return internalRes("internal server error", null, 500);
  }
}
