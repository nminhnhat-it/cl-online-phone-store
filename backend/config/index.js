const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  database: {
    uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ntech",
  },
  auth: {
    key: process.env.ACCESS_TOKEN_SECRET || "Ocd000000@",
    expire: 60 * 60, // expire in 15 min
    role: {
      ad: 0,
      us: 1,
    }
  }
};

module.exports = config;