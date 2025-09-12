import axios from "axios";
import React from "react";
import { Metadata } from "next";
import AllRetreats from "../../../../components/xios-academy/retreats/AllRetreats";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Función para generar metadata dinámica basada en los retiros
async function generateMetadata(): Promise<Metadata> {
  let retreats = [];
  let retreatsCount = 0;
  let avgPrice = 0;

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/event?type=retreat`);
    retreats = res.data;
    retreatsCount = retreats.length;
    avgPrice =
      retreats.length > 0
        ? Math.round(
            retreats.reduce(
              (acc: number, r: { price?: number }) => acc + (r.price || 0),
              0
            ) / retreats.length
          )
        : 0;
  } catch (error) {
    console.error("Error loading retreats for metadata:", error);
  }

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com";
  const currentUrl = `${baseUrl}/xios-academy/events/retreats`;

  return {
    title:
      "Retiros Transformacionales | XIOS Academy - Bienestar Integral y Autoconocimiento",
    description: `Descubre ${retreatsCount} retiros transformacionales en XIOS Academy. Experiencias intensivas de bienestar integral, conexión natural y autoconocimiento para tu crecimiento personal.`,

    keywords: [
      "retiros transformacionales",
      "bienestar integral",
      "autoconocimiento",
      "crecimiento personal",
      "conexión natural",
      "mindfulness retiros",
      "XIOS Academy",
      "retiros wellness",
      "transformación personal",
      "retiros espirituales",
      "desarrollo interior",
      "retiros bienestar",
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
      title: "Retiros Transformacionales | XIOS Academy",
      description: `Reconéctate contigo mismo con ${retreatsCount} retiros de bienestar integral. Experiencias transformacionales en conexión con la naturaleza.`,
      images: [
        {
          url: `${baseUrl}/logo-xiomara-sanchez.webp`,
          width: 1200,
          height: 630,
          alt: "XIOS Academy - Retiros Transformacionales",
          type: "image/webp",
        },
        {
          url: `${baseUrl}/byxio.webp`,
          width: 800,
          height: 600,
          alt: "Retiros XIOS Academy",
          type: "image/webp",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Retiros Transformacionales | XIOS Academy",
      description: `${retreatsCount} retiros de bienestar integral y autoconocimiento`,
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
      "twitter:label1": "Retiros Disponibles",
      "twitter:data1": retreatsCount.toString(),
      "twitter:label2": "Precio Promedio",
      "twitter:data2":
        avgPrice > 0 ? `$${avgPrice.toLocaleString()} COP` : "Consultar",
      "article:author": "XIOS Academy",
      "article:section": "Bienestar",
      "og:region": "CO",
      "og:country-name": "Colombia",
      "geo.region": "CO",
      "geo.placename": "Colombia",
    },
  };
}

export const metadata = await generateMetadata();

const RetreatsPage = async () => {
  let retreats = [];

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/event?type=retreat`);
    retreats = res.data;
  } catch (error) {
    console.error("Error loading retreats:", error);
  }

  // Structured Data para SEO PROMAX
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Retiros Transformacionales | XIOS Academy",
    description:
      "Retiros transformacionales de bienestar integral y autoconocimiento. Experiencias intensivas en conexión con la naturaleza para el crecimiento personal.",
    url: `${baseUrl}/xios-academy/events/retreats`,
    publisher: {
      "@type": "Organization",
      name: "XIOS Academy",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo-xiomara-sanchez.webp`,
        width: "300",
        height: "100",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+57-1-234-5678",
        contactType: "customer service",
        availableLanguage: "Spanish",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "CO",
        addressRegion: "Bogotá",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: retreats.length,
      itemListElement: retreats.slice(0, 5).map(
        (
          retreat: {
            id?: string;
            name?: string;
            description?: string;
            startDate?: string;
            endDate?: string;
            price?: number;
          },
          index: number
        ) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Event",
            name: retreat.name || "Retiro Transformacional",
            description:
              retreat.description ||
              "Retiro de bienestar integral y autoconocimiento en conexión con la naturaleza",
            startDate: retreat.startDate || new Date().toISOString(),
            endDate:
              retreat.endDate ||
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            location: {
              "@type": "Place",
              name: "Entorno Natural",
              address: {
                "@type": "PostalAddress",
                addressCountry: "CO",
              },
            },
            organizer: {
              "@type": "Organization",
              name: "XIOS Academy",
            },
            offers: {
              "@type": "Offer",
              price: retreat.price || "0",
              priceCurrency: "COP",
              availability: "https://schema.org/InStock",
              validFrom: new Date().toISOString(),
            },
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            category: "Wellness Retreat",
          },
        })
      ),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "XIOS Academy",
          item: `${baseUrl}/xios-academy`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Eventos",
          item: `${baseUrl}/xios-academy/events`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Retiros",
          item: `${baseUrl}/xios-academy/events/retreats`,
        },
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/xios-academy/events/retreats?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  console.log(retreats, "<-- retreats");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      <div>
        <AllRetreats retreat={retreats} />
      </div>
    </>
  );
};

export default RetreatsPage;
