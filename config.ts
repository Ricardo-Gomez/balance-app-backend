export default () => {
  return {
    port: parseInt(process.env.PORT, 10) || 3001,
    mongo: {
      uri: process.env.MONGODB_URI || process.env.MONGO_URL, // MONGO_URL for backwards compatibility
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS,
    },
    googleAuth: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    jwt: {
      accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
      accessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
      refreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    },
    corsOriginList: process.env.CORS_ORIGIN_LIST || '',
  };
};
