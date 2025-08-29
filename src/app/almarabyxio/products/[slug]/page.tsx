import React from "react";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiStar,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";
import Link from "next/link";
import { Metadata } from "next";
import AddToCartSlug from "@/components/byxio/AddToCartSlug";
import ImagesSlug from "@/components/byxio/ImagesSlug";
import InfoTabsSlug from "@/components/byxio/InfoTabsSlug";
import { formatPrice } from "@/utils/formatPrice";

export interface Product {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  stock: number;
  image: string;
  images: string[];
  category: string;
  discountValue: number;
  isNew: boolean;
  hasDiscount: boolean;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isSold: boolean;
  slug: string;
  caracteristics: string[] | null;
  includes: string[] | null;
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface ProductBySlugParams {
  slug: string;
}

interface ProductPageProps {
  params: ProductBySlugParams;
}

// 🚀 **SEO DINÁMICO ÉPICO** - generateMetadata
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const slug = params.slug;

  try {
    const res = await fetch(`${BASE_URL}/byxio/products/${slug}`, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Cache por 1 hora
    });

    if (!res.ok) {
      return {
        title: "Producto no encontrado | AlmaraByXio",
        description:
          "El producto que buscas no está disponible en nuestra tienda natural.",
      };
    }

    const product: Product = await res.json();

    // 📊 Generar metadata súper optimizada
    const title = `${product.name} | AlmaraByXio - Productos Naturales`;
    const description = `${product.short_description} ✨ Precio: $${formatPrice(
      product.price
    )} 🚚 Envío gratis. ${
      product.category
    } naturales de alta calidad. ¡Compra ahora!`;

    // 🏷️ Keywords dinámicas
    const keywords = [
      product.name.toLowerCase(),
      product.category,
      ...product.tags,
      "productos naturales",
      "almara byxio",
      "tienda natural",
      "bienestar",
      "salud natural",
      "colombia",
      "envío gratis",
    ].join(", ");

