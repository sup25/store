import adminVerifyToken from "@/app/api/v1/admin/auth/tokenService/verifyToken";
import { internalRes } from "../../globalResponse";

const adminAuth = async (req, cb) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return internalRes("Authorization header missing", null, 401);
  }
  const token = authHeader.split(" ")[1];
  const payload = await adminVerifyToken(token);

  if (payload.error) {
    return internalRes(payload.error, null, 401);
  }

  req.admin = payload;
  return await cb(req);
};

export default adminAuth;
