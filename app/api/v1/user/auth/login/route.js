import { loginUserValidation } from "../validation";
import { internalRes } from "@/app/api/utils/globalResponse";
import { loginUserController } from "../controller";

export async function POST(request) {
  const body = await request.json();

  const errors = loginUserValidation(body);
  if (errors.length > 0)
    return internalRes("Validation Error", { errors }, 422);

  try {
    const { user, accessToken, refreshToken } = await loginUserController(body);

    return internalRes(
      "User Loggedin successfully",
      { user, accessToken, refreshToken },
      200
    );
  } catch (err) {
    console.log(err);
    return internalRes("Internal Server Error", null, 500);
  }
}
