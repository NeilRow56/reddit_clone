/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "https://static.vecteezy.com",
      },
    ],
  },
};
export default nextConfig;
