import { createUserController } from "../controller";
import { createUserValidation } from "../validation";

export async function POST(request) {
  const body = await request.json();

  createUserValidation(body);

  await createUserController(body);
}
