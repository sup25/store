import { internalRes } from "@/app/api/utils/globalResponse";
import verifyToken from "../tokenService/verifyToken";
import { generateAccessToken } from "../tokenService/generateTokens";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const { refreshToken } = await request.json();
  console.log("refresh token: ", refreshToken);
  try {
    // Verify the refresh token
    const refreshTokenPayload = await verifyToken(refreshToken, true);
    const user = refreshTokenPayload;

    // Generate a new access token
    const newAccessToken = await generateAccessToken(user);

    return internalRes(
      "Access token refreshed successfully",
      { accessToken: newAccessToken },
      200
    );
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    try {
      await prisma.token.updateMany({
        where: {
          token: refreshToken,
          black_list: false,
        },
        data: {
          black_list: true,
        },
      });
    } catch (updateError) {
      console.error("Error blacklisting token:", updateError.message);
    }
    return internalRes("Error refreshing token", null, 500);
  }
}
