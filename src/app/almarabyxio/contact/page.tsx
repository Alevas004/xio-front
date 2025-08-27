"use client";
import Link from "next/link";
import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
} from "react-icons/fi";

const Contact = () => {
  const contactInfo = [
    {
      icon: FiPhone,
      title: "Teléfono",
      value: "+57 300 123 4567",
      subtitle: "Lunes a Viernes 8:00 AM - 6:00 PM",
    },
    {
      icon: FiMail,
      title: "Email",
      value: "",
      subtitle: "Respuesta en menos de 24 horas",
    },
    {
      icon: FiMapPin,
      title: "Ubicación",
      value: "Bogotá, Colombia",
      subtitle: "Zona Rosa, Chapinero",
    },
    {
      icon: FiClock,
      title: "Horarios",
      value: "Lun - Vie: 8:00 AM - 6:00 PM",
      subtitle: "Sáb: 9:00 AM - 2:00 PM",
    },
  ];

  const socialLinks = [
    { icon: FiInstagram, href: "#", color: "hover:text-pink-500" },
    { icon: FiFacebook, href: "#", color: "hover:text-blue-600" },
    { icon: FiTwitter, href: "#", color: "hover:text-blue-400" },
    { icon: FiLinkedin, href: "#", color: "hover:text-blue-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-piel-blanco via-white to-piel-claro/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-verde-oscuro mb-6">
            ¡Hablemos!
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para ayudarte. Contáctanos y descubre cómo podemos
            hacer realidad tus proyectos de bienestar y relajación.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {/* Información de contacto */}
          <div className="space-y-8 flex flex-col md:flex-row justify-between items-center">
            <div className="bg-gradient-to-br from-verde-oscuro to-verde-claro rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
              {/* Decoración */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">
                  Información de contacto
                </h3>
                <p className="text-green-100 mb-8 leading-relaxed">
                  Estamos disponibles para atenderte. Elige la forma que
                  prefieras para contactarnos.
                </p>

                <div className="flex flex-col items-center justify-center space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start w-full space-x-4"
                    >
                      <div className="flex-shrink-0 p-3 bg-black/20 backdrop-blur-sm rounded-xl">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-col justify-start">
                        <h4 className="font-semibold text-lg text-start">
                          {info.title}
                        </h4>
                        <p className="text-green-50 font-medium text-start">
                          {info.value}
                        </p>
                        <p className="text-green-100 text-sm text-start">
                          {info.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mapa o información adicional */}
            <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-piel-claro/30 to-piel-oscuro/20 rounded-full -translate-y-12 translate-x-12"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-verde-oscuro mb-4">
                  ¿Por qué elegirnos?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-verde-oscuro rounded-full mt-2"></div>
                    <p className=" text-start text-gray-600">
                      <span className="font-semibold">Respuesta rápida:</span>{" "}
                      Contestamos en menos de 24 horas
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-piel-oscuro rounded-full mt-2"></div>
                    <p className="text-start text-gray-600">
                      <span className="font-semibold">
                        Atención personalizada:
                      </span>{" "}
                      Cada cliente es único para nosotros
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-verde-claro rounded-full mt-2"></div>
                    <p className="text-start text-gray-600">
                      <span className="font-semibold">Experiencia:</span> Más de
                      5 años en el sector del bienestar
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-piel-claro rounded-full mt-2"></div>
                    <p className="text-start text-gray-600">
                      <span className="font-semibold">
                        Calidad garantizada:
                      </span>{" "}
                      Productos certificados y de alta calidad
                    </p>
                  </div>
                  {/* Redes sociales */}
                  <div className="mt-10 pt-8 border-t border-white/20">
                    <h4 className="font-semibold text-lg mb-4">Síguenos</h4>
                    <div className="flex items-center justify-center space-x-4">
                      {socialLinks.map((social, index) => (
                        <Link
                          key={index}
                          href={social.href}
                          className="p-3 bg-black/20 backdrop-blur-sm rounded-xl hover:bg-black/30 transition-all duration-300 hover:scale-110"
                        >
                          <social.icon className="w-6 h-6 text-white" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action adicional */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-piel-claro/30 to-piel-oscuro/30 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold text-verde-oscuro mb-4">
              ¿Necesitas asesoría personalizada?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Agenda una videollamada gratuita de 30 minutos con nuestros
              expertos en bienestar y descubre la solución perfecta para ti.
            </p>
            <Link
              href="https://wa.me/573135058584?text=¡Hola!%20Quiero%20más%20información%20sobre%20tus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-verde-oscuro text-piel-blanco px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-verde-claro transition-all"
            >
              Agendar consulta gratuita
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
