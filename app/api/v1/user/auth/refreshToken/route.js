import { internalRes } from "@/app/api/utils/globalResponse";
import verifyToken from "../utils/verifyToken";
import { generateAccessToken } from "../utils/generateTokens";

export async function POST(request) {
  const { refreshToken } = await request.json();
  console.log("refresh token: ", refreshToken);
  try {
    // Verify the refresh token
    const refreshTokenPayload = await verifyToken(refreshToken, true);

    console.log("Refresh Token Payload:", refreshTokenPayload);
    const userId = refreshTokenPayload.id;
    console.log("user", userId);

    // Generate a new access token
    const newAccessToken = generateAccessToken(userId);

    return internalRes(
      "Access token refreshed successfully",
      { accessToken: newAccessToken },
      200
    );
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    return internalRes("Error refreshing token", null, 500);
  }
}
