import React from "react";
import XiosAcademyClient, {
  Course,
} from "../../components/xios-academy/XiosAcademyClient";
import { shuffle } from "@/utils/suffle";
import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Función para generar metadata dinámica ULTIMATE para la HOME
async function generateMetadata(): Promise<Metadata> {
  let courses: Course[] = [];
  let coursesCount = 0;
  let avgPrice = 0;

  try {
    const res = await fetch(`${BASE_URL}/xios-courses/courses`);
    if (res.ok) {
      courses = await res.json();
    }
    coursesCount = courses.length;
    avgPrice =
      courses.length > 0
        ? Math.round(
            courses.reduce(
              (acc: number, c: Course) => acc + (c.price || 0),
              0
            ) / courses.length
          )
        : 0;
  } catch (error) {
    console.error("Error loading courses for metadata:", error);
  }

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://xios.com";
  const currentUrl = `${baseUrl}/xios-academy`;

  return {
    title:
      "XIOS Academy | Academia Líder en Bienestar, Terapias y Desarrollo Personal - Cursos Certificados",
    description: `🌟 Academia #1 en Colombia con ${coursesCount}+ cursos certificados de bienestar, masajes terapéuticos, mindfulness y desarrollo personal. Instructores expertos, contenido premium y certificaciones reconocidas. Transforma tu vida y carrera profesional.`,

    keywords: [
      "academia bienestar colombia",
      "cursos masajes terapeuticos certificados",
      "xios academy oficial",
      "formacion bienestar profesional",
      "cursos mindfulness certificados",
      "academia terapias alternativas",
      "certificacion masajista profesional",
      "escuela bienestar integral",
      "cursos desarrollo personal online",
      "formacion terapeutas colombia",
      "academia wellness certificada",
      "cursos aromaterapia certificados",
      "escuela yoga colombia",
      "formacion instructores bienestar",
      "certificaciones terapias holisticas",
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

    verification: {
      google: "your-google-verification-code",
    },

    openGraph: {
      type: "website",
      locale: "es_ES",
      url: currentUrl,
      siteName: "XIOS Academy",
      title:
        "XIOS Academy | Academia #1 en Bienestar y Terapias - Cursos Certificados",
      description: `🎓 Más de ${coursesCount} cursos certificados | 🌟 Instructores expertos | 📜 Certificaciones reconocidas | 🚀 Transforma tu carrera en bienestar`,
      images: [
        {
          url: `${baseUrl}/logo-xiomara-sanchez.webp`,
          width: 1200,
          height: 630,
          alt: "XIOS Academy - Academia Líder en Bienestar y Terapias",
          type: "image/webp",
        },
        {
          url: `${baseUrl}/byxio.webp`,
          width: 800,
          height: 600,
          alt: "Cursos XIOS Academy",
          type: "image/webp",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "XIOS Academy | Academia #1 en Bienestar - Cursos Certificados",
      description: `${coursesCount}+ cursos certificados de bienestar, masajes y terapias`,
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
      "theme-color": "#10B981",
      "color-scheme": "light",
      "twitter:label1": "Cursos Disponibles",
      "twitter:data1": coursesCount.toString(),
      "twitter:label2": "Precio Promedio",
      "twitter:data2":
        avgPrice > 0 ? `$${avgPrice.toLocaleString()} COP` : "Desde $99.000",
      "article:author": "XIOS Academy",
      "article:section": "Educación",
      "og:region": "CO",
      "og:country-name": "Colombia",
      "geo.region": "CO",
      "geo.placename": "Colombia",
      "business:contact_data:street_address": "Colombia",
      "business:contact_data:locality": "Bogotá",
      "business:contact_data:country_name": "Colombia",
      "og:email": "info@xiosacademy.com",
      "og:phone_number": "+57-1-234-5678",
      "og:fax_number": "+57-1-234-5679",
    },
  };
}

export const metadata = await generateMetadata();

const XiosAcademyPage = async () => {
  let courses: Course[] = [];

  try {
    const res = await fetch(`${BASE_URL}/xios-courses/courses`);
    if (res.ok) {
      courses = await res.json();
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
  }

  console.log("courses", courses);
  courses = shuffle(courses).slice(0, 3);

  // Structured Data ULTIMATE para la HOME
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: "XIOS Academy",
    legalName: "XIOS Academy - Academia de Bienestar y Terapias",
    description:
      "Academia líder en Colombia especializada en formación profesional de bienestar, terapias alternativas, masajes terapéuticos y desarrollo personal con certificaciones reconocidas.",
    url: `${baseUrl}/xios-academy`,
    sameAs: [
      "https://www.facebook.com/xiosacademy",
      "https://www.instagram.com/xiosacademy",
      "https://www.linkedin.com/company/xiosacademy",
      "https://www.youtube.com/xiosacademy",
    ],
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo-xiomara-sanchez.webp`,
      width: "300",
      height: "100",
    },
    image: [
      {
        "@type": "ImageObject",
        url: `${baseUrl}/logo-xiomara-sanchez.webp`,
        width: "1200",
        height: "630",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+57-1-234-5678",
        contactType: "customer service",
        availableLanguage: ["Spanish", "English"],
        areaServed: "CO",
      },
      {
        "@type": "ContactPoint",
        telephone: "+57-1-234-5679",
        contactType: "sales",
        availableLanguage: "Spanish",
        areaServed: "CO",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
      addressRegion: "Bogotá",
      addressLocality: "Bogotá",
    },
    foundingDate: "2020",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "25-50",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "COP",
      lowPrice: "99000",
      highPrice: "2500000",
      availability: "https://schema.org/InStock",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cursos y Programas de Bienestar",
      itemListElement: [
        {
          "@type": "Course",
          name: "Formación Masajista Profesional",
          description:
            "Curso completo de masajes terapéuticos con certificación",
          provider: {
            "@type": "Organization",
            name: "XIOS Academy",
          },
        },
        {
          "@type": "Course",
          name: "Instructor de Mindfulness Certificado",
          description: "Formación profesional en mindfulness y meditación",
          provider: {
            "@type": "Organization",
            name: "XIOS Academy",
          },
        },
        {
          "@type": "Course",
          name: "Especialización en Aromaterapia",
          description: "Curso avanzado de aceites esenciales y aromaterapia",
          provider: {
            "@type": "Organization",
            name: "XIOS Academy",
          },
        },
      ],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/xios-academy`,
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: `${baseUrl}/xios-academy/courses?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "SubscribeAction",
        target: `${baseUrl}/xios-academy/newsletter`,
        object: {
          "@type": "Newsletter",
          name: "XIOS Academy Newsletter",
        },
      },
    ],
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Retiro de Fin de Semana: Conexión Interior",
      date: "15-17 Sep 2024",
      location: "Villa de Leyva, Colombia",
      price: 450000,
      spots: 8,
      totalSpots: 20,
      type: "Presencial",
    },
    {
      id: 2,
      title: "Masterclass: Gestión del Estrés Laboral",
      date: "22 Sep 2024",
      location: "Online",
      price: 89000,
      spots: 45,
      totalSpots: 100,
      type: "Virtual",
    },
    {
      id: 3,
      title: "Taller de Aromaterapia y Aceites Esenciales",
      date: "29 Sep 2024",
      location: "Bogotá, Colombia",
      price: 150000,
      spots: 12,
      totalSpots: 25,
      type: "Presencial",
    },
  ];

  const stats = [
    {
      number: "10,000+",
      label: "Estudiantes activos",
      icon: "FiUsers",
    },
    {
      number: "50+",
      label: "Cursos disponibles",
      icon: "FiBook",
    },
    {
      number: "95%",
      label: "Satisfacción",
      icon: "FiStar",
    },
    {
      number: "24/7",
      label: "Acceso a contenido",
      icon: "FiClock",
    },
  ];

  const learningPaths = [
    {
      title: "Masajista Integral",
      description:
        "Conviértete en un experto en técnicas de masaje y bienestar.",
      courses: 10,
      duration: "6 meses",
      icon: "FiAward",
      color: "bg-gradient-2",
    },
    {
      title: "Bienestar Personal",
      description: "Transforma tu vida con prácticas de autocuidado",
      courses: 5,
      duration: "3 meses",
      icon: "FiHeart",
      color: "bg-gradient-2",
    },
    {
      title: "Emprendedor Wellness",
      description: "Crea tu propio negocio en el sector bienestar",
      courses: 6,
      duration: "4 meses",
      icon: "FiTrendingUp",
      color: "bg-gradient-2",
    },
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Estudiante Certificada",
      text: "Xios Academy cambió mi perspectiva sobre el bienestar. Los cursos son increíblemente profundos y prácticos.",
      rating: 5,
      course: "Fundamentos de Meditación",
    },
    {
      name: "Carlos Mendoza",
      role: "Instructor Graduado",
      text: "La formación de instructores me dio las herramientas para convertir mi pasión en mi profesión.",
      rating: 5,
      course: "Certificación en Yoga",
    },
    {
      name: "Ana Rodríguez",
      role: "Emprendedora Wellness",
      text: "Gracias a los cursos de emprendimiento, logré abrir mi propio centro de bienestar.",
      rating: 5,
      course: "Emprendedor Wellness",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
      <XiosAcademyClient
        courses={courses}
        upcomingEvents={upcomingEvents}
        stats={stats}
        learningPaths={learningPaths}
        testimonials={testimonials}
      />
    </>
  );
};

export default XiosAcademyPage;
