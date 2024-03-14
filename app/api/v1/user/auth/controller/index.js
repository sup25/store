import { createUserService } from "../service";
import { hashPassword } from "../untils/hashPassword";

export const createUserController = async (body) => {
  const { fullName, email, password } = body;

  try {
    const hashedPassword = await hashPassword(password);

    const user = await createUserService({
      Full_Name: fullName,
      Email: email,
      Password: hashedPassword,
    });

    delete user.Password;
    // generate jwt tokens
    // store tokens to the db (tokens table)
    return Response.json(
      {
        message: "User registered successfully",
        data: { user },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error.message);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const loginUserController = (body) => {};
