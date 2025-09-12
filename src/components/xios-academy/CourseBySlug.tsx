"use client";

import React, { useState, useEffect } from "react";
import { Academy } from "../admin/academies/AcademyManager";
import { Lesson } from "../admin/lesson/ModalUpdateLesson";
import { useGet } from "@/hooks/useGet";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PlayEnrolledCourse from "./coursesPlay/PlayEnrolledCourse";
import UserNoEnrolled from "./coursesPlay/UserNoEnrolled";

// 🎯 Interfaz actualizada basada en la API
export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description_short: string;
  description_long: string;
  url: string;
  images: string[];
  category: string;
  tags: string[];
  price: number;
  is_free: boolean;
  level: "beginner" | "intermediate" | "advanced";
  duration: number;
  certificate: boolean;
  instructor: string;
  includes: string[];
  is_active: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  academyId: string;
  belongsToAWorkshop: boolean;
  academy: Academy | null;
  lessons: Lesson[];
  instructorUser?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    profile_picture: string;
    bio: string;
    years_experience: string;
    certifications: string[];
    specialties: string[];
    clients_count: number;
    createdAt: string;
    updatedAt: string;
  };
}

// Interfaz para los datos de mis cursos
interface MyCoursesResponse {
  orderacademies: Array<{
    course?: {
      id: string;
    };
    academy?: {
      id: string;
      courses: Array<{
        id: string;
      }>;
    };
  }>;
}

const CourseBySlug = ({ course }: { course: Course }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  //* VALIDAR SI ESTÁ AUTENTICADO PARA HACER LA PETICION DE LOS CURSOS DEL USUARIO
  const isAuthenticated = useSelector(
    (store: RootState) => store.auth.isAuthenticated
  );

  // Asegurar que solo renderizamos contenido autenticado en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  //* PETICION MY COURSES - Manejo de errores incluido
  const { data: myCourses, error: myCoursesError } = useGet<MyCoursesResponse>(
    "/xio/users/mycourses",
    { withAuth: true }
  );

  console.log("Mis cursos:", myCourses);
  console.log("Error de cursos:", myCoursesError);

  // 🎯 Obtener el curso (debería ser un objeto, no array)
  const courseData = course;

  // 🔄 Verificar si el usuario está matriculado en el curso
  useEffect(() => {
    // Reset enrollment status
    setIsEnrolled(false);

    // Solo verificar si está autenticado
    if (!isAuthenticated) {
      console.log("Usuario no autenticado, no verificando enrollment");
      return;
    }

    // Si hay error (como 404), significa que no tiene cursos
    if (myCoursesError) {
      console.log(
        "Error al obtener cursos (probablemente 404):",
        myCoursesError
      );
      console.log("Usuario autenticado pero sin cursos matriculados");
      setIsEnrolled(false);
      return;
    }

    // Si no hay datos aún, esperar
    if (!myCourses) {
      console.log("Esperando datos de cursos...");
      return;
    }

    // Verificar estructura de datos
    if (
      typeof myCourses === "object" &&
      "orderacademies" in myCourses &&
      Array.isArray(myCourses.orderacademies)
    ) {
      console.log("Verificando enrollment para curso:", courseData.id);
      console.log("Órdenes del usuario:", myCourses.orderacademies);

      // Verificar si está matriculado directamente en el curso
      const isDirectlyEnrolled = myCourses.orderacademies.some(
        (order) => order.course && order.course.id === courseData.id
      );

      // Verificar si está matriculado en un workshop que incluye este curso
      const isEnrolledViaWorkshop = myCourses.orderacademies.some((order) => {
        if (order.academy && order.academy.courses) {
          return order.academy.courses.some(
            (course: { id: string }) => course.id === courseData.id
          );
        }
        return false;
      });

      const isUserEnrolled = isDirectlyEnrolled || isEnrolledViaWorkshop;
      console.log("Directamente matriculado:", isDirectlyEnrolled);
      console.log("Matriculado via workshop:", isEnrolledViaWorkshop);
      console.log("Resultado final:", isUserEnrolled);

      setIsEnrolled(isUserEnrolled);
    } else {
      console.log("Estructura de datos inesperada:", myCourses);
      setIsEnrolled(false);
    }
  }, [isAuthenticated, myCourses, myCoursesError, courseData.id]);

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Curso no encontrado
          </h1>
          <p className="text-gray-600">
            No pudimos cargar la información del curso.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-piel-blanco via-white to-piel-claro">
      {/* Renderizado condicional que respeta SSR */}
      {isClient ? (
        <>
          {isEnrolled ? (
            <PlayEnrolledCourse courseData={courseData} />
          ) : (
            <UserNoEnrolled
              courseData={courseData}
              isEnrolled={isEnrolled}
              setIsEnrolled={setIsEnrolled}
            />
          )}

          {!isAuthenticated && (
            <UserNoEnrolled
              courseData={courseData}
              isEnrolled={isEnrolled}
              setIsEnrolled={setIsEnrolled}
            />
          )}
        </>
      ) : (
        /* Fallback para SSR */
        <div className="bg-black/20">
          <div className="flex items-center justify-center h-full">
            <p className="text-white">Buscando curso...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseBySlug;
