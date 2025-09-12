import axios from "axios";
import React from "react";
import { Metadata } from "next";
import AllCorpoTrainings from "../../../../components/xios-academy/training/AllCorpoTrainings";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Función para generar metadata dinámica basada en capacitaciones corporativas
async function generateMetadata(): Promise<Metadata> {
  let trainings = [];
  let trainingsCount = 0;
  let avgPrice = 0;

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/event?type=training`);
    trainings = res.data;
    trainingsCount = trainings.length;
    avgPrice =
      trainings.length > 0
        ? Math.round(
            trainings.reduce(
              (acc: number, t: { price?: number }) => acc + (t.price || 0),
              0
            ) / trainings.length
          )
        : 0;
  } catch (error) {
    console.error("Error loading trainings for metadata:", error);
  }

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com";
  const currentUrl = `${baseUrl}/xios-academy/events/corporate-training`;

  return {
    title:
      "Capacitaciones Corporativas para SPAS y HOTELES | XIOS Academy - ROI Comprobado",
    description: `Capacita a tu equipo con ${trainingsCount} programas especializados para SPAS y HOTELES. Mejora la excelencia en el servicio, técnicas terapéuticas y satisfacción del cliente con ROI comprobado.`,

    keywords: [
      "capacitaciones corporativas spas",
      "capacitación hoteles wellness",
      "entrenamiento equipo spa",
      "capacitación terapeutas hoteles",
      "formación corporativa bienestar",
      "training spa profesional",
      "XIOS Academy corporativo",
      "capacitación masajes empresarial",
      "formación wellness hoteles",
      "entrenamiento spa resort",
      "capacitación servicio spa",
      "training corporativo wellness",
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
      title: "Capacitaciones Corporativas para SPAS y HOTELES | XIOS Academy",
      description: `Potencia tu equipo con ${trainingsCount} capacitaciones especializadas. Aumenta la satisfacción del cliente y el ROI de tu SPA o HOTEL.`,
      images: [
        {
          url: `${baseUrl}/logo-xiomara-sanchez.webp`,
          width: 1200,
          height: 630,
          alt: "XIOS Academy - Capacitaciones Corporativas para SPAS y HOTELES",
          type: "image/webp",
        },
        {
          url: `${baseUrl}/byxio.webp`,
          width: 800,
          height: 600,
          alt: "Capacitaciones Corporativas XIOS Academy",
          type: "image/webp",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Capacitaciones Corporativas para SPAS y HOTELES | XIOS Academy",
      description: `${trainingsCount} programas corporativos con ROI comprobado para SPAS y HOTELES`,
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
      "twitter:label1": "Capacitaciones Disponibles",
      "twitter:data1": trainingsCount.toString(),
      "twitter:label2": "Precio Promedio",
      "twitter:data2":
        avgPrice > 0 ? `$${avgPrice.toLocaleString()} COP` : "Consultar",
      "article:author": "XIOS Academy",
      "article:section": "Capacitación Corporativa",
      "og:region": "CO",
      "og:country-name": "Colombia",
      "geo.region": "CO",
      "geo.placename": "Colombia",
      "business:contact_data:street_address": "Colombia",
      "business:contact_data:locality": "Bogotá",
      "business:contact_data:country_name": "Colombia",
    },
  };
}

export const metadata = await generateMetadata();

const TrainingsPage = async () => {
  let trainings = [];

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/event?type=training`);
    trainings = res.data;
  } catch (error) {
    console.error("Error loading trainings:", error);
  }

  // Structured Data para SEO PROMAX B2B
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Capacitaciones Corporativas para SPAS y HOTELES | XIOS Academy",
    description:
      "Capacitaciones corporativas especializadas para equipos de SPAS y HOTELES. Programas diseñados para mejorar la excelencia en el servicio y técnicas terapéuticas.",
    url: `${baseUrl}/xios-academy/events/corporate-training`,
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
        contactType: "sales",
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
      numberOfItems: trainings.length,
      itemListElement: trainings.slice(0, 5).map(
        (
          training: {
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
            "@type": "EducationEvent",
            name: training.name || "Capacitación Corporativa SPA/HOTEL",
            description:
              training.description ||
              "Capacitación especializada para equipos de SPAS y HOTELES enfocada en la excelencia del servicio",
            startDate: training.startDate || new Date().toISOString(),
            endDate:
              training.endDate ||
              new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            location: {
              "@type": "VirtualLocation",
              url: `${baseUrl}/xios-academy/events/corporate-training/${training.id}`,
            },
            organizer: {
              "@type": "Organization",
              name: "XIOS Academy",
            },
            offers: {
              "@type": "Offer",
              price: training.price || "0",
              priceCurrency: "COP",
              availability: "https://schema.org/InStock",
              validFrom: new Date().toISOString(),
            },
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
            audience: {
              "@type": "BusinessAudience",
              audienceType: "SPAS y HOTELES",
            },
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
          name: "Capacitaciones Corporativas",
          item: `${baseUrl}/xios-academy/events/corporate-training`,
        },
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/xios-academy/events/corporate-training?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  console.log(trainings, "<-- trainings");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      <div>
        <AllCorpoTrainings training={trainings} />
      </div>
    </>
  );
};

export default TrainingsPage;
