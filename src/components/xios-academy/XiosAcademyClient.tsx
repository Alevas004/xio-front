
import React from "react";
import Link from "next/link";
import {
  FiBook,
  FiUsers,
  FiPlay,
  FiCalendar,
  FiAward,
  FiStar,
  FiClock,
  FiUser,
  FiChevronRight,
  FiBookOpen,
  FiGlobe,
  FiHeart,
  FiTrendingUp,
} from "react-icons/fi";
import Image from "next/image";

// Mapeo de iconos
const iconMap = {
  FiBook,
  FiUsers,
  FiStar,
  FiClock,
  FiAward,
  FiHeart,
  FiTrendingUp,
};

// Función helper para obtener el componente del icono
const getIconComponent = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || FiStar;
};

export interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  images: string[] | null;
  price: number;
  category: string;
  level: string;
  description: string;
  features: string[];
  url: string;
  slug: string;
  description_short: string;
  includes: string[];
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  price: number;
  spots: number;
  totalSpots: number;
  type: string;
}

interface Stat {
  number: string;
  label: string;
  icon: string; // Ahora es string
}

interface LearningPath {
  title: string;
  description: string;
  courses: number;
  duration: string;
  icon: string; // Cambiado a string para consistencia
  color: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  course: string;
}

interface XiosAcademyClientProps {
  courses: Course[];
  upcomingEvents: Event[];
  stats: Stat[];
  learningPaths: LearningPath[];
  testimonials: Testimonial[];
}

