import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiStar,
  FiArrowRight,
  FiTag,
  FiAward,
  FiTrendingUp,
  FiBookOpen,
  FiTarget,
  FiZap,
  FiGlobe,
} from "react-icons/fi";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";

interface Workshop {
  id: string;
  slug: string;
  title: string;
  description_short: string;
  start_date: string;
  duration?: string;
  speakers?: string[];
  location?: string;
  capacity?: number;
  enrolled?: number;
  price?: number;
  rating?: number;
  level?: string;
  category?: string;
  image?: string;
  tags?: string[];
  start_time?: string;
  certificate?: boolean;
}

interface WorkshopsProps {
  workshops: Workshop[];
}

const AllWorkshops = ({ workshops }: WorkshopsProps) => {
  // Estadísticas para mostrar en el header
  const stats = {
    totalWorkshops: workshops?.length || 0,
    avgDuration: workshops?.length
      ? Math.round(
          workshops.reduce(
            (acc, w) => acc + (parseInt(w.duration || "0") || 8),
            0
          ) / workshops.length
        )
      : 8,
    certificatesOffered: workshops?.filter((w) => w.certificate).length || 0,
    locations:
      [...new Set(workshops?.map((w) => w.location).filter(Boolean))].length ||
      1,
  };

  const getLevelColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case "principiante":
        return "bg-green-100 text-green-800";
      case "intermedio":
        return "bg-yellow-100 text-yellow-800";
      case "avanzado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!workshops || workshops.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-piel-blanco to-piel-claro">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-gradient-3 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <FiCalendar className="w-12 h-12 text-piel-blanco" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Próximamente
            </h2>
            <p className="text-gray-600 text-lg">
              Estamos preparando increíbles talleres para ti. ¡Mantente atento!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Epic Hero Section */}
      <div className="relative text-white py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-verde-oscuro bg-opacity-20"></div>
        <div className="absolute inset-0 bg-cyan-100"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-bounce">
          <FiZap className="w-8 h-8 text-cyan-600" />
        </div>
        <div className="absolute top-40 right-20 opacity-20 animate-pulse">
          <FiTarget className="w-12 h-12 text-cyan-600" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20 animate-bounce delay-300">
          <FiBookOpen className="w-10 h-10 text-cyan-600" />
        </div>

        <div className="relative container mx-auto px-4 ">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main Title */}
            <div className="mb-3 flex flex-col items-center justify-center">
              <h1 className="text-6xl md:text-8xl font-bold mb-4 italic text-white w-fit px-5 bg-cyan-600 animate-pulse  rounded-3xl">
                Talleres
              </h1>
              <div className="w-32 h-1 bg-white mx-auto rounded-full"></div>
            </div>

            {/* Subtitle */}
            <div className="flex items-center justify-center">
              <p className="text-xl md:text-3xl text-black max-w-4xl mx-auto leading-relaxed mb-12 font-light">
                ✨ Experiencias de aprendizaje intensivas y prácticas diseñadas
                para
                <span className="font-semibold text-black">
                  {" "}
                  potenciar tu desarrollo profesional
                </span>{" "}
                ✨
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-cyan-500/20 transition-all duration-300 group">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-piel-blanco/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <FiBookOpen className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-black mb-1">
                  {stats.totalWorkshops}
                </div>
                <div className="text-sm text-black font-medium">
                  Talleres Activos
                </div>
              </div>

              <div className="bg-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-cyan-500/20 transition-all duration-300 group">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-piel-blanco/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <FiClock className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-black mb-1">
                  {stats.avgDuration}h
                </div>
                <div className="text-sm text-black font-medium">
                  Duración Promedio
                </div>
              </div>

              <div className="bg-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-cyan-500/20 transition-all duration-300 group">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-piel-blanco/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <FiAward className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-black mb-1">
                  {stats.certificatesOffered}
                </div>
                <div className="text-sm text-black font-medium">
                  Con Certificado
                </div>
              </div>

              <div className="bg-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-cyan-500/20  transition-all duration-300 group">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-piel-blanco/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <FiGlobe className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-black mb-1">
                  {stats.locations}
                </div>
                <div className="text-sm text-black font-medium">
                  Metodologias
                </div>
              </div>
            </div>

            {/* Value Propositions */}
            <div className="flex flex-wrap justify-center gap-4 mb-5">
              <div className="flex items-center bg-cyan-400/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <FiTrendingUp className="w-5 h-5 text-black mr-2" />
                <span className="text-black font-medium">
                  Crecimiento Profesional
                </span>
              </div>
              <div className="flex items-center bg-cyan-400/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <FiUsers className="w-5 h-5 text-black mr-2" />
                <span className="text-black font-medium">Networking</span>
              </div>
              <div className="flex items-center bg-cyan-400/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <FiZap className="w-5 h-5 text-black mr-2" />
                <span className="text-black font-medium">
                  Aprendizaje Práctico
                </span>
              </div>
              <div className="flex items-center bg-cyan-400/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <FiAward className="w-5 h-5 text-black mr-2" />
                <span className="text-black font-medium">Certificación</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center flex flex-col items-center justify-center">
              <p className="text-lg text-black mb-6 max-w-2xl mx-auto">
                🚀 Transforma tu carrera con talleres diseñados por expertos de
                la industria
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/xios-academy/events/corporate-training"
                  className="bg-transparent border-2 border- text-black px-8 py-4 rounded-xl font-bold hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  <span>Talleres Para Empresas</span>
                  <FiTarget className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workshops Grid */}
      <div id="workshops" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-2"
            >
              {/* Workshop Image */}
              <div className="relative h-48 bg-gradient-2 flex items-center justify-center">
                {workshop.image ? (
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-piel-blanco">
                    <FiStar className="w-16 h-16" />
                  </div>
                )}

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="w-4 h-4 text-verde-oscuro" />
                    <span className="text-sm font-semibold text-gray-800">
                      {formatDate(workshop.start_date)}
                    </span>
                  </div>
                </div>

                {/* Price Badge */}
                {workshop.price && (
                  <div className="absolute bottom-4 right-4 bg-verde-oscuro text-white rounded-xl px-3 py-2">
                    <span className="text-sm font-bold">
                      $ {formatPrice(workshop.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category & Level */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-piel-blanco text-piel-oscuro">
                    <FiTag className="w-3 h-3 mr-1" />
                    Taller
                  </span>

                  {workshop.level && (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(
                        workshop.level
                      )}`}
                    >
                      {workshop.level}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold italic mb-3 line-clamp-2">
                  {workshop.title}
                </h3>

                {/* Description */}
                <p className="text-sm mb-4 line-clamp-3">
                  {workshop.description_short}
                </p>

                {/* Workshop Details */}
                <div className="space-y-2 mb-6">
                  {workshop.start_time && (
                    <div className="flex items-center text-sm">
                      <FiClock className="w-4 h-4 mr-2" />
                      <span>Inicia a las: {workshop.start_time}</span>
                    </div>
                  )}

                  {workshop.duration && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiClock className="w-4 h-4 mr-2" />
                      <span>Duración: {workshop.duration} horas</span>
                    </div>
                  )}

                  {workshop.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      <span>{workshop.location}</span>
                    </div>
                  )}

                  {workshop.speakers && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiUsers className="w-4 h-4 mr-2" />
                      <span>Instructores: {workshop.speakers.join(", ")}</span>
                    </div>
                  )}

                  {/* {(workshop.capacity || workshop.enrolled) && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiUsers className="w-4 h-4 mr-2" />
                      <span>
                        {workshop.enrolled || 0} /{" "}
                        {workshop.capacity || "Sin límite"} participantes
                      </span>
                    </div>
                  )} */}

                  <div className="flex items-center text-sm text-gray-500">
                    <FiStar className="w-4 h-4 mr-2 text-yellow-500" />
                    {workshop.certificate ? "Certificado" : "Sin certificado"}
                  </div>
                </div>

                {/* Tags */}
                {/* {workshop.tags && workshop.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {workshop.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-verde-gris bg-opacity-20 text-verde-oscuro"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )} */}

                {/* Action Button */}
                <Link
                  href={`/xios-academy/events/workshops/${workshop.slug}`}
                  className="group w-full bg-gradient-2 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Ver detalles</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-gray-600 mb-6">
              Contáctanos para conocer sobre próximos talleres o solicitar
              capacitaciones personalizadas para tu equipo.
            </p>
            <Link
              href="/xiomarasanchezterapeuta/contact"
              className="inline-flex items-center bg-gradient-3 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Contactar
              <FiArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWorkshops;
