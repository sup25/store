import { NextResponse } from "next/server";
import verifyToken from "../../v1/user/auth/utils/verifyToken";
import { internalRes } from "../globalResponse";

// This function can be marked `async` if using `await` inside
const auth = async (req, cb) => {
  const token = req.headers.get("authorization").split(" ")[1];

  const payload = await verifyToken(token);

  if (payload.error) {
    return internalRes(payload.error, null, 401);
  }
  req.user = payload;
  return await cb(req);
};

export default auth;
