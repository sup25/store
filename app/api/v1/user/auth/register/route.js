import { createUserValidation } from "../validation";
import { createUserController } from "../controller";
import { internalRes } from "@/app/api/utils/globalResponse";

export async function POST(request) {
  const body = await request.json();

  createUserValidation(body);
  try {
    const user = await createUserController(body);

    return internalRes("User registered successfully", user, 201);
  } catch (err) {
    console.log(err);
    return internalRes("Internal Server Error", null, 500);
  }
}
