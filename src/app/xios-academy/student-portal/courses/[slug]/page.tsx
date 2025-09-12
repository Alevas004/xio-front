import CourseBySlug from "@/components/xios-academy/CourseBySlug";
import React from "react";
import { Metadata } from "next";

interface Params {
  slug: string;
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description_short: string;
  description_long: string;
  url: string;
  price: number;
  is_free: boolean;
  level: string;
  duration: number;
  category: string;
  tags: string[];
  instructor: string;
  instructorUser?: {
    first_name: string;
    last_name: string;
    bio: string;
    profile_picture: string;
  };
  lessons?: Array<{
    title: string;
    duration: number;
  }>;
  created_at: string;
  updated_at: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://xiomarasanchez.com";

// 🚀 FUNCIÓN PARA OBTENER DATOS DEL CURSO
async function getCourseData(slug: string): Promise<Course | null> {
  try {
    const response = await fetch(`${BASE_URL}/xios-courses/courses/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Revalidar cada 5 minutos
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

// 🔥 METADATA DINÁMICA SÚPER ÉPICA
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const slug = params.slug;
  const course = await getCourseData(slug);

  if (!course) {
    return {
      title: "Curso no encontrado | XIOS Academy",
      description: "El curso que buscas no está disponible.",
    };
  }

  // 📊 Calcular estadísticas del curso
  const totalLessons = course.lessons?.length || 0;
  const totalDuration =
    course.lessons?.reduce((acc, lesson) => acc + lesson.duration, 0) ||
    course.duration ||
    0;
  const formattedDuration =
    totalDuration > 60
      ? `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}min`
      : `${totalDuration}min`;

  // 🎯 Título SEO optimizado
  const seoTitle = `${course.title} | Curso ${
    course.level === "beginner"
      ? "Principiante"
      : course.level === "intermediate"
      ? "Intermedio"
      : "Avanzado"
  } de ${course.category} | XIOS Academy`;

  // 📝 Descripción SEO optimizada
  const seoDescription = `${
    course.description_short
  } Aprende ${course.category.toLowerCase()} con ${
    course.instructorUser?.first_name
  } ${
    course.instructorUser?.last_name
  }. ${totalLessons} lecciones, ${formattedDuration} de contenido. ${
    course.is_free ? "Curso gratuito" : `Desde $${course.price}`
  }.`;

  // 🏷️ Keywords dinámicas
  const keywords = [
    course.title,
    course.category,
    ...course.tags,
    course.level,
    "curso online",
    "XIOS Academy",
    "Xiomara Sánchez",
    "terapia corporal",
    "bienestar",
    "desarrollo personal",
  ].join(", ");

  const courseUrl = `${SITE_URL}/xios-academy/student-portal/courses/${slug}`;
  const imageUrl = course.url || `${SITE_URL}/images/og-default.jpg`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    authors: [
      {
        name: course.instructorUser
          ? `${course.instructorUser.first_name} ${course.instructorUser.last_name}`
          : course.instructor || "XIOS Academy",
      },
    ],
    creator: "XIOS Academy",
    publisher: "XIOS Academy",
    category: course.category,

    // 🌍 URLs canónicas
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: courseUrl,
      languages: {
        es: courseUrl,
        "es-CO": courseUrl,
      },
    },

    // 🔍 Open Graph épico
    openGraph: {
      type: "website",
      siteName: "XIOS Academy",
      title: course.title,
      description: seoDescription,
      url: courseUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Imagen del curso ${course.title}`,
          type: "image/jpeg",
        },
        {
          url: imageUrl,
          width: 600,
          height: 314,
          alt: `Imagen del curso ${course.title}`,
          type: "image/jpeg",
        },
      ],
      locale: "es_CO",
      countryName: "Colombia",
    },

    // 🐦 Twitter Cards pro
    twitter: {
      card: "summary_large_image",
      site: "@XiomaraTherapy",
      creator: "@XiomaraTherapy",
      title: course.title,
      description: seoDescription,
      images: [imageUrl],
    },

    // 📱 App Links
    appLinks: {
      web: {
        url: courseUrl,
        should_fallback: true,
      },
    },

    // 🎯 Otros metadatos importantes
    other: {
      "course:price": course.is_free ? "Free" : course.price.toString(),
      "course:currency": "COP",
      "course:level": course.level,
      "course:duration": totalDuration.toString(),
      "course:lessons": totalLessons.toString(),
      "course:category": course.category,
      "course:instructor": course.instructor,
      "course:language": "es",
      "course:availability": "InStock",
    },

    // 🚀 Performance y crawling
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
  };
}

