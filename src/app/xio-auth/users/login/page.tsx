import LoginForm from "@/components/auth/login/LoginForm";
import Link from "next/link";
import React from "react";
import {
  FiUser,
  FiLock,
  FiShield,
  FiHeart,
  FiStar,
  FiArrowLeft,
  FiEye,
} from "react-icons/fi";

export const metadata = {
  title: "Iniciar Sesión | XIOS Platform",
  description:
    "Accede a tu cuenta XIOS para gestionar tus servicios de bienestar y salud",
};

const Login = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-1 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-24 h-24 bg-gradient-2 rounded-full opacity-30 blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-3 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        {/* Floating icons */}
        <div className="absolute top-20 right-1/4 animate-bounce delay-300">
          <FiShield className="w-8 h-8 text-verde-claro " />
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-pulse delay-300">
          <FiHeart className="w-6 h-6 text-piel-oscuro " />
        </div>
        <div className="absolute top-1/4 left-1/3 animate-bounce delay-300">
          <FiStar className="w-5 h-5 text-verde-oscuro" />
        </div>
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-verde-oscuro hover:text-piel-oscuro transition-colors bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg hover:shadow-xl"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="font-medium">Volver al inicio</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-3 ">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
          {/* Left Side - Login Form */}
          <div className="flex justify-center lg:justify-end mt-20 md:mt-0 ">
            <div className="w-full max-w-md">
              {/* Card Container */}
              <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 py-5 relative">
                {/* Card Header */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-2 rounded-2xl flex items-center justify-center mx-auto">
                    <FiLock className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold  mb-2">Iniciar Sesión</h2>
                  <p>Ingresa tus credenciales para continuar</p>
                </div>

                {/* Login Form Component */}
                <div className="space-y-6">
                  <LoginForm />
                </div>

                {/* Additional Links */}
                <div className=" text-center space-y-4">
                  <div className="pt-4 border-t border-piel-claro">
                    <p className="text-xs">
                      Al iniciar sesión, aceptas nuestros términos de servicio y
                      política de privacidad
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              {/* <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  ¿Necesitas ayuda para acceder?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-gradient-1 text-verde-oscuro px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Contactar Soporte
                </Link>
              </div> */}
            </div>
          </div>

          {/* Right Side - Branding & Info */}
          <div className="order-2 lg:order-2 mb-20 md:mb-0">
            <div className="text-center lg:text-left space-y-8 lg:pr-8 mt-5 md:mt-0bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-piel-claro sticky top-8">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center">
                <span className="bg-gradient-2 bg-clip-text text-[#fdf4ee] p-2 rounded-2xl">
                  Bienvenid@
                </span>
                <br />
                <span className="text-verde-oscuro">de vuelta</span>
              </h1>
              <p className="md:text-xl leading-relaxed ">
                Accede a tu mundo de bienestar personalizado. Gestiona tus
                citas, explora servicios y conecta con tu bienestar integral.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start justify-start md:justify-end space-x-3">
                  <div className="w-12 h-12 bg-gradient-1 rounded-xl flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-verde-oscuro" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-start">
                      Perfil Personalizado
                    </h3>
                    <p className="text-sm text-start">
                      Tu historial y preferencias
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-2 rounded-xl flex items-center justify-center">
                    <FiShield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-start">
                      Seguro y Privado
                    </h3>
                    <p className="text-sm text-start">Tus datos protegidos</p>
                  </div>
                </div>

                <div className="flex items-start justify-start md:justify-end space-x-3">
                  <div className="w-12 h-12 bg-gradient-3 rounded-xl flex items-center justify-center">
                    <FiHeart className="w-6 h-6 text-verde-oscuro" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-start">
                      Bienestar Integral
                    </h3>
                    <p className="text-sm text-start">
                      Servicios especializados
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-start space-x-3">
                  <div className="w-12 h-12 bg-verde-oscuro rounded-xl flex items-center justify-center">
                    <FiEye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-start">Fácil Gestión</h3>
                    <p className="text-sm text-start">
                      Control total de tu cuenta
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-piel-claro">
                <div className="flex items-center justify-center space-x-3 md:space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-verde-oscuro">
                      1000+
                    </div>
                    <div className="text-sm text-gray-600">
                      Usuarios Activos
                    </div>
                  </div>
                  <div className="w-px h-12 bg-piel-claro"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-piel-oscuro">
                      5⭐
                    </div>
                    <div className="text-sm text-gray-600">Calificación</div>
                  </div>
                  <div className="w-px h-12 bg-piel-claro"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-verde-claro">
                      24/7
                    </div>
                    <div className="text-sm text-gray-600">Soporte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
