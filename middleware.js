import { NextResponse } from "next/server";
import verifyToken from "./app/api/v1/user/auth/utils/verifyToken";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = request.headers.get("authorization").split(" ")[1];

  console.log(token);
  const payload = await verifyToken(token);
  console.log(payload);
  if (payload.error) {
    return NextResponse.json(payload.error, { status: 401 });
  }
  request.user = payload;
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/v1/user/auth/user",
};
