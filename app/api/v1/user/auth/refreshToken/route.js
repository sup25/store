import { refreshTokenController } from "./controller";

export async function POST(request) {
  const { refreshToken } = await request.json();

  return refreshTokenController(refreshToken);
}