const XiosAcademyClient: React.FC<XiosAcademyClientProps> = ({
  courses,
  upcomingEvents,
  stats,
  learningPaths,
  testimonials,
}) => {



  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative pb-10 pt-5 overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-1 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-piel-oscuro/20 to-verde-gris/10 rounded-full translate-y-32 -translate-x-32"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-verde-oscuro/10 px-4 py-2 rounded-full mb-2">
                <FiBookOpen className="w-5 h-5 text-verde-oscuro" />
                <span className="text-verde-oscuro font-semibold">
                  Xio&apos;s Academy
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-verde-oscuro italic leading-tight">
                Transforma tu vida a través del{" "}
                <span className="bg-gradient-2 p-1 bg-clip-text text-white rounded-3xl">
                  aprendizaje
                </span>
              </h1>

              <p className="md:text-xl leading-relaxed">
                Descubre cursos y eventos que te ayudarán a desarrollar
                habilidades en bienestar, mindfulness, yoga, nutrición
                consciente y mucho más. Aprende de expertos reconocidos
                internacionalmente.
              </p>

              <div className="flex flex-col items-center justify-center sm:flex-row gap-4 my-8">
                <Link
                  href="/xios-academy/courses"
                  className="bg-gradient-1 border-1 text-verde-oscuro px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
                >
                  Explorar cursos
                </Link>
                <Link
                  href="/xios-academy/events"
                  className="border-2 border-verde-oscuro text-verde-oscuro px-8 py-4 rounded-xl font-semibold text-lg hover:bg-verde-oscuro hover:text-white hover:scale-105 transition-all duration-300 text-center"
                >
                  Ver eventos
                </Link>
              </div>

              <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <FiPlay className="w-5 h-5" />
                  <span>Acceso inmediato</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiAward className="w-5 h-5" />
                  <span>Certificación incluida</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiUsers className="w-5 h-5" />
                  <span>Comunidad global</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-white to-piel-claro/50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-verde-oscuro to-verde-claro rounded-full flex items-center justify-center">
                        <FiPlay className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl text-start">
                          Clase gratuita
                        </h3>
                        <div className="text-sm text-verde-claro">
                          Introducción al Mindfulness
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-verde-oscuro">
                      Gratis
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duración:</span>
                      <span className="font-semibold">45 minutos</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Formato:</span>
                      <span className="font-semibold">Video HD</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Idioma:</span>
                      <span className="font-semibold">Español</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-2 text-white py-3 rounded-xl font-semibold cursor-pointer">
                    Comenzar ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = getIconComponent(stat.icon);
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-2 rounded-2xl ">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-verde-oscuro mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cursos Destacados */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-verde-oscuro mb-6">
              Cursos Más Populares
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aprende de los mejores instructores y transforma tu vida con
              contenido de alta calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(courses) &&
              courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48">
                    <Image
                      src={course.images?.[0] ? course.images[0] : "/placeholder.png"}
                      alt={course.title}
                      width={500}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                    <div className="bg-black/50 absolute w-full h-full top-0"></div>
                    <Link
                      href={`/xios-academy/student-portal/courses/${course.slug}`}
                      className="absolute inset-0 flex items-center justify-center "
                    >
                      <FiPlay className="w-16 h-16 text-white" />
                    </Link>
                    <div className="absolute top-4 left-1">
                      <h4 className="text-sm font-semibold text-center text-white">
                        Categoria:
                      </h4>
                      <ul className="bg-piel-blanco text-white px-3 py-1 rounded-2xl text-start">
                        {Array.isArray(course.category) &&
                          course.category.map((cat, index) => (
                            <li
                              key={index}
                              className="text-verde-oscuro text-start text-sm"
                            >
                              {" "}
                              <span className="text-xs">✨</span>{" "}
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="absolute top-4 right-4">
                      <h4 className="text-sm font-semibold text-center text-white">
                        Nivel:
                      </h4>
                      <span className="bg-gradient-2 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-bold italic">
                        {course.title}
                      </h3>
                      <p className="text-sm">{course.description_short}</p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <FiUser className="w-4 h-4 text-verde-oscuro" />
                        <span className="text-sm text-verde-oscuro">
                          {course.instructor}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold"></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FiClock className="w-4 h-4" />
                          <span>{course.duration} horas</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiUsers className="w-4 h-4" />
                          <span>+100 alumnos</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {Array.isArray(course.includes) &&
                        course.includes.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-xs text-verde-oscuro"
                          >
                            <div className="w-1.5 h-1.5 bg-verde-oscuro rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-verde-oscuro">
                        {course.price.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                        })}{" "}
                        <span className="text-xs">COP</span>
                      </div>
                      <Link
                        href={`/xios-academy/student-portal/courses/${course.slug}`}
                        className="bg-gradient-2 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                      >
                        Ver curso
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/xios-academy/student-portal/courses`}
              className="inline-flex items-center space-x-2 bg-gradient-2 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <span>Ver todos los cursos</span>
              <FiChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rutas de Aprendizaje */}
      <section className="py-20 bg-gradient-to-r from-piel-claro/20 to-piel-oscuro/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-verde-oscuro mb-6">
              Rutas de Aprendizaje
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Programas estructurados que te guían paso a paso hacia tus
              objetivos profesionales y personales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => {
              const IconComponent = getIconComponent(path.icon);
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-3  rounded-full -translate-y-16 translate-x-16"></div>

                  <div className="relative ">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${path.color} rounded-2xl mb-6`}
                    >
                      <IconComponent className="w-8 h-8 text-piel-blanco" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 ">
                      {path.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {path.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Cursos incluidos</span>
                        <span className="font-semibold">{path.courses}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duración estimada</span>
                        <span className="font-semibold">{path.duration}</span>
                      </div>
                    </div>

                    <Link
                      href={""}
                      className="w-full bg-gradient-2 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Comenzar ruta
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-verde-oscuro mb-6">
              Próximos Eventos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Participa en talleres, retiros y masterclasses diseñados para
              acelerar tu crecimiento personal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-verde-claro/20 to-piel-claro/20 rounded-full -translate-y-12 translate-x-12"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        event.type === "Virtual"
                          ? "bg-verde-claro/20 text-verde-oscuro"
                          : "bg-piel-claro/50 text-piel-oscuro"
                      }`}
                    >
                      {event.type}
                    </span>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        Cupos disponibles
                      </div>
                      <div className="font-bold text-verde-oscuro">
                        {event.spots}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FiCalendar className="w-4 h-4" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FiGlobe className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        Progreso de inscripciones
                      </span>
                      <span className="text-sm font-semibold">
                        {event.totalSpots - event.spots}/{event.totalSpots}
                      </span>
                    </div>
                    <div className="w-full bg-piel-claro rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-2 h-2 rounded-full"
                        style={{
                          width: `${
                            ((event.totalSpots - event.spots) /
                              event.totalSpots) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-verde-oscuro">
                      ${event.price.toLocaleString()}
                    </div>
                    <Link
                      href={`/xios-academy/events/${event.id}`}
                      className="bg-gradient-2 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                    >
                      Inscribirme
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/xios-academy/events"
              className="inline-flex items-center space-x-2 bg-gradient-2 text-piel-blanco px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <span>Ver todos los eventos</span>
              <FiChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-gradient-to-r from-verde-oscuro to-verde-claro relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-70 bg-gradient-3  rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-2 rounded-full translate-y-32 -translate-x-32"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative ">
          <div className="text-center mb-16 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white italic">
              Lo que dicen nuestros estudiantes
            </h2>
            <p className="md:text-xl text-green-100 max-w-3xl mx-auto">
              Miles de personas han transformado sus vidas a través de nuestros
              cursos y eventos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-white border-1 border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-verde-claro mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-lg text-verde-oscuro">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-verde-gris">{testimonial.role}</p>
                  <p className="text-sm text-verde-gris">
                    {testimonial.course}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="px-4 text-center ">
          <div className="bg-gradient-2 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold italic text-piel-blanco mb-6">
              ¿Listo para comenzar tu transformación?
            </h2>
            <p className="md:text-xl text-piel-blanco leading-relaxed">
              Únete a miles de estudiantes que ya están viviendo una vida más
              plena y consciente. Comienza hoy mismo tu journey de aprendizaje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/xios-academy/courses"
                className="bg-gradient-1 text-verde-oscuro px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Explorar cursos
              </Link>
              <Link
                href="/xios-academy/contact"
                className="border-2 border-verde-oscuro text-piel-blanco px-8 py-4 rounded-xl font-semibold text-lg hover:bg-verde-oscuro hover:text-white hover:scale-105 transition-all duration-300"
              >
                Agendar asesoría gratuita
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default XiosAcademyClient;