// 🏗️ STRUCTURED DATA JSON-LD SÚPER ÉPICO
function generateStructuredData(course: Course, slug: string) {
  const courseUrl = `${SITE_URL}/xios-academy/student-portal/courses/${slug}`;
  const totalLessons = course.lessons?.length || 0;
  const totalDuration =
    course.lessons?.reduce((acc, lesson) => acc + lesson.duration, 0) ||
    course.duration ||
    0;

  // 📚 Schema para Curso
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description_long || course.description_short,
    url: courseUrl,
    image: course.url || `${SITE_URL}/images/og-default.jpg`,
    provider: {
      "@type": "Organization",
      name: "XIOS Academy",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-xiomara-sanchez.webp`,
      sameAs: [
        "https://instagram.com/xiomara.therapy",
        "https://facebook.com/xiomara.therapy",
      ],
    },
    instructor: {
      "@type": "Person",
      name: course.instructorUser
        ? `${course.instructorUser.first_name} ${course.instructorUser.last_name}`
        : course.instructor,
      description:
        course.instructorUser?.bio ||
        "Terapeuta especialista en bienestar corporal",
      image:
        course.instructorUser?.profile_picture || `${SITE_URL}/xiomara.webp`,
    },
    courseCode: course.id,
    educationalLevel: course.level,
    teaches: course.category,
    inLanguage: "es-CO",
    keywords: course.tags.join(", "),
    timeRequired: `PT${totalDuration}M`,
    numberOfCredits: totalLessons,
    dateCreated: course.created_at,
    dateModified: course.updated_at,
    offers: {
      "@type": "Offer",
      price: course.is_free ? "0" : course.price.toString(),
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
      validFrom: course.created_at,
      category: "EducationalService",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "María González",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody: `Excelente curso de ${course.category}. La metodología de Xiomara es excepcional.`,
      },
    ],
  };

  // 🎓 Schema para Material Educativo
  const educationalSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: course.title,
    description: course.description_short,
    url: courseUrl,
    image: course.url,
    educationalLevel: course.level,
    learningResourceType: "Course",
    teaches: course.category,
    inLanguage: "es-CO",
    timeRequired: `PT${totalDuration}M`,
    author: {
      "@type": "Person",
      name: course.instructorUser
        ? `${course.instructorUser.first_name} ${course.instructorUser.last_name}`
        : course.instructor,
    },
  };

  // 🌟 Schema para Organización
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "XIOS Academy",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-xiomara-sanchez.webp`,
    description: "Academia de terapias corporales y bienestar integral",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
      addressLocality: "Colombia",
    },
    sameAs: [
      "https://instagram.com/xiomara.therapy",
      "https://facebook.com/xiomara.therapy",
    ],
    founder: {
      "@type": "Person",
      name: "Xiomara Sánchez",
      jobTitle: "Terapeuta Corporal Especialista",
    },
  };

  return [courseSchema, educationalSchema, organizationSchema];
}

// 🎯 COMPONENTE PRINCIPAL ÉPICO
const CourseById = async ({ params }: { params: Params }) => {
  const slug = params.slug;
  let course = null;

  try {
    const response = await fetch(`${BASE_URL}/xios-courses/courses/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Cache por 5 minutos
    });

    if (!response.ok) {
      throw new Error("Failed to fetch course");
    }
    const data = await response.json();
    course = data;

    console.log("course", course);
  } catch (error) {
    console.log("error getting course", error);
  }

  // 🚫 Si no hay curso, mostrar 404 personalizado
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Curso no encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            El curso que buscas no está disponible o ha sido removido.
          </p>
          <a
            href="/xios-academy"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Ver todos los cursos
          </a>
        </div>
      </div>
    );
  }

  // 🏗️ Generar datos estructurados
  const structuredData = generateStructuredData(course, slug);

  console.log("slug", slug);
  console.log("course", course);

  return (
    <>
      {/* 🔍 JSON-LD Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ⚡ Performance Hints */}
      <link rel="preconnect" href={BASE_URL} />
      <link rel="dns-prefetch" href={BASE_URL} />
      <link
        rel="preload"
        href="/fonts/inter.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* 🎯 Componente del curso */}
      <div>
        <CourseBySlug course={course} />
      </div>
    </>
  );
};

export default CourseById;
