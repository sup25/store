import { internalRes } from "@/app/api/utils/globalResponse";

import { loginAdminValidation } from "../validation";
import { loginAdminController } from "../controller";

export async function POST(request) {
  const body = await request.json();

  const errors = loginAdminValidation(body);
  if (errors.length > 0)
    return internalRes("Validation Error", { errors }, 422);

  try {
    const { admin, role, accessToken } = await loginAdminController(body);
    return internalRes(
      "Admin Logged in successfully",
      { admin, role, accessToken },
      201
    );
  } catch (err) {
    console.log(err);
    return internalRes("Internal Server Error", null, 500);
  }
}
