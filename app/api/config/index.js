const config = {
  secretKey: process.env.SECRET_KEY,
  refreshTokenSecret: process.env.REFRESH_KEY,
  accessTokenExpiration: 15,
  adminAccessTokenExpiration: "5h",
  refreshTokenExpiration: "7d",
};
export default config;
