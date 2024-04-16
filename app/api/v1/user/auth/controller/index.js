import { createUserService, loginUserService } from "../service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../tokenService/generateTokens";
import { hashPassword } from "../utils/hashPassword";

export const createUserController = async (body) => {
  const { first_name, last_name, email, password } = body;
  const hashedPassword = await hashPassword(password);
  const user = await createUserService({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });
  delete user.Password;
  return user;
};

export const loginUserController = async (body) => {
  const { email, password } = body;

  const user = await loginUserService(email, password);
  const accessToken = await generateAccessToken(user);

  const refreshToken = await generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};
