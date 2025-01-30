/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextui.org',
        port: '',
        pathname: '/images/**',
        search: '',
      },
    ],
  },
  env: {
    COOKIE_NAME: process.env.COOKIE_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
};

module.exports = nextConfig;
