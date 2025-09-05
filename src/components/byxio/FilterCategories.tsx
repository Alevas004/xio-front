"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface CategoryWithCount {
  category: string;
  count: number;
}

export interface FilterCategoriesProps {
  initialValue: string | string[];
  closeMenu: () => void;
  availableCategories: CategoryWithCount[];
}

const FilterCategories = ({
  initialValue = "",
  closeMenu,
  availableCategories = [],
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
     setTimeout(() => {
      closeMenu();
    }, 500);
  };

  // Fallback de categorías si no hay productos o categorías vacías
  const fallbackCategories = [
    "suplementos",
    "aromaterapia",
    "cuidado-personal",
    "cosmetica",
    "aceites",
  ];
  const categoriesToShow =
    availableCategories.length > 0
      ? availableCategories
      : fallbackCategories.map((cat) => ({ category: cat, count: 0 })); // ✨ TRANSFORMAR FALLBACK

  const handleCancelFilters = () => {
    setSelectedCategory([]);
    setTimeout(() => {
      closeMenu();
    }, 500);
  };

  return (
    <div className="space-y-3">
      {categoriesToShow.map((categoryData) => {
      

        return (
          <label
            key={categoryData.category}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-piel-oscuro rounded border-gray-300 focus:ring-piel-oscuro"
              checked={selectedCategory.includes(categoryData.category)}
              onChange={() => toggleCategory(categoryData.category)}
             
            />
            <span className="text-gray-600 group-hover:text-verde-oscuro transition-colors">
              {categoryData.category?.charAt(0).toUpperCase() + categoryData.category?.slice(1)}
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              ({categoryData.count})
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
