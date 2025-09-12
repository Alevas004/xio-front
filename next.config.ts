import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Deshabilitar optimización de imágenes para Netlify
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
  // Comentamos output export para usar modo normal
  // output: 'export',
  trailingSlash: true, // Para compatibilidad con Netlify
  eslint: {
    ignoreDuringBuilds: true, // Ignorar errores de ESLint durante el build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignorar errores de TypeScript durante el build
  },
};

export default nextConfig;
