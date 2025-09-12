"use client";

import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import FilterCategories, { CategoryWithCount } from "./FilterCategories";
import useWindowSize from "@/hooks/useWindowSize";
import { CgClose } from "react-icons/cg";

interface FilterProductsProps {
  currentCategory: string[];
  availableCategories: CategoryWithCount[];
}

const FilterProducts = ({
  currentCategory,
  availableCategories,
}: FilterProductsProps) => {
  const [openMenu, setOpenMenu] = useState(false);

  const width = useWindowSize();

  const isMobile = (width ?? 0) < 768;

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {isMobile ? (
        <div className="fixed bottom-0 left-0 transition-transform duration-300 z-40 mx-auto  ">
          <div className="relative max-w-full w-full">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="absolute bottom-30 left-4 md:top-25 md:left-10 z-50 bg-black p-2 rounded-full shadow-m"
            >
              <FiFilter size={30} color="white" />
            </button>
            {openMenu && (
              <div
                className="fixed inset-0 w-full h-full bg-black/30"
                onClick={handleCloseMenu}
              >
                <div>
                  <div
                    className="absolute top-90 md:top-10 left-10 w-80 z-40"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg relative">
                      <button
                        className="absolute top-2 right-2 text-verde-claro hover:text-verde-oscuro"
                        onClick={handleCloseMenu}
                      >
                        <CgClose size={30} />
                      </button>
                      <div className="flex items-center space-x-2 mb-6">
                        <FiFilter className="w-5 h-5 text-verde-oscuro" />
                        <h2 className="text-xl font-semibold text-verde-oscuro">
                          Filtros
                        </h2>
                      </div>

                      {/* Categories */}
                      <div className="mb-8">
                        <h3 className="font-semibold text-gray-800 mb-3">
                          Categorías
                        </h3>
                        <FilterCategories
                          initialValue={currentCategory}
                          closeMenu={handleCloseMenu}
                          availableCategories={availableCategories}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <aside className="lg:block w-80 flex-shrink-0 md:flex md:flex-col md:justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
            <div className="flex items-center space-x-2 mb-6">
              <FiFilter className="w-5 h-5 text-verde-oscuro" />
              <h2 className="text-xl font-semibold text-verde-oscuro">
                Filtros
              </h2>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">Categorías</h3>
              <FilterCategories
                initialValue={currentCategory}
                closeMenu={() => {}}
                availableCategories={availableCategories}
              />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default FilterProducts;