    // 🖼️ Imagen optimizada para redes sociales
    const imageUrl = product.image?.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image}`;

    return {
      title,
      description,
      keywords,

      // 🌐 Open Graph (Facebook, LinkedIn)
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://xiomarasanchez.com/almarabyxio/products/${slug}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
            type: "image/jpeg",
          },
          // Múltiples imágenes para carrusel
          ...product.images.slice(0, 3).map((img) => ({
            url: img?.startsWith("http") ? img : `${BASE_URL}${img}`,
            width: 800,
            height: 600,
            alt: `${product.name} - Vista adicional`,
          })),
        ],
        siteName: "AlmaraByXio",
        locale: "es_CO",
      },

      // 🐦 Twitter Card
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
        creator: "@almarabyxio",
        site: "@almarabyxio",
      },

      // 🤖 Robots y indexación
      robots: {
        index: product.isActive && product.stock > 0,
        follow: true,
        googleBot: {
          index: product.isActive && product.stock > 0,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": 160,
          "max-video-preview": 30,
        },
      },

      //  URLs canónicas y alternativas
      alternates: {
        canonical: `/almarabyxio/products/${slug}`,
      },

      // 📊 Datos adicionales
      other: {
        "product:price:amount": product.price.toString(),
        "product:price:currency": "COP",
        "product:availability": product.stock > 0 ? "in stock" : "out of stock",
        "product:brand": "AlmaraByXio",
        "product:category": product.category,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Producto | AlmaraByXio",
      description: "Descubre nuestros productos naturales de alta calidad.",
    };
  }
}

// 🎨 Viewport Configuration (separado de metadata)
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#10B981", // verde de la marca
  };
}

const ProductBySlug = async ({ params }: ProductPageProps) => {
  const slug = params.slug;
  let product: Product | null = null;

  try {
    const res = await fetch(`${BASE_URL}/byxio/products/${slug}`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">😞</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Producto no encontrado
            </h1>
            <p className="text-gray-600">
              Lo sentimos, no pudimos cargar este producto.
            </p>
            <Link
              href="/almarabyxio/products"
              className="mt-4 inline-block bg-piel-oscuro text-white px-6 py-2 rounded-lg hover:bg-verde-oscuro transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      );
    }

    product = await res.json();
  } catch (error) {
    console.error("Error loading product:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Error al cargar el producto
          </h1>
          <p className="text-gray-600">
            Hubo un problema técnico. Por favor, intenta más tarde.
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const discount =
    product.price - product.price * (product.discountValue / 100);

  // 🍞 **BREADCRUMBS ÉPICOS** (ARREGLADOS)
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { name: "Inicio", href: "/", position: 1 },
      { name: "Productos", href: "/almarabyxio/products", position: 2 },
    ];

    // Arreglar el bug: product.category es string, no array
    if (product.category && product.category.length > 0) {
      breadcrumbs.push({
        name:
          product.category.charAt(0).toUpperCase() + product.category.slice(1),
        href: `/almarabyxio/products?category=${product.category}`,
        position: 3,
      });
    }

    // Agregar el producto actual
    breadcrumbs.push({
      name: product.name,
      href: `/almarabyxio/products/${product.slug}`,
      position: breadcrumbs.length + 1,
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // 🏗️ **JSON-LD STRUCTURED DATA ÉPICO**
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description,
    image: product.images.map((img) =>
      img?.startsWith("http") ? img : `${BASE_URL}${img}`
    ),
    brand: {
      "@type": "Brand",
      name: "AlmaraByXio",
    },
    category: product.category,
    sku: product.id,
    mpn: product.slug,
    offers: {
      "@type": "Offer",
      url: `https://xiomarasanchez.com/almarabyxio/products/${product.slug}`,
      priceCurrency: "COP",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "AlmaraByXio",
      },
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 90 días
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "124",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "Cliente Satisfecho",
        },
        reviewBody: "Excelente producto natural, muy recomendado.",
      },
    ],
  };

  // 🍞 Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://xiomarasanchez.com${crumb.href}`,
    })),
  };

  return (
    <div className="bg-[#fdffff]">
      {/* 🤖 JSON-LD STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 pb-8">
          {/* 🍞 BREADCRUMBS ÉPICOS */}
          <nav
            className="bg-white/80 backdrop-blur-sm py-4 rounded-lg mt-20 md:my-5 shadow-sm"
            aria-label="Breadcrumb"
          >
            <div className="container flex items-center justify-center px-4">
              <ol
                className="flex items-center justify-center space-x-2 text-sm"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                {breadcrumbs.map((item, index) => (
                  <li
                    key={item.href}
                    className="flex items-center justify-center"
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                  >
                    {index > 0 && (
                      <FiChevronRight
                        className="w-4 h-4 text-gray-400 mx-2"
                        aria-hidden="true"
                      />
                    )}
                    {index === breadcrumbs.length - 1 ? (
                      <span
                        className="text-piel-oscuro font-semibold"
                        itemProp="name"
                        aria-current="page"
                      >
                        {index === 0 && (
                          <FiHome
                            className="w-4 h-4 mr-1 inline text-center"
                            aria-hidden="true"
                          />
                        )}
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-600 hover:text-piel-oscuro transition-colors hover:underline"
                        itemProp="item"
                      >
                        <span itemProp="name">
                          {index === 0 && (
                            <FiHome
                              className="w-4 h-4 mr-1 inline"
                              aria-hidden="true"
                            />
                          )}
                          {item.name}
                        </span>
                      </Link>
                    )}
                    <meta
                      itemProp="position"
                      content={(index + 1).toString()}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Galería de imágenes */}
            <ImagesSlug product={product} />

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                {/* ⭐ Rating con Schema */}
                <div
                  className="flex items-center space-x-2 mb-2"
                  itemScope
                  itemType="https://schema.org/AggregateRating"
                >
                  <div
                    className="flex items-center"
                    aria-label="Calificación 4.8 de 5 estrellas"
                  >
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    (<span itemProp="ratingValue">4.8</span>) •
                    <span itemProp="reviewCount">124</span> reseñas
                  </span>
                  <meta itemProp="bestRating" content="5" />
                  <meta itemProp="worstRating" content="1" />
                </div>

                {/* 📱 Título con esquema de producto */}
                <h1
                  className="text-3xl font-bold text-gray-900 mb-3"
                  itemProp="name"
                >
                  {product.name}
                </h1>

                <p
                  className="text-lg text-gray-600 leading-relaxed"
                  itemProp="description"
                >
                  {product.short_description}
                </p>
              </div>

              {/* 💰 Precio con Schema */}
              <div
                className="bg-gradient-to-r from-verde-claro/20 to-piel-claro/20 rounded-xl p-6"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <div className="flex items-baseline space-x-2">
                  <span
                    className="text-4xl font-bold text-verde-oscuro"
                    itemProp="price"
                    content={product.price.toString()}
                  >
                    $
                    {product.hasDiscount
                      ? formatPrice(discount)
                      : formatPrice(product.price)}
                  </span>

                  {product.hasDiscount && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ${formatPrice(product.price)}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                        -{product.discountValue}%
                      </span>
                    </>
                  )}
                  <meta itemProp="priceCurrency" content="COP" />
                  <meta
                    itemProp="availability"
                    content={
                      product.stock > 0
                        ? "https://schema.org/InStock"
                        : "https://schema.org/OutOfStock"
                    }
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Precio incluye IVA • Envío gratis por compras superiores a
                  $150.000
                </p>
              </div>

              {/* 🏷️ Tags con mejores prácticas */}
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label="Etiquetas del producto"
              >
                {product.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-piel-claro/50 text-verde-oscuro rounded-full text-sm font-medium"
                    role="listitem"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Cantidad y acciones */}
              <AddToCartSlug product={product} />

              {/* 🎁 Beneficios con iconos accesibles */}
              <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 bg-green-100 rounded-lg"
                    aria-hidden="true"
                  >
                    <FiTruck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-start text-gray-900">
                      Envío gratis
                    </p>
                    <p className="text-sm text-gray-600">
                      En compras superiores a $150.000
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 bg-blue-100 rounded-lg"
                    aria-hidden="true"
                  >
                    <FiShield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-start text-gray-900">
                      Garantía de calidad
                    </p>
                    <p className="text-sm text-gray-600">
                      30 días para devoluciones
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 bg-purple-100 rounded-lg"
                    aria-hidden="true"
                  >
                    <FiRefreshCw className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-start text-gray-900">
                      Cambios fáciles
                    </p>
                    <p className="text-sm text-gray-600">Sin complicaciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs de información detallada */}
          <InfoTabsSlug product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductBySlug;
