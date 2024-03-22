import prisma from "@/_lib/prisma";
import { loginUserValidation } from "../validation";
import { internalRes } from "@/app/api/utils/globalResponse";
import { loginUserController } from "../controller";

import verifyToken from "../utils/verifyToken";

export async function POST(request) {
  const body = await request.json();

  const errors = loginUserValidation(body);
  if (errors.length > 0)
    return internalRes("Validation Error", { errors }, 422);

  try {
    const { user, token } = await loginUserController(body);

    const isTokenVerified = verifyToken(token);

    if (!isTokenVerified) {
      return internalRes("Invalid access token", null, 401);
    }
    return internalRes("User Loggedin successfully", { user, token }, 200);
  } catch (err) {
    console.log(err);
    return internalRes("Internal Server Error", null, 500);
  }
}
