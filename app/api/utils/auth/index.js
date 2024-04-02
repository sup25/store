import verifyToken from "../../v1/user/auth/utils/verifyToken";
import { internalRes } from "../globalResponse";

const auth = async (req, cb) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return internalRes("Authorization header missing", null, 401);
  }

  const token = authHeader.split(" ")[1];

  console.log("token auth:", token);

  const payload = await verifyToken(token);

  if (payload.error) {
    return internalRes(payload.error, null, 401);
  }

  req.user = payload;

  return await cb(req);
};

export default auth;
