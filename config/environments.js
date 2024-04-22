module.exports = {
  PORT: process.env.PORT || "3000",
  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
  MONGODB_CONNECTION_STRING:
    process.env.MONGODB_CONNECTION_STRING ||
    "mongodb://127.0.0.1:27017/blogProject",
  JWT: {
    SECRET: process.env.JWT_SECRET || "123456",
    EXPIRE_TIME: !isNaN(parseInt(process.env.TOKEN_EXPIRE_TIME))
      ? parseInt(process.env.TOKEN_EXPIRE_TIME)
      : 24 * 60 * 60, // 86400
  },
  DEFAULT_LANG: process.env.DEFAULT_LANG || "EN",
  SESSION_SECRET: process.env.SESSION_SECRET || 123456,

  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  REDIS_HOST: process.env.REDIS_HOST || "redis://127.0.0.1:6379",

  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT || "localhost",

  MINIO_PORT: process.env.MINIO_PORT || 9000,

  MINIO_USE_SSL: process.env.MINIO_USE_SSL || false,

  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || "NZ3lt2PnvqCJpJWg4O0c",

  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || "pdCmaCtZg5b24F7IhLMquTF1BcORCEBM1fBIVSb1",

  DOMAIN: process.env.DOMAIN || "http://localhost",


};
