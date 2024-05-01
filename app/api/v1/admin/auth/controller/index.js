import { hashPassword } from "@/app/api/utils/hashPassword";

import { createAdminService, loginAdminService } from "../service";
import { adminGenerateAccessToken } from "../tokenService/generateToken";

export const createAdminController = async (body) => {
  const { name, email, password } = body;
  const hashedPassword = await hashPassword(password);
  const admin = await createAdminService({
    name,
    email,
    password: hashedPassword,
  });
  delete admin.password;
  return admin;
};

export const loginAdminController = async (body) => {
  const { email, password } = body;
  const { admin, role } = await loginAdminService({
    email,
    password,
  });
  const accessToken = await adminGenerateAccessToken(admin);

  return { admin, accessToken, role };
};
