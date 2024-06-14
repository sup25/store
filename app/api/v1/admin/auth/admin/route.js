import adminAuth from "@/app/api/utils/auth/adminAuth";
import { internalRes } from "@/app/api/utils/globalResponse";

export async function GET(request) {
  const res = await adminAuth(request, (req) => {
    console.log(req);
    return internalRes("Admin authenticated", res, 200);
  });
  return res;
}
