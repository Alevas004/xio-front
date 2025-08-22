import axios from "axios";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiArrowLeft,
  FiTag,
  FiCheck,
  FiDollarSign,
  FiAward,
} from "react-icons/fi";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface Seminar {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description_long: string;
  description_short: string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
  duration?: string;
  requirements?: string[];
  instructor?: string;
  location?: string;
  capacity?: number;
  enrolled?: number;
  price?: number;
  rating?: number;
  level?: string;
  category?: string;
  image?: string;
  tags?: string[];
  includes?: string[];
  certificate?: boolean;
  prerequisites?: string[];
  objectives?: string[];
  materials_description?: string[];
  speakers?: string[];
  agenda?: { time: string; topic: string }[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const res = await axios.get(`${BASE_URL}/xios-academy/event/${slug}`);
    const seminar: Seminar = res.data;

    console.log(seminar, "Seminar Data");

    return {
      title: `${seminar.title} | Seminarios Xios Academy`,
      description: seminar.description_long,
      keywords: `${seminar.subtitle}, Seminario, ${seminar.level}`,
      openGraph: {
        title: `${seminar.title} | Seminarios Xios Academy`,
        description: seminar.description_long,
        images: seminar.image ? [{ url: seminar.image }] : [],
        type: "website",
      },
    };
  } catch {
    return {
      title: "Seminario no encontrado | Xios Academy",
      description: "El seminario que buscas no está disponible",
    };
  }
}

const SeminarDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  let seminar: Seminar | null = null;

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/events/${slug}`);
    seminar = res.data;
  } catch (error) {
    console.error("Error loading seminar:", error);
    notFound();
  }
  console.log(seminar);

  const getLevelColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case "principiante":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermedio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "avanzado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!seminar) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-1">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 bg-gradient-1 relative overflow-hidden">
          {seminar.image && (
            <Image
              src={seminar.image}
              alt={seminar.title}
              fill
              className="object-cover opacity-70"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>

          <div className="relative px-4 h-full flex justify-center items-center">
            <div className="text-white max-w-3xl">
              <Link
                href="/xios-academy/events/seminars"
                className="inline-flex items-center text-piel-blanco hover:text-white mb-6 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Volver a Seminarios
              </Link>

              <div className="flex items-center space-x-4 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  <FiTag className="w-3 h-3 mr-1" />
                  Seminario
                </span>

                {seminar.level && (
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(
                      seminar.level
                    )} bg-white`}
                  >
                    {seminar.level}
                  </span>
                )}
              </div>

              <h1 className="text-5xl md:text-6xl italic font-black mb-4">
                {seminar.title}
              </h1>

              <p className="text-xl text-piel-blanco leading-relaxed">
                {seminar.description_short}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* seminar Details */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Detalles del Seminario
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-2 rounded-lg flex items-center justify-center">
                    <FiCalendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-start">
                      Inicia a las {seminar.start_time}
                    </p>
                    <p className="font-semibold text-gray-900">
                      El {formatDate(seminar.start_date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-2 rounded-lg flex items-center justify-center">
                    <FiCalendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-start">
                      Termina a las {seminar.end_time}
                    </p>
                    <p className="font-semibold text-gray-900">
                      El {formatDate(seminar.end_date)}
                    </p>
                  </div>
                </div>

                {seminar.duration && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-3 rounded-lg flex items-center justify-center">
                      <FiClock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 text-start">
                        Duración
                      </p>
                      <p className="font-semibold text-gray-900">
                        {seminar.duration} Horas
                      </p>
                    </div>
                  </div>
                )}

                {seminar.location && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-1 rounded-lg flex items-center justify-center">
                      <FiMapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-start">Ubicación</p>
                      <p className="font-semibold text-gray-900">
                        {seminar.location}
                      </p>
                    </div>
                  </div>
                )}

                {seminar.speakers && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-verde-oscuro rounded-lg flex items-center justify-center">
                      <FiUsers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-start">Instructor</p>
                      <p className="font-semibold text-gray-900">
                        {seminar.speakers.join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                {(seminar.capacity || seminar.enrolled) && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <FiUsers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Participantes</p>
                      <p className="font-semibold text-gray-900">
                        {seminar.enrolled || 0} /{" "}
                        {seminar.capacity || "Sin límite"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Objectives */}
            {seminar.description_long && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Objetivos del Seminario
                </h3>
                <p className="text-gray-700">{seminar.description_long}</p>
              </div>
            )}

            {/* Prerequisites */}
            {seminar.requirements && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Requisitos Previos
                </h3>
                <ul className="space-y-2">
                  {seminar.requirements.map((prereq, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-piel-oscuro rounded-full"></div>
                      <span className="text-gray-700">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Materials */}

            {seminar.materials_description && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Materiales Incluidos
                </h3>
                <ul className="space-y-2">
                  {seminar.materials_description.map((material, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <FiCheck className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

             {seminar.includes && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Beneficios Incluidos
                </h3>
                <ul className="space-y-2">
                  {seminar.includes.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <FiCheck className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Enrollment Card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg sticky top-8">
              {seminar.price && (
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <FiDollarSign className="w-6 h-6 text-verde-oscuro" />
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(seminar.price)}
                    </span>
                  </div>
                  <p className="text-gray-500">Por participante</p>
                </div>
              )}

              {seminar.certificate && (
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <div className="flex items-center">
                    <FiAward className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {seminar.certificate ? "Incluye certificado" : ""}
                    </span>
                  </div>
                 
                </div>
              )}

              <Link
                href="/xiomarasanchezterapeuta/contact"
                className="w-full bg-gradient-2 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-center block mb-4"
              >
                Inscribirse al Seminario
              </Link>

              <Link
                href="/xiomarasanchezterapeuta/contact"
                className="w-full border-2 border-verde-oscuro text-verde-oscuro py-3 px-6 rounded-xl font-semibold hover:bg-verde-oscuro hover:text-white transition-all duration-300 text-center block"
              >
                Más Información
              </Link>
            </div>

            {/* Tags */}
            {seminar.tags && seminar.tags.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">
                  Temas Relacionados
                </h4>
                <div className="flex flex-wrap gap-2">
                  {seminar.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-piel-claro text-piel-oscuro"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarDetailPage;
