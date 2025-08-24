import FilterProducts from "@/components/byxio/FilterProducts";
import ProductCard from "@/components/byxio/ProductCard";
import { Metadata } from "next";
import {
  FiGrid,
  FiList,
  FiSearch,
  FiFilter,
  FiTrendingUp,
  FiTag,
  FiStar,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";
import React from "react";
import Link from "next/link";

// 🎯 SEO DINÁMICO: Metadata que cambia según searchParams
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; page?: string };
}): Promise<Metadata> {
  const category = searchParams.category;
  const search = searchParams.search;
  const page = searchParams.page || "1";

  // Base metadata
  let title = "Productos Naturales ByXio | Tienda Online de Bienestar";
  let description =
    "Explora nuestra colección completa de productos naturales para el bienestar: suplementos, aromaterapia, cuidado personal y más.";

  // 🔍 SEO por categoría
  if (category) {
    const categoryTitles: { [key: string]: string } = {
      suplementos: "Suplementos Naturales",
      aromaterapia: "Aromaterapia y Aceites Esenciales",
      "cuidado-personal": "Cuidado Personal Natural",
      cosmetica: "Cosmética Natural",
      aceites: "Aceites Esenciales Premium",
    };

    title = `${categoryTitles[category] || "Productos"} | ByXio Tienda Natural`;
    description = `Descubre nuestra selección de ${categoryTitles[
      category
    ]?.toLowerCase()} naturales de alta calidad. Envío gratis en compras superiores a $100.000`;
  }

  // 🔍 SEO por búsqueda
  if (search) {
    title = `"${search}" - Resultados de Búsqueda | ByXio`;
    description = `Encuentra productos relacionados con "${search}" en nuestra tienda de productos naturales.`;
  }

  // 📄 SEO por página
  if (page !== "1") {
    title = `${title} - Página ${page}`;
  }

  return {
    title,
    description,
    keywords:
      "productos naturales, suplementos, aromaterapia, cuidado personal, tienda online, bienestar, wellness, aceites esenciales",
    openGraph: {
      title,
      description,
      type: "website",
    },
    robots: "index, follow",
    alternates: {
      canonical: `/byxio/products${category ? `?category=${category}` : ""}${
        page !== "1" ? `${category ? "&" : "?"}page=${page}` : ""
      }`,
    },
  };
}

