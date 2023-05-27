import dotenv from 'dotenv';
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    IP: process.env.IP,
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_KEY: process.env.SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
    URL: process.env.URL
};