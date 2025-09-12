import Link from "next/link";
import { Metadata } from "next";
import {
  FiStar,
  FiHeart,
  FiBook,
  FiShoppingBag,
  FiUser,
  FiAward,
  FiCheck,
  FiArrowRight,
  FiPlay,
  FiMapPin,
  FiMail,
  FiMessageCircle,
} from "react-icons/fi";

export const metadata: Metadata = {
  title:
    "XIOS - Tu Bienestar Integral | Terapia, Spa, Educación y Productos Naturales",
  description:
    "Descubre XIOS: tu centro integral de bienestar con servicios de terapia personalizada, tratamientos de spa, academia educativa y productos naturales. Transforma tu vida con nuestros expertos.",
  keywords:
    "bienestar, terapia, spa, educación, productos naturales, salud mental, relajación, cursos, belleza, wellness",
  openGraph: {
    title: "XIOS - Tu Bienestar Integral",
    description:
      "Centro integral de bienestar con servicios de terapia, spa, educación y productos naturales",
    type: "website",
    locale: "es_ES",
  },
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      {/* Main Content */}
      <main className="min-h-screen">
        {/* Hero Section */}
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video/Image */}
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 0, 0.3), rgba(183, 183, 164, 0.3)), url('/masaje_prenatal.webp')",
              }}
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="flex flex-col justify-center items-center mb-3">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Tu <span className="text-piel-claro">Bienestar</span> Integral
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white">
                Descubre un mundo de servicios diseñados para tu bienestar:
                terapia personalizada, tratamientos de spa, educación
                especializada y productos naturales.
              </p>
            </div>

            <nav className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/xiomarasanchezterapeuta/services-xs"
                className="bg-piel-oscuro hover:bg-piel-claro text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explorar Servicios
              </Link>
              <button className="flex items-center space-x-2 text-white hover:text-piel-claro transition-colors">
                <FiPlay className="w-5 h-5" />
                <span>Ver Video</span>
              </button>
            </nav>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <article className="text-center">
                <div className="text-3xl font-bold text-piel-claro">1000+</div>
                <div className="text-sm opacity-90">Clientes Satisfechos</div>
              </article>
              <article className="text-center">
                <div className="text-3xl font-bold text-piel-claro">30+</div>
                <div className="text-sm opacity-90">Servicios</div>
              </article>
              <article className="text-center">
                <div className="text-3xl font-bold text-piel-claro">5⭐</div>
                <div className="text-sm opacity-90">Soporte</div>
              </article>
              <article className="text-center">
                <div className="text-3xl font-bold text-piel-claro">7/7</div>
                <div className="text-sm opacity-90">Disponibilidad</div>
              </article>
            </div>
          </div>
        </header>

        {/* Services Section */}
        <section id="servicios" className="py-20 ">
          <div className="container mx-auto px-4">
            <div className="flex flex-col justify-center items-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Nuestros Servicios
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cuatro pilares fundamentales para tu bienestar integral
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Terapia */}
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col justify-center items-center">
                <div className="w-16 h-16 bg-verde-gris rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FiHeart className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Terapia
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Sesiones personalizadas de terapia psicológica para tu
                    bienestar mental y emocional.
                  </p>
                  <Link
                    href="/xiomarasanchezterapeuta"
                    className="inline-flex items-center text-verde-oscuro hover:text-piel-oscuro font-semibold transition-colors"
                  >
                    Conocer más <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Spa */}
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col justify-center items-center">
                <div className="w-16 h-16 bg-piel-oscuro rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FiStar className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Spa</h3>
                  <p className="text-gray-600 mb-6">
                    Tratamientos relajantes y rejuvenecedores para cuidar tu
                    cuerpo y mente.
                  </p>
                  <Link
                    href="/xiomarasanchez-spa"
                    className="inline-flex items-center text-verde-oscuro hover:text-piel-oscuro font-semibold transition-colors"
                  >
                    Reservar <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Academia */}
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col justify-center items-center">
                <div className="w-16 h-16 bg-verde-claro rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FiBook className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Academia
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Cursos y talleres especializados para tu crecimiento
                    personal y profesional.
                  </p>
                  <Link
                    href="/xios-academy"
                    className="inline-flex items-center text-verde-oscuro hover:text-piel-oscuro font-semibold transition-colors"
                  >
                    Estudiar <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Productos */}
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col justify-center items-center">
                <div className="w-16 h-16 bg-verde-oscuro rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FiShoppingBag className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Productos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Productos naturales y especializados para complementar tu
                    rutina de bienestar.
                  </p>
                  <Link
                    href="/byxio/products"
                    className="inline-flex items-center text-verde-oscuro hover:text-piel-oscuro font-semibold transition-colors"
                  >
                    Comprar <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-4">
                  <h2 className="text-4xl md:text-5xl italic font-bold text-verde-oscuro mb-6">
                    ¿Por qué elegir{" "}
                    <span className="text-white bg-verde-oscuro rounded-2xl px-2">
                      XIO&apos;S
                    </span>
                    ?
                  </h2>
                  <p className="text-xl mb-8">
                    Somos más que un centro de bienestar. Somos tu aliado
                    integral para una vida plena y saludable.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-verde-oscuro rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <h4 className="text-lg font-semibold mb-2">
                        Profesionales Certificados
                      </h4>
                      <p className="text-start">
                        Equipo de expertos con años de experiencia y
                        certificaciones internacionales.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-verde-oscuro rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Enfoque Integral
                      </h4>
                      <p className="text-start">
                        Combinamos terapia, spa, educación y productos para un
                        bienestar completo.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-verde-oscuro rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Atención Personalizada
                      </h4>
                      <p className="text-start">
                        Cada servicio se adapta a tus necesidades específicas y
                        objetivos personales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  className="w-full h-96 bg-cover bg-center rounded-3xl shadow-2xl"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                  }}
                />
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-piel-oscuro rounded-full flex items-center justify-center">
                      <FiAward className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">
                        98%
                      </div>
                      <div className="text-sm text-gray-600">Satisfacción</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-piel-blanco">
          <div className="container mx-auto px-4">
            <div className="text-center mb-5">
              <h2 className="text-4xl md:text-5xl font-bold italic text-verde-oscuro mb-4">
                Lo que dicen nuestros clientes
              </h2>
              <p className="md:text-xl">
                Testimonios reales de personas que han transformado su bienestar
                con XIO&apos;S
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  &ldquo;Los tratamientos de spa y las sesiones de terapia han
                  cambiado completamente mi perspectiva de vida. Me siento
                  renovada.&rdquo;
                </p>
                <div className="flex justify-center items-center">
                  <div className="w-12 h-12 bg-piel-claro rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-verde-oscuro" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-start">María González</p>
                    <p className="text-sm text-start">Cliente VIP</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className=" mb-6">
                  &ldquo;Los cursos de la academia me han ayudado a crecer
                  profesionalmente. El contenido es excelente y muy
                  práctico.&rdquo;
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-verde-gris rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4 ">
                    <p className="font-semibold text-start">Carlos Rodríguez</p>
                    <p className="text-sm text-start">Estudiante</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="mb-6">
                  &ldquo;Los productos naturales son de excelente calidad.
                  Complementan perfectamente mi rutina de autocuidado.&rdquo;
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-verde-claro rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-start">Ana López</p>
                    <p className="text-sm text-start">Compradora Frecuente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-verde-oscuro text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center justify-center mb-5">
              <h2 className="text-4xl md:text-5xl font-bold text-piel-blanco italic">
                Comienza tu transformación hoy
              </h2>
              <p className="md:text-xl mb-8 max-w-2xl mx-auto opacity-90 text-white">
                No esperes más para invertir en tu bienestar. Únete a miles de
                personas que han encontrado su equilibrio con XIO&apos;S.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/xio-auth/users/register"
                className="bg-white text-verde-oscuro px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Crear Cuenta Gratis
              </Link>
              <Link
                href="/xiomarasanchezterapeuta/services-xs"
                className="border-2 border-white hover:bg-white hover:text-verde-oscuro text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                Escoger terapia
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <header className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Estamos aquí para ti
              </h2>
              <p className="text-xl text-gray-600">
                Contáctanos y comencemos juntos tu camino hacia el bienestar
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <article className="text-center p-6">
                <div className="w-16 h-16 bg-verde-oscuro rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Ubicación
                </h3>
                <address className="text-gray-600 not-italic">
                  Armenia, Quindio, Colombia
                </address>
              </article>

              <article className="text-center p-6">
                <div className="w-16 h-16 bg-verde-oscuro rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold  mb-2">WhatsApp</h3>
                <p className="">
                  <Link
                    href="https://wa.me/573135058584?text=¡Hola!%20Quiero%20más%20información%20sobre%20tus%20servicios"
                    className="hover:text-piel-oscuro transition-colors"
                  >
                    +57 313 505 8584
                  </Link>
                </p>
              </article>

              <article className="text-center p-6">
                <div className="w-16 h-16 bg-verde-oscuro rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold  mb-2">Email</h3>
                <p className="">
                  <a
                    href="mailto:xiosanchezinfo@gmail.com"
                    className="hover:text-piel-oscuro transition-colors"
                  >
                    xiosanchezinfo@gmail.com
                  </a>
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-piel-blanco text-white">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold bg-verde-oscuro w-fit text-center  text-piel-blanco px-2 py-1">
                  XIO&apos;S
                </h3>
                <p className="text-gray-300 text-lg mb-4">
                  Tu centro integral de bienestar
                </p>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                En XIOS creemos que el bienestar es un viaje integral que abarca
                mente, cuerpo y espíritu. Ofrecemos servicios de terapia, spa,
                educación y productos naturales para acompañarte en cada paso
                hacia una vida plena y saludable.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href="#"
                  className="w-10 h-10 bg-piel-oscuro rounded-full flex items-center justify-center hover:bg-piel-claro transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-piel-oscuro rounded-full flex items-center justify-center hover:bg-piel-claro transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-piel-oscuro rounded-full flex items-center justify-center hover:bg-piel-claro transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-piel-oscuro rounded-full flex items-center justify-center hover:bg-piel-claro transition-colors"
                >
                  <span className="sr-only">WhatsApp</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Services */}
            <nav>
              <h4 className="text-lg font-semibold text-verde-oscuro mb-4">
                Nuestros Servicios
              </h4>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <Link
                    href="/xiomarasanchezterapeuta"
                    className="hover:text-piel-claro transition-colors"
                  >
                    Terapia Psicológica
                  </Link>
                </li>
                <li>
                  <Link
                    href="/xiomarasanchez-spa"
                    className="hover:text-piel-claro transition-colors"
                  >
                    Tratamientos de Spa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/xios-academy"
                    className="hover:text-piel-claro transition-colors"
                  >
                    Academia XIOS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/byxio/products"
                    className="hover:text-piel-claro transition-colors"
                  >
                    Productos Naturales
                  </Link>
                </li>
                <li>
                  <Link
                    href="/xiomarasanchezterapeuta/services-xs"
                    className="hover:text-piel-claro transition-colors"
                  >
                    Servicios Especializados
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Quick Links */}
            <nav>
              <h4 className="text-lg font-semibold text-verde-oscuro mb-4">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <Link
                    href="/xiomarasanchezterapeuta/about-me"
                    className="hover:text-piel-claro transition-colors"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/xiomarasanchezterapeuta/contact"
                    className="hover:text-piel-claro transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/xio-auth/users/register"
                    className="hover:text-piel-claro transition-colors"
                  >
                    Crear Cuenta
                  </Link>
                </li>
                <li>
                  <Link
                    href="/xio-auth/users/login"
                    className="hover:text-piel-claro transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    href="/xios-academy/events"
                    className="hover:text-piel-claro transition-colors"
                  >
                    Eventos
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-verde-gris py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
              <div className="mb-4 md:mb-0">
                <p className="">
                  &copy; 2025 XIO&apos;S. Todos los derechos reservados.
                </p>
              </div>
              <nav className="flex space-x-6 text-verde-oscuro">
                <Link
                  href="/privacy"
                  className="hover:text-piel-claro transition-colors"
                >
                  Política de Privacidad
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-piel-claro transition-colors"
                >
                  Términos de Servicio
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-piel-claro transition-colors"
                >
                  Política de Cookies
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
