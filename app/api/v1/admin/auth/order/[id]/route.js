import { internalRes } from "@/app/api/utils/globalResponse";
import { getCompletedOrderController } from "../controller";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const getSuccessfulOrder = await getCompletedOrderController(
      parseInt(id, 10)
    );

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
