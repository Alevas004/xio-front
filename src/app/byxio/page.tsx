import ProductCardHome from "@/components/byxio/ProductCardHome";
import ProductCard from "@/components/byxio/ProductCardHome";
import Image from "next/image";
import Link from "next/link";

export default function HomeEcommerce() {
  return (
    <main className="bg-verde-oscuro text-verde-oscuro">
      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-6">
        <Image
          src="/byxio.webp"
          alt="Productos de bienestar Xiomara"
          fill
          className="object-cover"
        />
        <div className="absolute bg-black/50 p-8 rounded-xl">
          <h1 className="text-4xl md:text-6xl text-piel-blanco italic">
            Bienestar que se siente
          </h1>
          <p className="mt-4 text-lg text-piel-claro">
            Descubre productos que elevan tu energía y cuidan de ti.
          </p>
          <Link
            href="/byxio/products"
            className="mt-6 inline-block bg-verde-oscuro text-piel-blanco px-6 py-3 font-bold rounded-full hover:bg-piel-claro hover:text-verde-oscuro transition-all"
          >
            Comprar ahora
          </Link>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl text-center text-piel-blanco italic">
          Productos Destacados
        </h2>
        <div className="mt-6">
          <ProductCardHome />
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-piel-blanco py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div>
            <span className="text-3xl md:text-6xl">🚚</span>
            <h4 className="font-semibold mt-2 md:text-lg">Envíos rápidos</h4>
          </div>
          <div>
            <span className="text-3xl md:text-6xl">🔒</span>
            <h4 className="font-semibold mt-2 md:text-lg">Pago seguro</h4>
          </div>
          <div>
            <span className="text-3xl md:text-6xl">🌿</span>
            <h4 className="font-semibold mt-2 md:text-lg">Productos certificados</h4>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 text-center">
        <h3 className="text-3xl text-piel-blanco">Vive tu bienestar hoy mismo</h3>
        <Link
          href="/byxio/products"
          className="mt-6 inline-block bg-piel-oscuro text-piel-blanco font-bold px-6 py-3 rounded-full hover:bg-verde-claro transition-all"
        >
          Ver tienda
        </Link>
      </section>
    </main>
  );
}
