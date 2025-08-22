import React from "react";
import Link from "next/link";
import {
  FiStar,
  FiBookOpen,
  FiUsers,
  FiTrendingUp,
  FiHeart,
  FiZap,
  FiTarget,
  FiGift,
  FiMessageCircle,
  FiChevronRight,
  FiCheck,
  FiAward,
} from "react-icons/fi";

const NoStudent = () => {
  const learningPaths = [
    {
      id: 1,
      title: "Masajista Profesional",
      description:
        "Conviértete en un experto en técnicas de masaje terapéutico y relajante",
      icon: "FiHeart",
      color: "from-pink-500 to-rose-500",
      modules: [
        "Anatomía básica",
        "Técnicas de masaje",
        "Aceites esenciales",
        "Práctica supervisada",
      ],
      duration: "3-4 meses",
      certification: "Certificación Profesional",
      highlights: [
        "Práctica real con clientes",
        "Materiales incluidos",
        "Seguimiento personalizado",
      ],
    },
    {
      id: 2,
      title: "Nutrición Deportiva",
      description: "Especialízate en nutrición para atletas y personas activas",
      icon: "FiTrendingUp",
      color: "from-green-500 to-emerald-500",
      modules: [
        "Macronutrientes",
        "Suplementación",
        "Planes alimentarios",
        "Evaluación nutricional",
      ],
      duration: "2-3 meses",
      certification: "Especialista en Nutrición Deportiva",
      highlights: [
        "Casos reales",
        "Software nutricional",
        "Red de contactos profesionales",
      ],
    },
    {
      id: 3,
      title: "Entrenador Personal",
      description:
        "Desarrolla habilidades para entrenar y motivar a tus clientes",
      icon: "FiTarget",
      color: "from-blue-500 to-cyan-500",
      modules: [
        "Fisiología del ejercicio",
        "Diseño de rutinas",
        "Motivación",
        "Biomecánica",
      ],
      duration: "4-5 meses",
      certification: "Entrenador Personal Certificado",
      highlights: [
        "Prácticas en gimnasio",
        "Metodologías avanzadas",
        "Mentorías grupales",
      ],
    },
    {
      id: 4,
      title: "Terapias Alternativas",
      description: "Explora el mundo de las terapias holísticas y naturales",
      icon: "FiStar",
      color: "from-purple-500 to-violet-500",
      modules: [
        "Aromaterapia",
        "Reflexología",
        "Reiki nivel I y II",
        "Cristaloterapia",
      ],
      duration: "3-4 meses",
      certification: "Terapeuta Holístico",
      highlights: [
        "Enfoque integral",
        "Técnicas milenarias",
        "Conexión mente-cuerpo",
      ],
    },
  ];

  const benefits = [
    {
      icon: FiBookOpen,
      title: "Sistema Progresivo",
      description: "Los cursos se desbloquean según completes talleres previos",
    },
    {
      icon: FiUsers,
      title: "Grupos Reducidos",
      description:
        "Máximo 12 estudiantes por taller para atención personalizada",
    },
    {
      icon: FiAward,
      title: "Certificación Oficial",
      description:
        "Recibe certificados avalados al completar cada especialización",
    },
    {
      icon: FiZap,
      title: "Modalidad Flexible",
      description: "Combina clases presenciales con contenido digital",
    },
  ];

  const getIconComponent = (iconName: string) => {
    const iconMap: {
      [key: string]: React.ComponentType<{ className?: string }>;
    } = {
      FiHeart,
      FiTrendingUp,
      FiTarget,
      FiStar,
    };
    return iconMap[iconName] || FiStar;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-piel-blanco to-piel-claro">
      {/* Hero Section */}
      <div className="relative bg-gradient-1 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 text-verde-oscuro">
              <FiGift className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">
                ¡Inicia tu carrera en bienestar!
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl italic font-bold mb-6 leading-tight text-verde-oscuro">
              Conviértete en un
              <span className="block bg-gradient-2 bg-clip-text text-piel-blanco">
                Profesional Certificado
              </span>
            </h1>

            <p className="md:text-xl  mb-8 leading-relaxed">
              En Xios Academy, cada taller que completes desbloquea nuevos
              cursos especializados. Crea tu propio camino de aprendizaje en el
              mundo del bienestar y la salud.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://wa.me/1234567890?text=Hola! Me interesa recibir asesoría sobre los talleres de Xios Academy"
                target="_blank"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FiMessageCircle className="w-5 h-5 mr-2" />
                Solicitar Asesoría por WhatsApp
              </Link>

              <Link
                href="/xios-academy"
                className="inline-flex items-center bg-white/40 backdrop-blur-sm hover:bg-white/30 text-piel-oscuro py-4 px-8 rounded-xl font-semibold transition-all duration-300 border border-white/30"
              >
                Ver Talleres Disponibles
                <FiChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ¿Cómo Funciona Nuestro Sistema?
            </h2>
            <p className="md:text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestro modelo educativo progresivo te permite especializarte paso
              a paso, desbloqueando nuevas oportunidades conforme avanzas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-1 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Elige tu Especialización
              </h3>
              <p className="text-gray-600">
                Selecciona el área que más te apasione
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-3 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Completa Talleres
              </h3>
              <p className="text-gray-600">
                Avanza a tu ritmo con práctica real
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-1 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Desbloquea Cursos
              </h3>
              <p className="text-gray-600">Accede a contenido especializado</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-1 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Practica
              </h3>
              <p className="text-gray-600">Lleva lo aprendido a la práctica</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="py-20 bg-gradient-1">
        <div className="container mx-auto px-4">
          <div className=" mb-16 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold italic text-verde-oscuro mb-6">
              Especialízate en lo que te apasiona
            </h2>
            <p className="md:text-xl max-w-3xl mx-auto">
              Cada especialización incluye talleres prácticos, contenido teórico
              y prácticas reales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {learningPaths.map((path) => {
              const IconComponent = getIconComponent(path.icon);
              return (
                <div
                  key={path.id}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${path.color} rounded-2xl flex items-center justify-center`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold italic mb-2">
                        {path.title}
                      </h3>
                      <p className="">{path.description}</p>
                      <div className="flex items-center space-x-4 text-sm mt-4 justify-center">
                        <span className="flex items-center">
                          <FiCheck className="w-4 h-4 mr-1 text-green-500" />
                          {path.duration}
                        </span>
                        <span className="flex items-center">
                          <FiAward className="w-4 h-4 mr-1 text-yellow-500" />
                          {path.certification}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Módulos incluidos:
                      </h4>
                      <div className="grid grid-cols-2 gap-2 justify-center items-center">
                        {path.modules.map((module, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center text-sm"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            {module}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        Beneficios destacados:
                      </h4>
                      <div className="space-y-1">
                        {path.highlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center text-sm "
                          >
                            <FiStar className="w-3 h-3 mr-2 text-yellow-500" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ¿Por qué Elegir Xios Academy?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-2 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-3 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">
              ¡Comienza tu Transformación Profesional Hoy!
            </h2>
            <p className="md:text-xl mb-8">
              Nuestros asesores académicos te ayudarán a elegir la
              especialización perfecta según tus objetivos y experiencia previa.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">
                ¿Qué incluye la asesoría gratuita?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mt-5">
                <div className="flex items-center">
                  <FiCheck className="w-5 h-5 mr-3 text-green-400" />
                  <span>Evaluación de tu perfil profesional</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="w-5 h-5 mr-3 text-green-400" />
                  <span>Recomendación personalizada de talleres</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="w-5 h-5 mr-3 text-green-400" />
                  <span>Plan de estudios sugerido</span>
                </div>
                <div className="flex items-center">
                  <FiCheck className="w-5 h-5 mr-3 text-green-400" />
                  <span>Alternativas de pago disponibles</span>
                </div>
              </div>
            </div>

            <Link
              href="https://wa.me/1234567890?text=Hola! Me interesa recibir asesoría gratuita sobre las especializaciones de Xios Academy. ¿Podrían ayudarme a elegir el mejor camino según mi perfil?"
              target="_blank"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              <FiMessageCircle className="w-6 h-6 mr-3" />
              Solicitar Asesoría Gratuita
              <FiChevronRight className="w-5 h-5 ml-2" />
            </Link>

            <p className="text-sm text-piel-blanco mt-4">
              Respuesta inmediata • Sin compromiso • Totalmente gratuito
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoStudent;
