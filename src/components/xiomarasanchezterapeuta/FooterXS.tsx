import React from "react";
import Link from "next/link";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiHeart,
  FiClock,
  FiCalendar,
} from "react-icons/fi";

const FooterXS = () => {
  return (
    <>
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-piel-blanco">Xiomara Sánchez</h3>
            <p className="text-sm text-white leading-relaxed">
              Terapeuta profesional dedicada a tu bienestar integral.
              Especializada en técnicas de relajación y sanación holística.
            </p>
            <div className="flex items-center justify-center space-x-1 text-piel-blanco">
              <FiHeart className="w-4 h-4" />
              <span className="text-sm">Cuidando tu bienestar desde 2018</span>
            </div>
          </div>

          {/* Services Quick Links */}
          <div className="">
            <h4 className="text-lg font-semibold text-piel-blanco">
              Servicios
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/xiomarasanchezterapeuta/services-xs"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Masajes Terapéuticos
                </Link>
              </li>
              <li>
                <Link
                  href="/xiomarasanchezterapeuta/services-xs"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Relajación Profunda
                </Link>
              </li>
              <li>
                <Link
                  href="/xiomarasanchezterapeuta/services-xs"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Aromaterapia
                </Link>
              </li>
              <li>
                <Link
                  href="/xiomarasanchezterapeuta/services-xs"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Consulta Personalizada
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-piel-blanco">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center  justify-center space-x-3">
                <FiPhone className="w-4 h-4 " color="white" />
                <span className="text-sm text-white">
                  +57 300 123 4567
                </span>
              </div>
              <div className="flex items-center  justify-center space-x-3">
                <FiMail className="w-4 h-4" color="white" />
                <span className="text-sm text-white">
                  info@xiomarasanchez.com
                </span>
              </div>
              <div className="flex justify-center items-start space-x-3">
                <FiMapPin color="white" className="w-4 h-4 mt-0.5" />
                <span className="text-sm text-white">
                  Centro de Bienestar
                  <br />
                  Calle 123 #45-67
                  <br />
                  Armenia, Colombia
                </span>
              </div>
            </div>
          </div>

          {/* Schedule & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-piel-blanco">Horarios</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <FiClock className="w-4 h-4" color="white" />
                <div className="text-sm text-white">
                  <div>Lun - Vie: 7:00 AM - 8:00 PM</div>
                  <div>Sáb - Dom: 7:00 AM - 6:00 PM</div>
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
                  href="#"
                  className="w-8 h-8 bg-piel-blanco hover:bg-piel-claro rounded-full flex items-center justify-center transition-colors"
                >
                  <FiInstagram className="w-4 h-4 " color="black"/>
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 bg-piel-blanco hover:bg-piel-claro rounded-full flex items-center justify-center transition-colors"
                >
                  <FiFacebook className="w-4 h-4 " color="black"/>
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
              © 2025 Xiomara Sánchez Terapeuta. Todos los derechos reservados.
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="/xiomarasanchezterapeuta/about-me"
                className="text-sm text-white hover:text-piel-blanco transition-colors"
              >
                Sobre Mí
              </Link>
              <Link
                href="/xiomarasanchezterapeuta/contact"
                className="text-sm text-white hover:text-piel-blanco transition-colors"
              >
                Contacto
              </Link>
              <div className="flex items-center space-x-2">
                <FiCalendar className="w-4 h-4 " color="white" />
                <Link
                  href="/xiomarasanchezterapeuta/contact"
                  className="text-sm bg-piel-blanco border-1 text-verde-oscuro px-3 py-1 rounded-full hover:bg-verde-oscuro hover:text-piel-blanco hover:border-piel-blanco hover:border-1 transition-all"
                >
                  Reservar Cita
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterXS;
