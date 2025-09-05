import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  FiTruck,
  FiShield,
  FiAward,
  FiStar,
  FiUsers,
  FiGift,
  FiHeart,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";
import { PaginationData } from "./products/page";
import { Product } from "@/components/byxio/ProductCard";
import ProductCardHome from "@/components/byxio/ProductCardHome";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const metadata: Metadata = {
  title: "ByXio - Productos Naturales de Bienestar | Ecommerce Especializado",
  description:
    "Descubre ByXio: tu tienda online de productos naturales para el bienestar. Suplementos, cuidado personal, aromaterpia y más. Envío rápido y productos certificados.",
  keywords:
    "productos naturales, bienestar, suplementos, aromaterpia, cuidado personal, tienda online, ecommerce, salud natural, wellness",
  openGraph: {
    title: "ByXio - Productos Naturales de Bienestar",
    description:
      "Tu tienda online especializada en productos naturales para el bienestar integral",
    type: "website",
    locale: "es_ES",
  },
  robots: "index, follow",
  alternates: {
    canonical: "/byxio",
  },
};

export default async function HomeEcommerce() {
  let data: { products: Product[]; pagination: PaginationData | null } = {
    products: [],
    pagination: null,
  };

  try {
    const res = await fetch(`${BASE_URL}/byxio/products`, {
      cache: "no-store",
    });

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.log(error);
  }

  const products: Product[] = data?.products || [];

  return (
    <main className="bg-gradient-2 text-verde-oscuro">
      {/* HERO */}
      <header className="relative h-[80vh] flex items-center justify-center text-center px-6">
        <Image
          src="/byxio.webp"
          alt="Productos de bienestar Xiomara - ByXio tienda natural"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-10 md:hidden">
            <img src="./almarabyxio.webp" alt="almarabyxio-logo" />
          </div>
          <h1 className="text-4xl md:text-7xl text-white font-bold mb-4 italic">
            <span className=" text-verde-oscuro bg-white px-2 rounded-2xl">
              Bienestar
            </span>{" "}
            que se siente
          </h1>
          <p className="text-xl md:text-2xl text-piel-blanco mb-8 leading-relaxed">
            Descubre productos naturales que elevan tu energía y cuidan de ti.
            Calidad premium, resultados reales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/almarabyxio/products"
              className="bg-white text-verde-oscuro px-8 py-4 font-bold rounded-full hover:bg-piel-blanco hover:text-verde-oscuro transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explorar Productos
            </Link>
            <Link
              href="/almarabyxio/products"
              className="border-2 border-piel-blanco text-piel-blanco px-8 py-4 font-semibold rounded-full hover:bg-verde-oscuro hover:text-white transition-all duration-300"
            >
              Ver Destacados
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-piel-claro">500+</div>
              <div className="text-sm text-piel-blanco opacity-90">
                Productos
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-piel-claro">1000+</div>
              <div className="text-sm text-piel-blanco opacity-90">
                Clientes
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-piel-claro">5⭐</div>
              <div className="text-sm text-piel-blanco opacity-90">Rating</div>
            </div>
          </div>
        </div>
      </header>

      {/* CATEGORÍAS PRINCIPALES */}
      <section className="py-15 bg-gradient-2">
        <div className="max-w-6xl mx-auto px-6">
          <header className="text-center mb-10 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl text-white font-bold mb-4 italic">
              Nuestras Categorías
            </h2>
            <p className="text-xl text-piel-blanco bg-verde-oscuro w-fit px-2 rounded-2xl">
              Encuentra exactamente lo que necesitas para tu bienestar
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <article className="bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-verde-oscuro rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FiStar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-verde-oscuro mb-2">
                Suplementos
              </h3>
              <p className="text-gray-600 mb-4">
                Vitaminas y minerales naturales
              </p>
              <Link
                href="/almarabyxio/products?category=suplementos"
                className="text-piel-oscuro hover:text-verde-oscuro font-medium"
              >
                Ver productos →
              </Link>
            </article>

            <article className="bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-verde-oscuro rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FiHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-verde-oscuro mb-2">
                Cuidado Personal
              </h3>
              <p className="text-gray-600 mb-4">
                Productos para tu rutina diaria
              </p>
              <Link
                href="/almarabyxio/products?category=cuidado+de+la+piel"
                className="text-piel-oscuro hover:text-verde-oscuro font-medium"
              >
                Ver productos →
              </Link>
            </article>

            <article className="bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-verde-oscuro rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FiGift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-verde-oscuro mb-2">
                Aromaterapia
              </h3>
              <p className="text-gray-600 mb-4">
                Aceites esenciales y difusores
              </p>
              <Link
                href="/almarabyxio/products?category=aromaterapia"
                className="text-piel-oscuro hover:text-verde-oscuro font-medium"
              >
                Ver productos →
              </Link>
            </article>

            <article className="bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-verde-oscuro rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FiAward className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-verde-oscuro mb-2">
                Premium
              </h3>
              <p className="text-gray-600 mb-4">
                Productos exclusivos y de lujo
              </p>
              <Link
                href="/almarabyxio/products?category=premium"
                className="text-piel-oscuro hover:text-verde-oscuro font-medium"
              >
                Ver productos →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section id="destacados" className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-verde-oscuro font-bold mb-4 italic">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600">
              Los favoritos de nuestros clientes
            </p>
          </header>
          <div className="mt-6">
            <ProductCardHome products={products} />
          </div>
          <div className="text-center mt-12">
            <Link
              href="/almarabyxio/products"
              className="inline-flex items-center bg-gradient-2 text-white px-8 py-4 font-semibold rounded-full hover:bg-piel-oscuro transition-all duration-300 shadow-lg"
            >
              Ver todos los productos
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white font-bold italic mb-4">
              ¿Por qué elegir ByXio?
            </h2>
            <p className="text-xl text-piel-blanco">
              Más que una tienda, somos tu aliado en el bienestar
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-verde-gris rounded-full flex items-center justify-center mx-auto mb-6">
                <FiTruck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-verde-oscuro mb-4">
                Envíos Rápidos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Recibe tus productos en 24-48 horas. Envío gratis en compras
                superiores a $100.000
              </p>
            </article>

            <article className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-verde-claro rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-verde-oscuro mb-4">
                Pago Seguro
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Protegemos tus datos con la más alta seguridad. Múltiples
                métodos de pago disponibles.
              </p>
            </article>

            <article className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-verde-claro rounded-full flex items-center justify-center mx-auto mb-6">
                <FiStar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-verde-oscuro mb-4">
                Productos Certificados
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Todos nuestros productos están certificados y pasan estrictos
                controles de calidad.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 bg-[#fdf4ee]">
        <div className="max-w-6xl mx-auto px-6">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-verde-oscuro font-bold mb-4 italic">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600">
              Testimonios reales de personas satisfechas
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-gray-600 mb-6 leading-relaxed">
                &ldquo;Los suplementos de ByXio han mejorado mi energía
                notablemente. La calidad es excepcional y el servicio
                impecable.&rdquo;
              </blockquote>
              <footer className="flex items-center">
                <div className="w-12 h-12 bg-piel-claro rounded-full flex items-center justify-center">
                  <FiUsers className="w-6 h-6 text-verde-oscuro" />
                </div>
                <div className="ml-4 flex flex-col items-start">
                  <cite className="font-semibold text-verde-oscuro not-italic text-start">
                    Ana María
                  </cite>
                  <p className="text-sm text-gray-500">Cliente frecuente</p>
                </div>
              </footer>
            </article>

            <article className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-gray-600 mb-6 leading-relaxed">
                &ldquo;La aromaterapia que compré aquí ha transformado mi hogar.
                Los aceites son puros y de excelente calidad.&rdquo;
              </blockquote>
              <footer className="flex items-center">
                <div className="w-12 h-12 bg-verde-gris rounded-full flex items-center justify-center">
                  <FiUsers className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 flex flex-col items-start">
                  <cite className="font-semibold text-verde-oscuro not-italic text-start">
                    Carlos López
                  </cite>
                  <p className="text-sm text-gray-500">Comprador verificado</p>
                </div>
              </footer>
            </article>

            <article className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-gray-600 mb-6 leading-relaxed">
                &ldquo;Envío súper rápido y productos llegaron en perfectas
                condiciones. Definitivamente mi tienda de confianza.&rdquo;
              </blockquote>
              <footer className="flex items-center">
                <div className="w-12 h-12 bg-verde-claro rounded-full flex items-center justify-center">
                  <FiUsers className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 flex flex-col items-start">
                  <cite className="font-semibold text-verde-oscuro not-italic">
                    Sofía García
                  </cite>
                  <p className="text-sm text-gray-500">Cliente VIP</p>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 text-center border-t border-verde-gris">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center mb-3">
            <h2 className="text-4xl md:text-5xl text-white font-bold mb-6 italic">
              Vive tu bienestar hoy mismo
            </h2>
            <p className="text-xl text-piel-blanco bg-verde-oscuro px-2 rounded-2xl">
              No esperes más para invertir en tu salud y bienestar. Miles de
              clientes ya confían en nosotros.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/almarabyxio/products"
              className="inline-flex items-center bg-white text-verde-oscuro font-bold px-8 py-4 rounded-full hover:bg-verde-claro hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FiShoppingBag className="mr-2 w-5 h-5" />
              Explorar Tienda
            </Link>
            <Link
              href="/xio-auth/users/register"
              className="border-2 border-piel-blanco text-piel-blanco px-8 py-4 font-semibold rounded-full hover:bg-white hover:text-verde-oscuro transition-all duration-300"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
