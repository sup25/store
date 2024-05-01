const config = {
  secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  refreshTokenSecret: process.env.NEXT_PUBLIC_REFRESH_KEY,
  accessTokenExpiration: 15,
  adminAccessTokenExpiration: "5h",
  refreshTokenExpiration: "7d",
};
export default config;
