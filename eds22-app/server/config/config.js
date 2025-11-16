module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/eds22',
  jwtSecret: process.env.JWT_SECRET || 'eds22_secret_key_2025',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  uploadPath: process.env.UPLOAD_PATH || './uploads',
  maxFileSize: process.env.MAX_FILE_SIZE || 5242880 // 5MB
};
