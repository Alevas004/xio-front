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
  FiShoppingBag,
  FiTruck,
  FiShield,
} from "react-icons/fi";

const FooterBX = () => {
  return (
    <footer className="">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-piel-blanco">By Xio</h3>
            <p className="text-sm text-white leading-relaxed">
              Productos naturales y artesanales para tu bienestar. Cuidamos cada
              detalle para ofrecerte lo mejor en calidad y experiencia.
            </p>
            <div className="flex items-center justify-center space-x-1 text-piel-blanco">
              <FiHeart className="w-4 h-4" />
              <span className="text-sm">Creado con amor desde 2020</span>
            </div>
          </div>

          {/* Products & Categories */}
          <div className="">
            <h4 className="text-lg font-semibold text-piel-blanco mb-4">
              Productos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/almarabyxio/products"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Cuidado Personal
                </Link>
              </li>
              <li>
                <Link
                  href="/almarabyxio/products"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Aromaterapia
                </Link>
              </li>
              <li>
                <Link
                  href="/almarabyxio/products"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Aceites Naturales
                </Link>
              </li>
              <li>
                <Link
                  href="/almarabyxio/products"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Productos Artesanales
                </Link>
              </li>
              <li>
                <Link
                  href="/almarabyxio/products"
                  className="text-white hover:text-piel-blanco transition-colors text-sm"
                >
                  Ver Todos los Productos
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
                <span className="text-sm text-white">+57 311 234 5678</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <FiMail className="w-4 h-4" color="white" />
                <span className="text-sm text-white">ventas@byxio.com</span>
              </div>
              <div className="flex justify-center items-start space-x-3">
                <FiMapPin color="white" className="w-4 h-4 mt-0.5" />
                <span className="text-sm text-white">
                  Tienda By Xio
                  <br />
                  Carrera 15 #20-30
                  <br />
                  Armenia, Quindío
                </span>
              </div>
            </div>
          </div>

          {/* Store Info & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-piel-blanco">Atención</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <FiClock className="w-4 h-4" color="white" />
                <div className="text-sm text-white">
                  <div>Lun - Vie: 8:00 AM - 6:00 PM</div>
                  <div>Sáb: 8:00 AM - 4:00 PM</div>
                  <div>Dom: Cerrado</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-center space-x-2">
                <FiTruck className="w-4 h-4 text-piel-blanco" />
                <span className="text-xs text-white">
                  Envío gratis desde $150.000
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <FiShield className="w-4 h-4 text-piel-blanco" />
                <span className="text-xs text-white">
                  Productos 100% naturales
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h5 className="text-sm font-medium text-piel-blanco mb-3">
                Síguenos
              </h5>
              <div className="flex justify-center items-center space-x-3">
                <Link
                  href="https://instagram.com/byxio"
                  className="w-8 h-8 bg-piel-blanco hover:bg-piel-claro rounded-full flex items-center justify-center transition-colors"
                >
                  <FiInstagram className="w-4 h-4" color="black" />
                </Link>
                <Link
                  href="https://facebook.com/byxio"
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
              © 2025 By Xio - Almara. Todos los derechos reservados.
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="/almarabyxio/about-us"
                className="text-sm text-white hover:text-piel-blanco transition-colors"
              >
                Sobre Nosotros
              </Link>
              <Link
                href="/almarabyxio/contact"
                className="text-sm text-white hover:text-piel-blanco transition-colors"
              >
                Contacto
              </Link>
              <div className="flex items-center space-x-2">
                <FiShoppingBag className="w-4 h-4" color="white" />
                <Link
                  href="/almarabyxio/products"
                  className="text-sm bg-piel-blanco border-1 text-verde-oscuro px-3 py-1 rounded-full hover:bg-verde-oscuro hover:text-piel-blanco hover:border-piel-blanco hover:border-1 transition-all"
                >
                  Comprar Ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBX;
