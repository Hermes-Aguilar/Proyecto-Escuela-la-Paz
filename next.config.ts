import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Miniaturas de publicaciones: las fotos viven en Cloudinary.
    // Unsplash: imágenes de los carruseles del portal general.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Miniaturas de los videos de YouTube embebidos en la galería.
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
