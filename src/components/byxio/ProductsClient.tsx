"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

interface ProductsClientProps {
  initialCategory?: string;
  initialSearch?: string;
  initialPage?: number;
  initialSort?: string;
}

export default function ProductsClient({
  initialCategory,
  initialSearch,
  initialPage = 1,
  initialSort = "popular",
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🎯 ESTADO LOCAL para interactividad inmediata
  const [filters, setFilters] = useState({
    search: initialSearch || "",
    category: initialCategory || "",
    page: initialPage,
    sort: initialSort,
    priceRange: "",
    rating: "",
  });

  // 🔄 FUNCIÓN para actualizar URL manteniendo SEO
  const updateURL = useCallback(
    (newFilters: typeof filters) => {
      const params = new URLSearchParams();

      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.page > 1) params.set("page", newFilters.page.toString());
      if (newFilters.sort !== "popular") params.set("sort", newFilters.sort);
      if (newFilters.priceRange) params.set("price", newFilters.priceRange);
      if (newFilters.rating) params.set("rating", newFilters.rating);

      const newURL = `/byxio/products${
        params.toString() ? "?" + params.toString() : ""
      }`;

      // 🎯 USAR REPLACE para filtros inmediatos, PUSH para navegación
      if (newFilters.page !== filters.page) {
        router.push(newURL); // Nueva página = nueva entrada en historial
      } else {
        router.replace(newURL); // Filtros = reemplazar URL actual
      }
    },
    [router, filters.page]
  );

  // 🔍 BÚSQUEDA con debounce para SEO
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchValue !== filters.search) {
        const newFilters = { ...filters, search: searchValue, page: 1 };
        setFilters(newFilters);
        updateURL(newFilters);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchValue, filters, updateURL]);

  // 🎛️ HANDLERS para cada tipo de filtro
  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, category, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleSortChange = (sort: string) => {
    const newFilters = { ...filters, sort, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    updateURL(newFilters);

    // 📜 SCROLL al top suavemente
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePriceFilter = (priceRange: string) => {
    const newFilters = { ...filters, priceRange, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      search: "",
      category: "",
      page: 1,
      sort: "popular",
      priceRange: "",
      rating: "",
    };
    setFilters(newFilters);
    setSearchValue("");
    updateURL(newFilters);
  };

  return {
    // 📊 ESTADO ACTUAL
    filters,
    searchValue,

    // 🎛️ HANDLERS
    setSearchValue,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
    handlePriceFilter,
    clearFilters,

    // 🔧 UTILIDADES
    updateURL,
  };
}

// 🎯 HOOK PERSONALIZADO para usar en componentes
export function useProductFilters(initialProps: ProductsClientProps) {
  return ProductsClient(initialProps);
}
