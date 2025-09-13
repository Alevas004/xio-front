import axios from "axios";
import React from "react";
import { Metadata } from "next";
import AllSeminars from "../../../../components/xios-academy/seminars/AllSeminars";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Función para generar metadata dinámica basada en los seminarios
async function generateMetadata(): Promise<Metadata> {
  let seminars = [];
  let seminarsCount = 0;
  let avgPrice = 0;

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/event?type=seminar`);
    seminars = res.data;
    seminarsCount = seminars.length;
    avgPrice =
      seminars.length > 0
        ? Math.round(
            seminars.reduce(
              (acc: number, s: { price?: number }) => acc + (s.price || 0),
              0
            ) / seminars.length
          )
        : 0;
  } catch (error) {
    console.error("Error loading seminars for metadata:", error);
  }

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const currentUrl = `${baseUrl}/xios-academy/events/seminars`;

  return {
    title:
      "Seminarios de Conocimiento Especializado | XIOS Academy - Networking y Expertos",
    description: `Únete a ${seminarsCount} seminarios especializados en XIOS Academy. Conocimiento de expertos, networking profesional y conferencias magistrales para ampliar tu perspectiva profesional.`,

    keywords: [
      "seminarios especializados",
      "conferencias magistrales",
      "networking profesional",
      "conocimiento especializado",
      "expertos industria",
      "desarrollo profesional",
      "XIOS Academy",
      "formación ejecutiva",
      "liderazgo empresarial",
      "conferencias empresariales",
      "capacitación gerencial",
      "eventos corporativos",
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
      title: "Seminarios de Conocimiento Especializado | XIOS Academy",
      description: `Amplía tu perspectiva con ${seminarsCount} seminarios dirigidos por expertos. Networking profesional y conocimiento especializado de primer nivel.`,
      images: [
        {
          url: `${baseUrl}/logo-xiomara-sanchez.webp`,
          width: 1200,
          height: 630,
          alt: "XIOS Academy - Seminarios de Conocimiento Especializado",
          type: "image/webp",
        },
        {
          url: `${baseUrl}/byxio.webp`,
          width: 800,
          height: 600,
          alt: "Seminarios XIOS Academy",
          type: "image/webp",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Seminarios de Conocimiento Especializado | XIOS Academy",
      description: `${seminarsCount} seminarios con expertos reconocidos de la industria`,
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
      "twitter:label1": "Seminarios Disponibles",
      "twitter:data1": seminarsCount.toString(),
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

const SeminarsPage = async () => {
  let seminars = [];

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/event?type=seminar`);
    seminars = res.data;
  } catch (error) {
    console.error("Error loading seminars:", error);
  }

  // Structured Data para SEO PROMAX
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Seminarios de Conocimiento Especializado | XIOS Academy",
    description:
      "Seminarios especializados dirigidos por expertos reconocidos de la industria. Networking profesional y conocimiento de primer nivel.",
    url: `${baseUrl}/xios-academy/events/seminars`,
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
      numberOfItems: seminars.length,
      itemListElement: seminars.slice(0, 5).map(
        (
          seminar: {
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
            name: seminar.name || "Seminario Especializado",
            description:
              seminar.description ||
              "Seminario de conocimiento especializado dirigido por expertos",
            startDate: seminar.startDate || new Date().toISOString(),
            endDate:
              seminar.endDate ||
              new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            location: {
              "@type": "VirtualLocation",
              url: `${baseUrl}/xios-academy/events/seminars/${seminar.id}`,
            },
            organizer: {
              "@type": "Organization",
              name: "XIOS Academy",
            },
            offers: {
              "@type": "Offer",
              price: seminar.price || "0",
              priceCurrency: "COP",
              availability: "https://schema.org/InStock",
              validFrom: new Date().toISOString(),
            },
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
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
          name: "Seminarios",
          item: `${baseUrl}/xios-academy/events/seminars`,
        },
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/xios-academy/events/seminars?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  console.log(seminars, "<-- seminars");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      <div>
        <AllSeminars seminars={seminars} />
      </div>
    </>
  );
};

export default SeminarsPage;
