import auth from "@/app/api/utils/auth";
import { internalRes } from "@/app/api/utils/globalResponse";

export async function GET(request) {
  const res = await auth(request, (req) => {
    return internalRes("User authenticated", null, 200);
  });
  return res;
}
