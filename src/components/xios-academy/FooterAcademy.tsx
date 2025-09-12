import React from "react";
import Link from "next/link";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiClock,
  FiCalendar,
  FiAward,
} from "react-icons/fi";

const FooterAcademy = () => {
  return (
    <>
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-piel-blanco">
              XIOS Academy
            </h3>
            <p className="text-sm text-white leading-relaxed">
              Academia online de terapias corporales y bienestar integral.
              Formamos profesionales con técnicas especializadas y
              certificaciones reconocidas.
            </p>
            <div className="flex items-center justify-center space-x-1 text-piel-blanco">
              <FiAward className="w-4 h-4" />
              <span className="text-sm">Educando profesionales desde 2020</span>
            </div>
          </div>

          {/* Programs Quick Links */}
          <div className="">
            <h4 className="text-lg font-semibold text-piel-blanco">
              Programas
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/xios-academy/events/workshops"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Talleres Presenciales
                </Link>
              </li>
              <li>
                <Link
                  href="/xios-academy/events/seminars"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Seminarios Online
                </Link>
              </li>
              <li>
                <Link
                  href="/xios-academy/events/retreats"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Retiros de Bienestar
                </Link>
              </li>
              <li>
                <Link
                  href="/xios-academy/events/corporate-training"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Capacitación Empresarial
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-piel-blanco">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <FiPhone className="w-4 h-4" color="white" />
                <span className="text-sm text-white">+57 300 456 7890</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <FiMail className="w-4 h-4" color="white" />
                <span className="text-sm text-white">
                  academy@xiomarasanchez.com
                </span>
              </div>
              <div className="flex justify-center items-start space-x-3">
                <FiMapPin color="white" className="w-4 h-4 mt-0.5" />
                <span className="text-sm text-white">
                  Campus Virtual XIOS
                  <br />
                  Formación Online
                  <br />
                  Colombia & Latinoamérica
                </span>
              </div>
            </div>
          </div>

          {/* Schedule & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-piel-blanco">
              Horarios de Atención
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <FiClock className="w-4 h-4" color="white" />
                <div className="text-sm text-white">
                  <div>Lun - Vie: 8:00 AM - 6:00 PM</div>
                  <div>Sáb: 9:00 AM - 2:00 PM</div>
                  <div className="text-xs text-piel-blanco mt-1">
                    Soporte 24/7 para estudiantes
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h5 className="text-sm font-medium text-piel-blanco mb-3">
                Síguenos
              </h5>
              <div className="flex justify-center items-center space-x-3">
                <Link
                  href="https://instagram.com/xios.academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-piel-blanco hover:bg-piel-claro rounded-full flex items-center justify-center transition-colors"
                >
                  <FiInstagram className="w-4 h-4" color="black" />
                </Link>
                <Link
                  href="https://facebook.com/xios.academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-piel-blanco hover:bg-piel-claro rounded-full flex items-center justify-center transition-colors"
                >
                  <FiFacebook className="w-4 h-4" color="black" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-piel-blanco">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white">
              © 2025 XIOS Academy. Todos los derechos reservados.
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="/xios-academy"
                className="text-sm text-white hover:text-piel-blanco transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/xios-academy/events/seminars"
                className="text-sm text-white hover:text-piel-blanco transition-colors"
              >
                Seminarios
              </Link>
              <Link
                href="/xios-academy/student-portal"
                className="text-sm text-white hover:text-piel-blanco transition-colors"
              >
                Portal Estudiante
              </Link>
              <div className="flex items-center space-x-2">
                <FiCalendar className="w-4 h-4" color="white" />
                <Link
                  href="/xios-academy/events/workshops"
                  className="text-sm bg-piel-blanco border-1 text-verde-oscuro px-3 py-1 rounded-full hover:bg-verde-oscuro hover:text-piel-blanco hover:border-piel-blanco hover:border-1 transition-all"
                >
                  Ver Cursos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterAcademy;
