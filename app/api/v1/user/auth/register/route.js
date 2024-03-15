import { createUserValidation } from "../validation";
import { createUserController } from "../controller";
import { internalRes } from "@/app/api/utils/globalResponse";

export async function POST(request) {
  const body = await request.json();

  const errors = createUserValidation(body);
  if (errors.length > 0)
    return internalRes("Validation Error", { errors }, 422);

  try {
    const user = await createUserController(body);

    return internalRes("User registered successfully", user, 201);
  } catch (err) {
    console.log(err);
    return internalRes("Internal Server Error", null, 500);
  }
}
