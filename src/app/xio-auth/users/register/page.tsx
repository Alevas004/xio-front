import RegisterForm from "@/components/auth/login/RegisterForm";
import Link from "next/link";
import { FiArrowLeft, FiHeart, FiStar, FiShield } from "react-icons/fi";

const Register = () => {
  return (
    <div className="min-h-screen relative">
      <video
        src="/masaje_terapeutico_hover.webm"
        autoPlay
        loop
        muted
        className="absolute mb-8 object-cover w-full h-full"
      />
      <div className="w-full h-full absolute mb-8 bg-black/70"></div>
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-verde-oscuro hover:text-piel-oscuro transition-colors bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="font-medium">Inicio</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Form (Mobile First) */}
          <div className="lg:col-span-2 order-1 mt-12 md:mt-0">
            <div className="max-w-xl">
              {/* Form Container */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-piel-claro">
                <RegisterForm />
              </div>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="order-2 lg:order-2 mb-20 md:mb-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-piel-claro sticky top-8">
              <h3 className="text-2xl font-bold text-verde-oscuro mb-6 text-center">
                ¿Por qué XIO&apos;S?
              </h3>

              <div className="space-y-4 mt-1">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-2 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiHeart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-start text-verde-oscuro">
                      Bienestar Integral
                    </h4>
                    <p className="text-sm text-start text-black">
                      Servicios personalizados para tu salud
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-2 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiShield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-start text-verde-oscuro">
                      Datos Seguros
                    </h4>
                    <p className="text-sm text-start text-black">
                      Tu información está protegida
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-2 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiStar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-start text-verde-oscuro">
                      Experiencia Premium
                    </h4>
                    <p className="text-sm text-start text-black">
                      Acceso a servicios exclusivos
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-3 pt-6 border-t border-verde-claro">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-verde-oscuro">
                      1000+
                    </div>
                    <div className="text-xs text-gray-600">Usuarios</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-verde-oscuro">
                      5⭐
                    </div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-verde-oscuro">
                      24/7
                    </div>
                    <div className="text-xs text-gray-600">Soporte</div>
                  </div>
                </div>
              </div>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">¿Ya tienes cuenta?</p>
                <Link
                  href="/xio-auth/users/login"
                  className="w-full bg-gradient-2 text-white py-2 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 block text-center"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
