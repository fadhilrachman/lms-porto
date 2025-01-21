/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COOKIE_NAME: process.env.COOKIE_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
};

module.exports = nextConfig;
