/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "tailwindui.com",
      "pancakeswap.finance",
      "tokens.pancakeswap.finance",
    ],
  },
};

module.exports = nextConfig;
