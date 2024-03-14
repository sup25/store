import { createUserController } from "../controller";
import { createUserValidation } from "../validation";

export async function POST(request) {
  const body = await request.json();

  try {
    createUserValidation(body);
    const user = await createUserController(body);

    return Response.json(
      {
        message: "User registered successfully",
        data: { user },
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
