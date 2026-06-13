import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Miniaturas de publicaciones: las fotos viven en Cloudinary.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
