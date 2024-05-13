import { internalRes } from "@/app/api/utils/globalResponse";

import { createAdminValidation } from "../validation";
import { createAdminController } from "../controller";

export async function POST(request) {
  const body = await request.json();

  const errors = createAdminValidation(body);
  if (errors.length > 0)
    return internalRes("Validation Error", { errors }, 422);

  try {
    const admin = await createAdminController(body);
    return internalRes("Admin registered successfully", admin, 201);
  } catch (err) {
    console.log(err);
    return internalRes("Internal Server Error", null, 500);
  }
}
