import React from "react";
import { Metadata } from "next";
import AllWorkshops from "../../../../components/xios-academy/workshops/AllWorkshops";
import { Academy } from "../../student-portal/page";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Función para generar metadata dinámica basada en los workshops
async function generateMetadata(): Promise<Metadata> {
  let workshops: Academy[] = [];
  let workshopsCount = 0;
  let avgPrice = 0;

  try {
    const res = await fetch(`${BASE_URL}/xios-academy/event?type=workshop`);
    if (res.ok) {
      workshops = await res.json();
    }

    workshopsCount = workshops.length;
    avgPrice =
      workshops.length > 0
        ? Math.round(
            workshops.reduce(
              (acc: number, w: { price?: number }) => acc + (w.price || 0),
              0
            ) / workshops.length
          )
        : 0;
  } catch (error) {
    console.error("Error loading workshops for metadata:", error);
  }

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com";
  const currentUrl = `${baseUrl}/xios-academy/events/workshops`;

  return {
    title:
      "Talleres de Desarrollo Profesional | XIOS Academy - Transformación y Crecimiento",
    description: `Descubre ${workshopsCount} talleres intensivos de desarrollo profesional en XIOS Academy. Experiencias de aprendizaje prácticas para potenciar tu crecimiento personal y profesional con certificación oficial.`,

    keywords: [
      "talleres profesionales",
      "desarrollo personal",
      "capacitación empresarial",
      "workshops presenciales",
      "certificación profesional",
      "formación práctica",
      "XIOS Academy",
      "liderazgo",
      "emprendimiento",
      "coaching profesional",
      "desarrollo de habilidades",
      "transformación personal",
    ].join(", "),

    authors: [{ name: "XIOS Academy" }],
    creator: "XIOS Academy",
    publisher: "XIOS Academy",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      type: "website",
      locale: "es_ES",
      url: currentUrl,
      siteName: "XIOS Academy",
      title: "Talleres de Desarrollo Profesional | XIOS Academy",
      description: `Transforma tu carrera con ${workshopsCount} talleres especializados. Experiencias prácticas de aprendizaje con certificación oficial.`,
      images: [
        {
          url: `${baseUrl}/logo-xiomara-sanchez.webp`,
          width: 1200,
          height: 630,
          alt: "XIOS Academy - Talleres de Desarrollo Profesional",
          type: "image/webp",
        },
        {
          url: `${baseUrl}/byxio.webp`,
          width: 800,
          height: 600,
          alt: "Talleres XIOS Academy",
          type: "image/webp",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Talleres de Desarrollo Profesional | XIOS Academy",
      description: `${workshopsCount} talleres especializados para tu crecimiento profesional`,
      images: [`${baseUrl}/logo-xiomara-sanchez.webp`],
      creator: "@xiosacademy",
      site: "@xiosacademy",
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        "es-ES": currentUrl,
        es: currentUrl,
      },
    },

    other: {
      "theme-color": "#10B981", // Verde de tu paleta
      "color-scheme": "light",
      "twitter:label1": "Talleres Disponibles",
      "twitter:data1": workshopsCount.toString(),
      "twitter:label2": "Precio Promedio",
      "twitter:data2":
        avgPrice > 0 ? `$${avgPrice.toLocaleString()} COP` : "Consultar",
      "article:author": "XIOS Academy",
      "article:section": "Educación",
      "og:region": "CO",
      "og:country-name": "Colombia",
      "geo.region": "CO",
      "geo.placename": "Colombia",
    },
  };
}

export const metadata = await generateMetadata();

const WorkshopsPage = async () => {
  let workshops = [];

  try {
    const res = await fetch(`${BASE_URL}/xios-academy/event?type=workshop`, {
      cache: "no-store",
    });
    if (res.ok) {
      workshops = await res.json();
    }
  } catch (error) {
    console.error("Error loading workshops:", error);
  }

  // Structured Data para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "XIOS Academy",
    description:
      "Academia de desarrollo profesional y personal especializada en talleres intensivos y transformación de carrera",
    url: `${
      process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com"
    }/xios-academy/events/workshops`,
    logo: `${
      process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com"
    }/logo-xiomara-sanchez.webp`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
      addressRegion: "Colombia",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+57-XXX-XXX-XXXX", // Reemplaza con el teléfono real
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [
      "https://facebook.com/xiosacademy",
      "https://instagram.com/xiosacademy",
      "https://linkedin.com/company/xiosacademy",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Talleres de Desarrollo Profesional",
      description:
        "Catálogo completo de talleres especializados para el crecimiento profesional y personal",
      itemListElement: workshops.map(
        (
          workshop: {
            id: string;
            slug: string;
            title: string;
            description_short: string;
            level?: string;
            duration?: string;
            start_date: string;
            location?: string;
            price?: number;
          },
          index: number
        ) => ({
          "@type": "Course",
          "@id": `${
            process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com"
          }/xios-academy/events/workshops/${workshop.slug}`,
          name: workshop.title,
          description: workshop.description_short,
          provider: {
            "@type": "EducationalOrganization",
            name: "XIOS Academy",
          },
          courseMode: "onsite",
          educationalLevel: workshop.level || "intermediate",
          timeRequired: workshop.duration ? `PT${workshop.duration}H` : "PT8H",
          startDate: workshop.start_date,
          location: workshop.location
            ? {
                "@type": "Place",
                name: workshop.location,
              }
            : {
                "@type": "VirtualLocation",
                url: `${
                  process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com"
                }/xios-academy/events/workshops/${workshop.slug}`,
              },
          offers: {
            "@type": "Offer",
            price: workshop.price || 0,
            priceCurrency: "COP",
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
            category: "EducationalService",
          },
          position: index + 1,
          keywords: [
            workshop.title,
            "desarrollo profesional",
            "taller",
            "capacitación",
            "certificación",
          ].join(", "),
        })
      ),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  console.log(workshops, "<-- workshops");

  return (
    <>
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div>
        <AllWorkshops workshops={workshops} />
      </div>
    </>
  );
};

export default WorkshopsPage;
