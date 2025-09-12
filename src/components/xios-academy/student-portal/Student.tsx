"use client";

import { User } from "@/app/xios-academy/student-portal/page";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiUser,
  FiBookOpen,
  FiAward,
  FiClock,
  FiPlay,
  FiTrendingUp,
  FiCalendar,
  FiTarget,
  FiSearch,
  FiGrid,
  FiList,
  FiCheck,
  FiChevronRight,
  FiHeart,
  FiShare2,
  FiBarChart,
  FiZap,
  FiX,
} from "react-icons/fi";

interface StudentProps {
  paid: User[] | User | null;
}

const Student = ({ paid = null }: StudentProps) => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "courses" | "academies" | "profile"
  >("dashboard");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");

  // 🎯 Extraer datos del usuario - manejo robusto para objeto o array
  const userData: User | undefined = Array.isArray(paid)
    ? paid[0]
    : paid || undefined;

  const orderAcademies = userData?.orderacademies || [];
  const courses = orderAcademies
    .filter((order) => order.course)
    .map((order) => order.course!);
  const academies = orderAcademies
    .filter((order) => order.academy)
    .map((order) => order.academy!);

  // 🐛 Debug logs para verificar datos
  console.log("📊 Student Portal Debug:");
  console.log("paid prop (type):", typeof paid, paid);
  console.log("paid is array:", Array.isArray(paid));
  console.log("userData:", userData);
  console.log("orderAcademies:", orderAcademies);
  console.log("courses:", courses);
  console.log("academies:", academies);

  // 📊 Estadísticas calculadas
  const totalCourses = courses.length;
  const totalAcademies = academies.length;
  const completedCourses = Math.floor(totalCourses * 0.6); // Mock completion
  const totalHours = courses.reduce((acc, course) => acc + course.duration, 0);
  const certificatesEarned = courses.filter(
    (course) => course.certificate
  ).length;

  // 🎨 Animación de entrada para stats
  const [animatedStats, setAnimatedStats] = useState({
    courses: 0,
    academies: 0,
    completed: 0,
    hours: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        courses: totalCourses,
        academies: totalAcademies,
        completed: completedCourses,
        hours: totalHours,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [totalCourses, totalAcademies, completedCourses, totalHours]);

  // 🔍 Filtrar cursos
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const prerequisiteCourses = academies
    .map((academy) => academy.courses)
    .flat();

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case "beginner":
        return "Principiante";
      case "intermediate":
        return "Intermedio";
      case "advanced":
        return "Avanzado";
      default:
        return level;
    }
  };

  // 🚧 FUNCIONALIDAD DE PROGRESO COMENTADA TEMPORALMENTE
  // TODO: Implementar cuando esté listo el backend
  /*
  const getProgressPercentage = () => {
    // Mock progress - en producción vendría de la API
    return Math.floor(Math.random() * 100);
  };
  */

  return (
    <div className="min-h-screen">
      {/* 🌟 HEADER ÉPICO CON PERFIL */}
      <div className="bg-gradient-to-r from-verde-oscuro via-piel-oscuro to-verde-claro text-white relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute top-1/2 -left-8 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Perfil del estudiante */}
            <div className="flex items-center gap-6">
              <div className="relative">
                {userData?.profile_picture ? (
                  <Image
                    src={userData.profile_picture}
                    alt={`${userData.first_name} ${userData.last_name}`}
                    width={150}
                    height={150}
                    className="w-20 h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-full"
                  />
                ) : (
                  <h2 className="w-20 h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl lg:text-4xl font-bold">
                    {userData?.first_name?.charAt(0) || "E"}
                  </h2>
                )}

                {userData?.isActive ? (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                    <FiX className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-1 text-white">
                  ¡Hola, {userData?.first_name || "Estudiante"}! 👋
                </h1>
                <p className="text-piel-blanco text-lg">
                  Continúa tu viaje de aprendizaje
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FiAward className="w-4 h-4" />
                    {userData?.isActive ? (
                      <span>Estudiante Activo</span>
                    ) : (
                      <span>Estudiante Inactivo</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiZap className="w-4 h-4 text-yellow-300" />
                    <span>Nivel: Explorador</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="flex items-center gap-3">
              {/* <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200">
                <FiBell className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200">
                <FiSettings className="w-5 h-5" />
              </button> */}
              <Link
                href="/xios-academy/events/workshops"
                className="px-4 py-2 bg-white text-verde-oscuro rounded-full font-semibold hover:bg-piel-blanco transition-all duration-200"
              >
                Explorar Más Cursos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 STATS ÉPICAS CON ANIMACIÓN */}
      <div className="container mx-auto px-6 -mt-6 relative z-10 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: FiBookOpen,
              label: "Cursos",
              value: animatedStats.courses,
              total: totalCourses,
              color: "from-blue-500 to-blue-600",
              bgColor: "bg-blue-50",
              textColor: "text-blue-600",
            },
            {
              icon: FiCalendar,
              label: "Talleres",
              value: animatedStats.academies,
              total: totalAcademies,
              color: "from-purple-500 to-purple-600",
              bgColor: "bg-purple-50",
              textColor: "text-purple-600",
            },
            {
              icon: FiTarget,
              label: "Completados",
              value: animatedStats.completed,
              total: completedCourses,
              color: "from-green-500 to-green-600",
              bgColor: "bg-green-50",
              textColor: "text-green-600",
            },
            {
              icon: FiClock,
              label: "Horas",
              value: animatedStats.hours,
              total: totalHours,
              color: "from-orange-500 to-orange-600",
              bgColor: "bg-orange-50",
              textColor: "text-orange-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className="text-right">
                  <div
                    className={`text-3xl font-bold ${stat.textColor} transition-all duration-1000`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-1000`}
                  style={{
                    width: `${Math.min(
                      (stat.value / Math.max(stat.total, 1)) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🎯 NAVEGACIÓN DE TABS ÉPICA */}
      <div className="container mx-auto px-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <nav className="flex">
            {[
              { id: "dashboard", label: "Dashboard", icon: FiBarChart },
              {
                id: "courses",
                label: "Mis Cursos",
                icon: FiBookOpen,
                count: totalCourses,
              },
              {
                id: "academies",
                label: "Talleres",
                icon: FiCalendar,
                count: totalAcademies,
              },
              { id: "profile", label: "Perfil", icon: FiUser },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as "dashboard" | "courses" | "academies" | "profile"
                  )
                }
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 font-medium transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? "text-verde-oscuro bg-green-100 border-b-2 border-verde-oscuro"
                    : "text-gray-600 hover:text-verde-oscuro hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.count && tab.count > 0 && (
                  <span className="bg-verde-oscuro text-white text-xs px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 📱 CONTENIDO PRINCIPAL */}
      <div className="container mx-auto px-6 pb-12">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Progreso general */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiTrendingUp className="w-5 h-5 text-verde-oscuro" />
                Tu Progreso de Aprendizaje
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cursos Completados</span>
                    <span className="font-semibold">
                      {completedCourses}/{totalCourses} comprados
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000"
                      style={{
                        width: `${
                          totalCourses > 0
                            ? (completedCourses / totalCourses) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600">Horas de Estudio</span>
                    <span className="font-semibold">{totalHours}h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
                      style={{
                        width: `${Math.min((totalHours / 100) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-verde-oscuro to-piel-oscuro rounded-xl p-6 text-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      {certificatesEarned}
                    </div>
                    <div className="text-piel-blanco/90 mb-4">
                      Certificados Obtenidos
                    </div>
                    <FiAward className="w-12 h-12 mx-auto text-yellow-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Cursos recientes */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiClock className="w-5 h-5 text-verde-oscuro" />
                  Continúa Aprendiendo
                </h3>
                <Link
                  href="#"
                  className="text-verde-oscuro hover:text-verde-claro font-medium flex items-center gap-1"
                >
                  Ver todos <FiChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {courses.slice(0, 2).map((course) => {
                  // 🚧 PROGRESO COMENTADO TEMPORALMENTE
                  // const progress = getProgressPercentage();
                  return (
                    <Link
                      href={`/xios-academy/student-portal/courses/${course.slug}`}
                      key={course.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={course.url}
                            alt={course.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                            <FiPlay className="w-6 h-6 text-white" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate mb-1">
                            {course.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {course.instructor}
                          </p>
                          {/* 🚧 BARRA DE PROGRESO COMENTADA TEMPORALMENTE
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Progreso</span>
                              <span className="font-medium">{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-verde-oscuro to-verde-claro h-2 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                          */}

                          {/* ✨ BOTÓN BONITO DE CONTINUAR */}
                          <div className="mt-2">
                            <div className="flex items-center gap-2 text-verde-oscuro font-medium text-sm">
                              <FiPlay className="w-4 h-4" />
                              <span>Continuar viendo</span>
                              <FiChevronRight className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-6">
            {/* Controles de filtro */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Buscar cursos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-verde-oscuro focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={filterLevel}
                    onChange={(e) =>
                      setFilterLevel(
                        e.target.value as
                          | "all"
                          | "beginner"
                          | "intermediate"
                          | "advanced"
                      )
                    }
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-verde-oscuro focus:border-transparent"
                  >
                    <option value="all">Todos los niveles</option>
                    <option value="beginner">Principiante</option>
                    <option value="intermediate">Intermedio</option>
                    <option value="advanced">Avanzado</option>
                  </select>

                  <div className="flex items-center bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        viewMode === "grid"
                          ? "bg-white text-verde-oscuro shadow-sm"
                          : "text-gray-500"
                      }`}
                    >
                      <FiGrid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        viewMode === "list"
                          ? "bg-white text-verde-oscuro shadow-sm"
                          : "text-gray-500"
                      }`}
                    >
                      <FiList className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de cursos */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredCourses.map((course) => {
                // 🚧 PROGRESO COMENTADO TEMPORALMENTE
                // const progress = getProgressPercentage();
                // const isCompleted = progress === 100;

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Imagen del curso */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={course.url}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Status badge */}
                      <div className="absolute top-4 left-4">
                        {/* 🚧 ESTADO COMPLETADO COMENTADO TEMPORALMENTE
                        {isCompleted ? (
                          <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                            <FiCheck className="w-4 h-4" />
                            Completado
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                            En Progreso
                          </span>
                        )}
                        */}
                        <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                          Disponible
                        </span>
                      </div>

                      {/* Nivel */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
                            course.level
                          )}`}
                        >
                          {getLevelText(course.level)}
                        </span>
                      </div>

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Link
                          href={`/xios-academy/student-portal/courses/${course.slug}`}
                          className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        >
                          <FiPlay className="w-6 h-6 text-verde-oscuro ml-1" />
                        </Link>
                      </div>

                      {/* Duración */}
                      <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 text-white text-sm rounded-md">
                        {course.duration}h
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 mb-3 line-clamp-1">
                        {course.subtitle}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        <FiUser className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {course.instructor}
                        </span>
                      </div>

                      {/* 🚧 PROGRESO COMENTADO TEMPORALMENTE
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Progreso</span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-verde-oscuro to-verde-claro h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      */}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Acciones */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/xios-academy/student-portal/courses/${course.slug}`}
                          className="flex items-center gap-2 px-4 py-2 bg-verde-oscuro text-white rounded-lg hover:bg-verde-claro transition-colors font-medium"
                        >
                          <FiPlay className="w-4 h-4" />
                          Ver Curso
                        </Link>

                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <FiHeart className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                            <FiShare2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No se encontraron cursos
                </h3>
                <p className="text-gray-600 mb-6">
                  {courses.length === 0
                    ? "Aún no tienes cursos inscritos. ¡Inscríbete en tu primer curso!"
                    : `Tienes ${courses.length} curso(s) inscrito(s), pero ninguno coincide con los filtros actuales.`}
                </p>

                {/* Debug info para desarrollo */}
                <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg mb-4 inline-block">
                  <strong>Debug:</strong> {courses.length} cursos totales,{" "}
                  {filteredCourses.length} filtrados
                  {searchTerm && ` | Búsqueda: "${searchTerm}"`}
                  {filterLevel !== "all" && ` | Nivel: ${filterLevel}`}
                </div>

                <Link
                  href="/xios-academy"
                  className="px-6 py-3 bg-verde-oscuro text-white rounded-xl hover:bg-verde-claro transition-colors font-medium"
                >
                  {courses.length === 0
                    ? "Explorar Cursos"
                    : "Ver Todos los Cursos"}
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "academies" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FiCalendar className="w-5 h-5 text-verde-oscuro" />
                Mis Talleres y Workshops
              </h3>

              {prerequisiteCourses.length > 0 ? (
                <div className="space-y-8">
                  {academies.map((academy) => {
                    const isUpcoming =
                      new Date(academy.start_date) > new Date();
                    const daysUntil = Math.ceil(
                      (new Date(academy.start_date).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (
                      <div
                        key={academy.id}
                        className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                      >
                        {/* Header del taller */}
                        <div className="bg-purple-200 p-4 sm:p-6 text-black">
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg sm:text-2xl font-bold flex-shrink-0 text-black">
                                {academy.title.charAt(0)}
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4 className="text-xl md:text-2xl font-bold mb-2 leading-tight text-black text-start">
                                  {academy.title}
                                </h4>
                                <p className="text-purple-100 mb-3 text-sm sm:text-base leading-relaxed text-start">
                                  {academy.subtitle}
                                </p>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                  <div className="flex items-center gap-2">
                                    <FiUser className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">
                                      {academy.speaker}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <FiTarget className="w-4 h-4 flex-shrink-0" />
                                    <span>{academy.level}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Status badge */}
                            <div className="self-start">
                              <span
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap ${
                                  isUpcoming
                                    ? "bg-blue-500 text-white"
                                    : "bg-green-500 text-white"
                                }`}
                              >
                                {isUpcoming
                                  ? `Faltan ${daysUntil} días`
                                  : "Completado"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Contenido del taller */}
                        <div className="p-4 sm:p-6">
                          {/* Información del evento */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-3">
                              <h5 className="font-semibold text-gray-900 mb-3">
                                📅 Detalles del Evento
                              </h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <FiCalendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                  <span className="leading-relaxed">
                                    {new Date(
                                      academy.start_date
                                    ).toLocaleDateString("es-ES", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <FiClock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                  <span className="leading-relaxed">
                                    {academy.start_time} - {academy.end_time} (
                                    {academy.duration}h)
                                  </span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <FiUser className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                  <span className="leading-relaxed">
                                    {academy.enrolled}/{academy.capacity}{" "}
                                    inscritos
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h5 className="font-semibold text-gray-900 mb-3">
                                🎯 Lo que incluye
                              </h5>
                              <div className="space-y-1">
                                {academy.includes
                                  ?.slice(0, 3)
                                  .map((include, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-2 text-sm"
                                    >
                                      <FiCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="leading-relaxed">
                                        {include}
                                      </span>
                                    </div>
                                  ))}
                                {academy.certificate && (
                                  <div className="flex items-start gap-2 text-sm">
                                    <FiAward className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                    <span className="leading-relaxed">
                                      Certificado de participación
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Cursos prerequisitos */}
                          {prerequisiteCourses.length > 0 && (
                            <div className="border-t border-gray-200 pt-6">
                              <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FiBookOpen className="w-5 h-5 text-verde-oscuro" />
                                Cursos Prerequisitos (
                                {prerequisiteCourses.length})
                                <span className="text-sm font-normal text-gray-600">
                                  - Completa estos cursos antes del taller
                                </span>
                              </h5>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {prerequisiteCourses.map((course) => {
                                  // 🚧 PROGRESO COMENTADO TEMPORALMENTE
                                  // const progress = getProgressPercentage();
                                  // const isCompleted = progress === 100;

                                  return (
                                    <div
                                      key={course.id}
                                      className={`border rounded-xl p-3 transition-all duration-200 border-blue-200 bg-blue-50`}
                                    >
                                      <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative w-full h-32 sm:w-12 sm:h-12 flex-shrink-0">
                                          <Image
                                            src={course.url}
                                            alt={course.title}
                                            fill
                                            className="object-cover rounded-lg"
                                          />
                                          {/* 🚧 CHECKMARK COMENTADO TEMPORALMENTE
                                          {isCompleted && (
                                            <div className="absolute top-2 right-2 sm:-top-1 sm:-right-1 w-6 h-6 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
                                              <FiCheck className="w-4 h-4 sm:w-3 sm:h-3 text-white" />
                                            </div>
                                          )}
                                          */}
                                        </div>

                                        <div className="flex-1 min-w-0 space-y-2">
                                          <div>
                                            <h6 className="font-medium text-gray-900 text-sm leading-tight">
                                              {course.title}
                                            </h6>
                                            <p className="text-xs text-gray-600 mt-1">
                                              {course.instructor} •{" "}
                                              {course.duration}h
                                            </p>
                                          </div>

                                          {/* 🚧 BARRA DE PROGRESO COMENTADA TEMPORALMENTE
                                          <div className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                              <span className="text-gray-500">
                                                Progreso
                                              </span>
                                              <span
                                                className={`font-medium ${
                                                  isCompleted
                                                    ? "text-green-600"
                                                    : "text-orange-600"
                                                }`}
                                              >
                                                {progress}%
                                              </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                              <div
                                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                                  isCompleted
                                                    ? "bg-green-500"
                                                    : "bg-orange-500"
                                                }`}
                                                style={{
                                                  width: `${progress}%`,
                                                }}
                                              />
                                            </div>
                                          </div>
                                          */}

                                          {/* Action button */}
                                          <div className="flex justify-start">
                                            <Link
                                              href={`/xios-academy/student-portal/courses/${course.slug}`}
                                              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md transition-colors text-blue-700 bg-blue-100 hover:bg-blue-200"
                                            >
                                              <FiPlay className="w-3 h-3" />
                                              Ver Curso
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* 🚧 PROGRESO DE PRERREQUISITOS COMENTADO TEMPORALMENTE */}
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center justify-between text-sm mb-2">
                                  <span className="text-gray-600">
                                    Cursos prerequisitos:
                                  </span>
                                  <span className="font-medium">
                                    {prerequisiteCourses.length} cursos
                                    disponibles
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                                  <FiPlay className="w-4 h-4" />
                                  ¡Cursos listos para empezar!
                                </div>

                                {/* 🚧 COMENTADO TEMPORALMENTE
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                  <div
                                    className="bg-gradient-to-r from-verde-oscuro to-verde-claro h-2 rounded-full transition-all duration-500"
                                    style={{
                                      width: `${
                                        (prerequisiteCourses.filter(
                                          () => getProgressPercentage() === 100
                                        ).length /
                                          prerequisiteCourses.length) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>

                                {prerequisiteCourses.every(
                                  () => getProgressPercentage() === 100
                                ) ? (
                                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                    <FiCheck className="w-4 h-4" />
                                    ¡Listo para el taller! Todos los
                                    prerequisitos completados
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
                                    <FiClock className="w-4 h-4" />
                                    Completa los cursos restantes antes del{" "}
                                    {new Date(
                                      academy.start_date
                                    ).toLocaleDateString()}
                                  </div>
                                )}
                                */}
                              </div>
                            </div>
                          )}

                          {/* No hay prerequisitos */}
                          {prerequisiteCourses.length === 0 && (
                            <div className="border-t border-gray-200 pt-6">
                              <div className="text-center py-4">
                                <FiCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">
                                  ✅ No hay cursos prerequisitos para este
                                  taller
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Action button */}
                          <div className="border-t border-gray-200 pt-4 sm:pt-6 mt-4 sm:mt-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="text-sm text-gray-600 leading-relaxed">
                                {isUpcoming ? (
                                  <>
                                    ¿Listo para el taller? Revisa que hayas
                                    completado todos los prerequisitos.
                                  </>
                                ) : (
                                  <>
                                    Taller completado. ¡Revisa tu certificado y
                                    materiales!
                                  </>
                                )}
                              </div>
                              <Link
                                href={`/xios-academy/events/workshops/${academy.slug}`}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-center whitespace-nowrap"
                              >
                                {isUpcoming
                                  ? "Ver Detalles"
                                  : "Ver Certificado"}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No tienes academias inscritas
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explora nuestros workshops y eventos en vivo.
                  </p>

                  {/* Debug info para desarrollo */}
                  <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg mb-4 inline-block">
                    <strong>Debug:</strong> {orderAcademies.length} órdenes
                    totales, {academies.length} academias encontradas
                  </div>

                  <Link
                    href="/xios-academy/events/workshops"
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
                  >
                    Ver Eventos y Workshops
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FiUser className="w-5 h-5 text-verde-oscuro" />
                Mi Perfil
              </h3>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Información personal */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={userData?.first_name || ""}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido
                      </label>
                      <input
                        type="text"
                        value={userData?.last_name || ""}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userData?.email || ""}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* <div className="pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Preferencias de Aprendizaje
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <div className="font-medium text-gray-900">
                            Notificaciones por Email
                          </div>
                          <div className="text-sm text-gray-600">
                            Recibe actualizaciones sobre tus cursos
                          </div>
                        </div>
                        <button className="w-12 h-6 bg-verde-oscuro rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all"></div>
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <div className="font-medium text-gray-900">
                            Descarga Automática
                          </div>
                          <div className="text-sm text-gray-600">
                            Descarga contenido para ver offline
                          </div>
                        </div>
                        <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-all"></div>
                        </button>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* Stats del perfil */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-verde-oscuro to-piel-oscuro rounded-xl p-6 text-white text-center">
                    <div className="text-3xl font-bold mb-2">
                      {totalCourses + totalAcademies}
                    </div>
                    <div className="text-piel-blanco/90">Programas Totales</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FiAward className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">Certificados</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        {certificatesEarned}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FiClock className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Horas Totales</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        {totalHours}h
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FiCalendar className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Miembro desde</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {userData?.createdAt
                          ? new Date(userData.createdAt).getFullYear()
                          : "2024"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
