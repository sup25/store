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
    return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error("Error registering user");
  }
};

export const loginUserController = (body) => {};
