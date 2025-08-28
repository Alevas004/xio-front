import ProductCard, { Product } from "@/components/byxio/ProductCard";
import { Metadata } from "next";
import {
  FiGrid,
  FiList,
  FiSearch,
  // FiTrendingUp,
  // FiTag,
  // FiStar,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";
import React from "react";
import Link from "next/link";
import SearchBar from "@/components/byxio/SearchBar";
import PaginationButtons from "@/components/byxio/PaginationButtons";
import FilterProducts from "@/components/byxio/FilterProducts";
import almarabyxio from "../../../../public/almarabyxio.webp";
import Image from "next/image";

interface ProductsPageProps {
  searchParams?: Promise<{
    search?: string;
    category?: string;
    page?: string;
    sort?: string;
  }>;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

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
  let title = "Productos Naturales AlmaraByXio | Tienda Online de Bienestar";
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

    title = `${
      categoryTitles[category] || "Productos"
    } | AlmaraByXio Tienda Natural`;
    description = `Descubre nuestra selección de ${categoryTitles[
      category
    ]?.toLowerCase()} naturales de alta calidad. Envío gratis en compras superiores a $150.000`;
  }

  // 🔍 SEO por búsqueda
  if (search) {
    title = `"${search}" - Resultados de Búsqueda | AlmaraByXio`;
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
      canonical: `/almarabyxio/products${
        category ? `?category=${category}` : ""
      }${page !== "1" ? `${category ? "&" : "?"}page=${page}` : ""}`,
    },
  };
}

// 🎯 SERVER COMPONENT: Renderizado del lado del servidor para SEO
const Products = async ({ searchParams }: ProductsPageProps) => {
  // 📊 SERVER-SIDE DATA FETCHING
  const params = await searchParams;

  const currentSearch = params?.search ?? "";
  const currentCategory = params?.category
    ? Array.isArray(params.category)
      ? params.category
      : [params.category]
    : [];
  const currentPage = parseInt(params?.page ?? "1");
  const currentSort = params?.sort ?? "popular";

  const query = new URLSearchParams();

  if (currentSearch) query.set("search", currentSearch);
  currentCategory.forEach((cat) => query.append("category", cat));
  if (currentPage) query.set("page", currentPage.toString());
  if (currentSort) query.set("sort", currentSort);

  let data: { products: Product[]; pagination: PaginationData | null } = {
    products: [],
    pagination: null,
  };

  try {
    const res = await fetch(`${BASE_URL}/byxio/products?${query.toString()}`, {
      cache: "no-store",
    });

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    // Usar datos por defecto en caso de error
  }

  const products: Product[] = data.products || [];
  const pagination: PaginationData | null = data.pagination;

  // 📈 BREADCRUMBS para SEO
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { name: "Inicio", href: "/" },
      { name: "Productos", href: "/almarabyxio/products" },
    ];
    if (currentCategory.length > 0) {
      breadcrumbs.push({
        name:
          currentCategory[0]?.charAt(0).toUpperCase() +
          currentCategory[0]?.slice(1),
        href: `/almarabyxio/products?category=${currentCategory[0]}`,
      });
    }
    return breadcrumbs;
  };

  return (
    <main className="min-h-screen ">
      {/* Header Section - Dinámico según filtros */}
      <header className="bg-black text-white py-10 md:py-8">
      
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mt-10 md:mt-0 ">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {currentCategory.length > 0 ? (
                <div>
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={almarabyxio}
                      alt="almarabyxio-logo"
                      width={200}
                      height={60}
                      className="md:hidden mb-5"
                    />
                  </div>
                  <span className="text-piel-claro">
                    {currentCategory[0]?.charAt(0).toUpperCase() +
                      currentCategory[0]?.slice(1)}
                  </span>{" "}
                  Naturales
                </div>
              ) : currentSearch ? (
                <div>
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={almarabyxio}
                      alt="almarabyxio-logo"
                      width={200}
                      height={60}
                      className="md:hidden mb-5"
                    />
                  </div>
                  Resultados para{" "}
                  <span className="text-piel-claro">
                    &ldquo;{currentSearch}&rdquo;
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={almarabyxio}
                    alt="almarabyxio-logo"
                    width={200}
                    height={60}
                    className="md:hidden mb-8"
                  />
                  <h2 className="bg-gradient-1 w-fit px-2 rounded-2xl text-center text-verde-oscuro">
                    {" "}
                    Nuestros <span className="text-piel-oscuro">Productos</span>
                  </h2>
                </div>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-piel-blanco mb-8 leading-relaxed">
              {currentCategory.length > 0
                ? `Explora nuestra selección de ${currentCategory[0]} de alta calidad`
                : currentSearch
                ? `Encuentra los mejores productos relacionados con tu búsqueda`
                : "Descubre nuestra colección cuidadosamente seleccionada de productos naturales para tu bienestar integral"}
            </p>

            {/* Search Bar - Con valor inicial si hay búsqueda */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-piel-blanco w-5 h-5" />
                <SearchBar
                  initialValue={currentSearch}
                  placeholder="Buscar productos..."
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

      {/* 🍞 BREADCRUMBS para SEO */}
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <ol className="flex items-center justify-center space-x-2 text-sm">
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

      {/* Quick Categories */}
      {/* <section className="py-12 bg-white border-b border-gray-200">
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
      </section> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}

          <FilterProducts
            currentCategory={currentCategory}
            products={products}
          />

          {/* Products Grid */}
          <section className="flex-1">
            {/* Results Header - Dinámico */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white rounded-xl p-6 shadow-lg">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentCategory.length > 0
                    ? `${
                        currentCategory[0]?.charAt(0).toUpperCase() +
                        currentCategory[0]?.slice(1)
                      }`
                    : currentSearch
                    ? `Resultados para "${currentSearch}"`
                    : "Todos los Productos"}
                </h2>
                <p className="text-gray-600">
                  Mostrando {pagination?.currentPage || 1}-
                  {Math.min(pagination?.totalPages || 1)} de{" "}
                  {pagination?.totalItems || products.length} productos
                  {currentCategory.length > 0 && ` en ${currentCategory[0]}`}
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
              <ProductCard products={products} />
            </div>

            {/* Pagination */}
            {pagination && (
              <div className="flex justify-center">
                <PaginationButtons
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Products;
