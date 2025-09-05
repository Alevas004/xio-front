"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Service } from "@/app/xiomarasanchezterapeuta/services-xs/page";

export interface CategoryWithCount {
  category: string;
  count: number;
}

export interface FilterCategoriesProps {
  initialValue: string | string[];
  services?: Service[];
  closeMenu: () => void;
}

const FilterCategories = ({
  services = [],
  closeMenu,
}: FilterCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Inicializar el estado desde los searchParams cuando el componente se monta
  useEffect(() => {
    const categoryParams = searchParams.getAll("category");
    if (categoryParams.length > 0) {
      setSelectedCategory(categoryParams);
    }
    setIsInitialRender(false);
  }, [searchParams]);

  // Obtener categorías únicas de los servicios reales
  const availableCategories: CategoryWithCount[] = React.useMemo(() => {
    const categoryCount: { [key: string]: number } = {};

    services.forEach((service) => {
      if (service.category) {
        categoryCount[service.category] =
          (categoryCount[service.category] || 0) + 1;
      }
    });

    return Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
    }));
  }, [services]);

  // Navegar solo cuando el usuario cambia las categorías (no en el primer render)
  useEffect(() => {
    if (isInitialRender) {
      return;
    }

    const params = new URLSearchParams();
    selectedCategory.forEach((cat) => params.append("category", cat));
    const queryString = params.toString();

    router.push(
      `/xiomarasanchezterapeuta/services-xs${
        queryString ? `?${queryString}` : ""
      }`
    );
  }, [selectedCategory, router, isInitialRender]);

  const toggleCategory = (category: string) => {
    setSelectedCategory(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // si ya está, quitar
          : [...prev, category] // si no está, agregar
    );
    setTimeout(() => {
      closeMenu();
    }, 500);
  };

  // Usar las categorías reales o fallback si están vacías
  const fallbackCategories = [
    "masaje-prenatal",
    "masaje-terapeutico",
    "drenaje-linfatico",
    "reflexologia",
    "aromaterapia",
  ];

  const categoriesToShow =
    availableCategories.length > 0
      ? availableCategories
      : fallbackCategories.map((cat) => ({ category: cat, count: 0 }));

  const handleCancelFilters = () => {
    setSelectedCategory([]);
    setTimeout(() => {
      closeMenu();
    }, 500);
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-2">
        {categoriesToShow.map((categoryData) => {
          const isSelected = selectedCategory.includes(categoryData.category);

          // Crear un display name más bonito para la categoría
          const displayName =
            categoryData.category
              ?.split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ") || "";

          return (
            <button
              key={categoryData.category}
              onClick={() => toggleCategory(categoryData.category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  isSelected
                    ? "bg-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700"
                }
              `}
            >
              {displayName}
              <span className="ml-2 text-xs opacity-75">
                ({categoryData.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Clear Filters - Solo mostrar si hay filtros activos */}
      {selectedCategory.length > 0 && (
        <button
          className="text-lg bg-white border-1 border-purple-300 p-2 rounded-full text-purple-600 hover:text-purple-800"
          onClick={handleCancelFilters}
        >
          Limpiar filtros ({selectedCategory.length})
        </button>
      )}
    </div>
  );
};

export default FilterCategories;
