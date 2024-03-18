import jwt from "jsonwebtoken";
import config from "@/app/api/config";

const generateAccessToken = (user) => {
  // Generate access token
  const accessToken = jwt.sign(user, config.secretKey, {
    expiresIn: config.accessTokenExpiration,
  });
  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiration,
  });
  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
