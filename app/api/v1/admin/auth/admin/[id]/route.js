import prisma from "@/_lib/prisma";
import { internalRes } from "@/app/api/utils/globalResponse";
import adminAuth from "@/app/api/utils/auth/adminAuth";

export async function GET(request, { params }) {
  const getAdminInfo = async (request) => {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return internalRes("Invalid admin ID", null, 400);
    }

    const admin = await prisma.Admin.findUnique({
      where: {
        id: id,
      },
      select: {
        createdAt: true,
      },
    });

    if (!admin) {
      return internalRes("Admin not found", null, 404);
    }

    delete admin.password;

    return internalRes("Admin found", admin, 200);
  };

  const res = await adminAuth(request, getAdminInfo);
  return res;
}
