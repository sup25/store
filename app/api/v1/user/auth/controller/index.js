import { hashPassword } from "@/app/api/utils/hashPassword";
import {
  addAddressService,
  createUserService,
  loginUserService,
  sendVerificationEmailService,
} from "../service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../tokenService/generateTokens";

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

  const { user, role } = await loginUserService(email, password);
  const accessToken = await generateAccessToken(user);

  const refreshToken = await generateRefreshToken(user);

  return { user, role, accessToken, refreshToken };
};

export const addAddressController = async (userId, addressData) => {
  const address = await addAddressService(userId, addressData);
  return address;
};

export const sendVerificationEmailController = async (user, token) => {
  await sendVerificationEmailService(user, token);
};
