"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Product } from "./ProductCardHome";

export interface FilterCategoriesProps {
  initialValue: string | string[];
  products?: Product[];
  closeMenu: () => void;
}

const FilterCategories = ({
  initialValue = "",
  products = [],
  closeMenu
}: FilterCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    Array.isArray(initialValue)
      ? initialValue
      : initialValue
      ? [initialValue]
      : []
  );

  const router = useRouter();
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Evitar navegación en el primer render
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const params = new URLSearchParams();
    selectedCategory.forEach((cat) => params.append("category", cat));
    const queryString = params.toString();

    router.push(`/almarabyxio/products${queryString ? `?${queryString}` : ""}`);
  }, [selectedCategory, router, isInitialRender]);

  const toggleCategory = (category: string) => {
    setSelectedCategory(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // si ya está, quitar
          : [...prev, category] // si no está, agregar
    );
  };

  // Extraer categorías únicas FUERA del map
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  // Fallback de categorías si no hay productos o categorías vacías
  const fallbackCategories = [
    "suplementos",
    "aromaterapia",
    "cuidado-personal",
    "cosmetica",
    "aceites",
  ];
  const categoriesToShow =
    uniqueCategories.length > 0 ? uniqueCategories : fallbackCategories;

    const handleCancelFilters = () => {
      setSelectedCategory([]);
      setTimeout(() => {
        closeMenu();
      }, 500);
    };

  return (
    <div className="space-y-3">
      {categoriesToShow.map((category) => {
        // Contar cuántos productos hay por categoría
        const categoryCount = products.filter(
          (p) => p.category === category
        ).length;

        return (
          <label
            key={category}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
              checked={selectedCategory.includes(category)}
              onChange={() => toggleCategory(category)}
            />
            <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
              {category?.charAt(0).toUpperCase() + category?.slice(1)}
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              ({uniqueCategories.length > 0 ? categoryCount : "0"})
            </span>
          </label>
        );
      })}
      {/* Clear Filters */}
      <button
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
        onClick={handleCancelFilters}
      >
        Limpiar Filtros
      </button>
    </div>
  );
};

export default FilterCategories;