// 🎯 SERVER COMPONENT: Renderizado del lado del servidor para SEO
const Products = async ({
  searchParams,
}: {
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
    sort?: string;
  };
}) => {
  // 📊 SERVER-SIDE DATA FETCHING (opcional)
  // const products = await fetchProducts(searchParams);
  // const categories = await fetchCategories();

  // 🎨 DATOS ESTÁTICOS PARA DEMO (reemplazar con API real)
  const currentCategory = searchParams.category;
  const currentSearch = searchParams.search;
  const currentPage = parseInt(searchParams.page || "1");
  const currentSort = searchParams.sort || "popular";

  // 📈 BREADCRUMBS para SEO
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { name: "Inicio", href: "/" },
      { name: "Productos", href: "/byxio/products" },
    ];
    if (currentCategory) {
      breadcrumbs.push({
        name:
          currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1),
        href: `/byxio/products?category=${currentCategory}`,
      });
    }
    return breadcrumbs;
  };

  return (
    <main className="min-h-screen ">
      {/* 🍞 BREADCRUMBS para SEO */}
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            {getBreadcrumbs().map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <FiChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                )}
                <Link
                  href={item.href}
                  className={
                    index === getBreadcrumbs().length - 1
                      ? "text-piel-oscuro font-semibold"
                      : "text-gray-600 hover:text-piel-oscuro transition-colors"
                  }
                >
                  {index === 0 && <FiHome className="w-4 h-4 mr-1 inline" />}
                  {item.name}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Header Section - Dinámico según filtros */}
      <header className="bg-gradient-2 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {currentCategory ? (
                <>
                  <span className="text-piel-claro">
                    {currentCategory.charAt(0).toUpperCase() +
                      currentCategory.slice(1)}
                  </span>{" "}
                  Naturales
                </>
              ) : currentSearch ? (
                <>
                  Resultados para{" "}
                  <span className="text-piel-claro">
                    &ldquo;{currentSearch}&rdquo;
                  </span>
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <h2 className="bg-gradient-1 w-fit px-2 rounded-2xl text-center text-verde-oscuro">
                    {" "}
                    Nuestros <span className="text-piel-oscuro">Productos</span>
                  </h2>
                </div>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-piel-blanco mb-8 leading-relaxed">
              {currentCategory
                ? `Explora nuestra selección de ${currentCategory} de alta calidad`
                : currentSearch
                ? `Encuentra los mejores productos relacionados con tu búsqueda`
                : "Descubre nuestra colección cuidadosamente seleccionada de productos naturales para tu bienestar integral"}
            </p>

            {/* Search Bar - Con valor inicial si hay búsqueda */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-piel-blanco w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  defaultValue={currentSearch || ""}
                  className="w-full pl-12 pr-4 py-4 rounded-full text-piel-blanco border-1 focus:outline-none focus:ring-2 focus:ring-piel-claro/30 text-lg "
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-piel-claro">500+</div>
                <div className="text-sm opacity-90">Productos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-piel-claro">50+</div>
                <div className="text-sm opacity-90">Categorías</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-piel-claro">4.8⭐</div>
                <div className="text-sm opacity-90">Rating Promedio</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Categories */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center space-x-2 bg-piel-oscuro text-white px-6 py-3 rounded-full hover:bg-verde-oscuro transition-all duration-300 shadow-lg">
              <FiTrendingUp className="w-4 h-4" />
              <span>Más Vendidos</span>
            </button>
            <button className="flex items-center space-x-2 bg-white text-verde-oscuro border-2 border-verde-oscuro px-6 py-3 rounded-full hover:bg-verde-oscuro hover:text-white transition-all duration-300">
              <FiTag className="w-4 h-4" />
              <span>Ofertas</span>
            </button>
            <button className="flex items-center space-x-2 bg-white text-verde-oscuro border-2 border-verde-oscuro px-6 py-3 rounded-full hover:bg-verde-oscuro hover:text-white transition-all duration-300">
              <FiStar className="w-4 h-4" />
              <span>Mejor Valorados</span>
            </button>
            <button className="flex items-center space-x-2 bg-white text-verde-oscuro border-2 border-verde-oscuro px-6 py-3 rounded-full hover:bg-verde-oscuro hover:text-white transition-all duration-300">
              <span>🌿 Orgánicos</span>
            </button>
            <button className="flex items-center space-x-2 bg-white text-verde-oscuro border-2 border-verde-oscuro px-6 py-3 rounded-full hover:bg-verde-oscuro hover:text-white transition-all duration-300">
              <span>💧 Aromaterapia</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <div className="flex items-center space-x-2 mb-6">
                <FiFilter className="w-5 h-5 text-verde-oscuro" />
                <h2 className="text-xl font-semibold text-verde-oscuro">
                  Filtros
                </h2>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Rango de Precio
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
                    />
                    <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
                      Menos de $50.000
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
                    />
                    <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
                      $50.000 - $100.000
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
                    />
                    <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
                      $100.000 - $200.000
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
                    />
                    <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
                      Más de $200.000
                    </span>
                  </label>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-3">Categorías</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
                    />
                    <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
                      Suplementos
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">(45)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
                    />
                    <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
                      Aromaterapia
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">(32)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
                    />
                    <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
                      Cuidado Personal
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">(28)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
                    />
                    <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
                      Aceites Esenciales
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">(15)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
                    />
                    <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
                      Cosmética Natural
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">(22)</span>
                  </label>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Calificación
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
                      />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          y más
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors">
                Limpiar Filtros
              </button>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <FilterProducts />
          </div>

          {/* Products Grid */}
          <section className="flex-1">
            {/* Results Header - Dinámico */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white rounded-xl p-6 shadow-lg">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentCategory
                    ? `${
                        currentCategory.charAt(0).toUpperCase() +
                        currentCategory.slice(1)
                      }`
                    : currentSearch
                    ? `Resultados para "${currentSearch}"`
                    : "Todos los Productos"}
                </h2>
                <p className="text-gray-600">
                  Mostrando {(currentPage - 1) * 24 + 1}-
                  {Math.min(currentPage * 24, 156)} de 156 productos
                  {currentCategory && ` en ${currentCategory}`}
                  {currentPage > 1 && ` - Página ${currentPage}`}
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/* Sort - Con valor actual */}
                <select
                  defaultValue={currentSort}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-piel-oscuro focus:border-transparent"
                >
                  <option>Ordenar por</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Precio: Mayor a Menor</option>
                  <option>Más Populares</option>
                  <option>Mejor Valorados</option>
                  <option>Más Recientes</option>
                </select>

                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button className="p-2 rounded-md bg-white shadow-sm">
                    <FiGrid className="w-4 h-4 text-verde-oscuro" />
                  </button>
                  <button className="p-2 rounded-md">
                    <FiList className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Container */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <ProductCard />
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Anterior
                </button>
                <button className="px-4 py-2 bg-piel-oscuro text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Siguiente
                </button>
              </nav>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Products;
