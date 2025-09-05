"use client";
import { FaFilter } from "react-icons/fa6";
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import useWindowSize from "@/hooks/useWindowSize";
import { CgClose } from "react-icons/cg";
import { Service } from "@/app/xiomarasanchezterapeuta/services-xs/page";
import FilterCategories from "./FilterCategories";

interface FilterServicesProps {
  services: Service[];
}

const FilterServices = ({ services }: FilterServicesProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const width = useWindowSize();
  const isMobile = (width ?? 0) < 768;

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 mt-2">
      {isMobile ? (
        <div className="fixed bottom-30 left-4 z-40">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className=" bg-purple-600 hover:bg-purple-700 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            <FaFilter size={20} color="white" />
          </button>

          {openMenu && (
            <div
              className="fixed inset-0 w-full h-full bg-black/50 z-50"
              onClick={handleCloseMenu}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 max-w-[90vw]">
                <div
                  className="bg-white rounded-2xl p-6 shadow-2xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={handleCloseMenu}
                  >
                    <CgClose size={24} />
                  </button>

                  <div className="flex items-center space-x-2 mb-6">
                    <FiFilter className="w-5 h-5 text-purple-600" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Filtrar Servicios
                    </h2>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-3">
                      Categorías
                    </h3>
                    <FilterCategories
                      initialValue={[]}
                      services={services}
                      closeMenu={handleCloseMenu}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Desktop filters - Horizontal layout
        <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <FiFilter className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Filtrar por Categoría
              </h3>
            </div>

            {/* Categories horizontally for desktop */}
            <div className="flex-1 max-w-2xl">
              <FilterCategories
                initialValue={[]}
                services={services}
                closeMenu={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterServices;
