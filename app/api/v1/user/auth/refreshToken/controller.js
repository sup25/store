import { internalRes } from "@/app/api/utils/globalResponse";
import { generateAccessToken } from "../tokenService/generateTokens";
import verifyToken from "../tokenService/verifyToken";
import { invalidateUserTokens } from "../service";

export async function refreshTokenController(refreshToken) {
  try {
    await invalidateUserTokens(refreshToken);
    const refreshTokenPayload = await verifyToken(refreshToken, true);
    const user = refreshTokenPayload;

    const newAccessToken = await generateAccessToken(user);

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
