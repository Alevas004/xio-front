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
import { CategoryWithCount } from "@/components/byxio/FilterCategories";

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
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// 🚀 **SEO ÉPICO MEJORADO** - generateMetadata
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}): Promise<Metadata> {
  // 🔄 Await searchParams (Next.js 15 requirement)
  const params = await searchParams;
  const category = params.category;
  const search = params.search;
  const page = params.page || "1";

  // 📊 Categorías con data rica para SEO
  const categoryData: {
    [key: string]: { title: string; description: string; keywords: string[] };
  } = {
    suplementos: {
      title: "Suplementos Naturales Premium",
      description:
        "Suplementos naturales de alta calidad para tu bienestar. Vitaminas, minerales y extractos naturales con envío gratis. ¡Mejora tu salud naturalmente!",
      keywords: [
        "suplementos naturales",
        "vitaminas",
        "minerales",
        "extractos naturales",
        "salud natural",
      ],
    },
    aromaterapia: {
      title: "Aromaterapia y Aceites Esenciales",
      description:
        "Aceites esenciales puros y productos de aromaterapia. Relájate y equilibra tu energía con nuestros aceites certificados. Calidad garantizada.",
      keywords: [
        "aceites esenciales",
        "aromaterapia",
        "relajación",
        "bienestar",
        "aceites puros",
      ],
    },
    "cuidado-personal": {
      title: "Cuidado Personal Natural",
      description:
        "Productos naturales para el cuidado personal. Cosméticos ecológicos, cremas naturales y productos de higiene sin químicos. Tu piel lo agradecerá.",
      keywords: [
        "cuidado personal natural",
        "cosméticos ecológicos",
        "productos sin químicos",
        "cuidado de la piel",
      ],
    },
    cosmetica: {
      title: "Cosmética Natural y Ecológica",
      description:
        "Cosmética 100% natural y ecológica. Maquillaje vegano, cremas anti-edad naturales y productos de belleza sostenibles. Belleza consciente.",
      keywords: [
        "cosmética natural",
        "maquillaje vegano",
        "belleza ecológica",
        "productos sostenibles",
      ],
    },
    aceites: {
      title: "Aceites Esenciales Premium",
      description:
        "Aceites esenciales de la más alta calidad. Extracción por destilación, certificados orgánicos. Para difusión, masajes y uso terapéutico.",
      keywords: [
        "aceites esenciales premium",
        "aceites orgánicos",
        "aceites terapéuticos",
        "destilación natural",
      ],
    },
  };

  // 🎯 SEO dinámico basado en contexto
  let title =
    "Productos Naturales AlmaraByXio | Tienda Online #1 en Bienestar Natural";
  let description =
    "🌿 Tienda líder en productos naturales de Colombia. Suplementos, aromaterapia, cuidado personal. ✅ Envío gratis ✅ Garantía 30 días ✅ +1000 clientes satisfechos";
  let keywords = [
    "productos naturales colombia",
    "tienda natural online",
    "suplementos naturales",
    "aromaterapia",
    "bienestar natural",
    "almara byxio",
    "envío gratis",
    "productos ecológicos",
  ];

  // 🔍 SEO por categoría (SÚPER OPTIMIZADO)
  if (category && categoryData[category]) {
    const catData = categoryData[category];
    title = `${catData.title} | AlmaraByXio - Envío Gratis`;
    description = catData.description;
    keywords = [...keywords, ...catData.keywords];
  }

  // 🔍 SEO por búsqueda (SÚPER ESPECÍFICO)
  if (search) {
    title = `"${search}" - ${
      search.length > 15 ? "Productos Encontrados" : "Resultados de Búsqueda"
    } | AlmaraByXio`;
    description = `Encontramos productos naturales relacionados con "${search}". Calidad garantizada, envío gratis en compras +$150.000. ¡Descubre lo que buscas!`;
    keywords = [
      ...keywords,
      search.toLowerCase(),
      `comprar ${search}`,
      `${search} natural`,
    ];
  }

  // 📄 SEO por página (MEJORADO)
  if (page !== "1") {
    title = `${title} - Página ${page}`;
    description = `${description} Página ${page} de resultados.`;
  }

  // 🏷️ Keywords optimizadas
  const keywordsString = keywords.join(", ");

  return {
    title,
    description,
    keywords: keywordsString,

    // 🌐 Open Graph ÉPICO
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://tudominio.com/almarabyxio/products${
        category ? `?category=${category}` : ""
      }${page !== "1" ? `${category ? "&" : "?"}page=${page}` : ""}`,
      images: [
        {
          url: "https://tudominio.com/images/og-products-almara.jpg",
          width: 1200,
          height: 630,
          alt: "Productos Naturales AlmaraByXio",
          type: "image/jpeg",
        },
        {
          url: "https://tudominio.com/images/almara-logo.png",
          width: 800,
          height: 600,
          alt: "Logo AlmaraByXio",
        },
      ],
      siteName: "AlmaraByXio",
      locale: "es_CO",
      countryName: "Colombia",
    },

    // 🐦 Twitter Card OPTIMIZADO
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://tudominio.com/images/og-products-almara.jpg"],
      creator: "@almarabyxio",
      site: "@almarabyxio",
    },

    // 🤖 Robots y crawling
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": 160,
        "max-video-preview": 30,
      },
    },

    //  URLs canónicas
    alternates: {
      canonical: `/almarabyxio/products${
        category ? `?category=${category}` : ""
      }${page !== "1" ? `${category ? "&" : "?"}page=${page}` : ""}`,
    },

    // 📊 Metadatos adicionales
    other: {
      "og:locale:alternate": "en_US",
      "fb:app_id": "tu_facebook_app_id",
      "article:author": "AlmaraByXio",
      "article:publisher": "https://facebook.com/almarabyxio",
    },

    // 🏢 Información de la empresa
    applicationName: "AlmaraByXio",
    referrer: "origin-when-cross-origin",
  };
}

// 🎨 Viewport Configuration (separado de metadata)
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#10B981", // verde de la marca
    colorScheme: "light",
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

  let data: { 
    products: Product[]; 
    pagination: PaginationData | null; availableCategories: CategoryWithCount[] | null 
  } = {
    products: [],
    pagination: null,
    availableCategories: null,
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
  const availableCategories: CategoryWithCount[] = data.availableCategories || [];
  console.log(data);
  console.log(availableCategories);

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

  // 🏗️ **JSON-LD STRUCTURED DATA ÉPICO** para la página de productos
  const breadcrumbs = getBreadcrumbs();

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://tudominio.com${crumb.href}`,
    })),
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AlmaraByXio",
    url: "https://tudominio.com",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://tudominio.com/almarabyxio/products?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AlmaraByXio",
    url: "https://tudominio.com",
    logo: "https://tudominio.com/images/almara-logo.png",
    sameAs: [
      "https://facebook.com/almarabyxio",
      "https://instagram.com/almarabyxio",
      "https://twitter.com/almarabyxio",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+57-XXX-XXX-XXXX",
      contactType: "customer service",
      availableLanguage: ["Spanish"],
    },
  };

  const jsonLdItemList =
    products.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          numberOfItems: products.length,
          itemListElement: products.slice(0, 10).map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: product.name,
              description: product.short_description,
              image: product.image?.startsWith("http")
                ? product.image
                : `${BASE_URL}${product.image}`,
              url: `https://tudominio.com/almarabyxio/products/${product.slug}`,
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: "COP",
                availability:
                  product.stock > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
              },
            },
          })),
        }
      : null;

  return (
    <main className="min-h-screen ">
      {/* 🤖 JSON-LD STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      {jsonLdItemList && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
        />
      )}
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
            availableCategories={availableCategories}
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
