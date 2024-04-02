import jwt from "jsonwebtoken";
import config from "@/app/api/config";

const generateAccessToken = (id) => {
  const accessToken = jwt.sign({ id }, config.secretKey, {
    expiresIn: config.accessTokenExpiration,
  });

  return accessToken;
};

const generateRefreshToken = (id) => {
  const refreshToken = jwt.sign({ id }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiration,
  });
  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
