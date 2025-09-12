import type { NextConfig } from "next";

// Detectar si estamos en Netlify
const isNetlify = process.env.NETLIFY === "true";

const nextConfig: NextConfig = {
  images: {
    // Solo deshabilitar optimización en Netlify
    unoptimized: isNetlify,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  trailingSlash: true, // Para compatibilidad con Netlify
  eslint: {
    ignoreDuringBuilds: true, // Ignorar errores de ESLint durante el build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignorar errores de TypeScript durante el build
  },
};

export default nextConfig;
