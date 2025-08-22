import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import XiosAcademyClient, { Course } from "./components/XiosAcademyClient";
import { shuffle } from "@/utils/suffle";

// Metadatos para SEO
export const metadata = {
  title: "Xios Academy - Cursos de Bienestar y Desarrollo Personal",
  description:
    "Descubre cursos y eventos que te ayudarán a desarrollar habilidades en bienestar, mindfulness, yoga, nutrición consciente y mucho más. Aprende de expertos reconocidos internacionalmente.",
  keywords:
    "cursos bienestar, mindfulness, yoga, nutrición consciente, desarrollo personal, xios academy",
  openGraph: {
    title: "Xios Academy - Transforma tu vida a través del aprendizaje",
    description:
      "Programas estructurados que te guían paso a paso hacia tus objetivos profesionales y personales en el mundo del bienestar.",
    type: "website",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const XiosAcademyPage = async () => {
  // Obtener el token de las cookies del servidor
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;

  let courses: Course[] = [];

  try {
  
    const response = await axios.get(`${BASE_URL}/xios-courses/courses`);
    courses = response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }

  console.log("courses", courses);
  courses = shuffle(courses).slice(0, 3);

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
    <XiosAcademyClient
      courses={courses}
      upcomingEvents={upcomingEvents}
      stats={stats}
      learningPaths={learningPaths}
      testimonials={testimonials}
    />
  );
};

export default XiosAcademyPage;
