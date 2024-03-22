import { createUserService, loginUserService } from "../service";
import { generateAccessToken } from "../utils/generateTokens";
import { hashPassword } from "../utils/hashPassword";

export const createUserController = async (body) => {
  const { first_name, last_name, email, password } = body;

  try {
    const hashedPassword = await hashPassword(password);

    const user = await createUserService({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    delete user.Password;
    return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error("Error registering user");
  }
};

export const loginUserController = async (body) => {
  const { email, password } = body;
  try {
    const user = await loginUserService(email, password);
    const token = generateAccessToken(user.id);
    return { user, token };
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw new Error(error.message);
  }
};
