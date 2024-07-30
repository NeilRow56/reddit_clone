/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "static.vecteezy.com",
      },
      {
        hostname: "avatar.vercel.sh",
        port: "",
      },
    ],
  },
};
export default nextConfig;
