/** @type {import('next').NextConfig} */





const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  images: {
    domains: ['lh3.googleusercontent.com',"s.gravatar.com","anythinpocketimage.s3.ap-southeast-2.amazonaws.com"],
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  
  skipWaiting: true,
  register: true,
});

module.exports = withPWA(nextConfig);