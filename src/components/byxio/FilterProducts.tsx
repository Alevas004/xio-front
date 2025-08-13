'use client'
import { FaFilter } from "react-icons/fa6";

import React, { useState } from "react";

const FilterProducts = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div>
      <button onClick={() => setOpenMenu(!openMenu)} className="fixed top-30 left-4 z-50 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition-colors duration-300">
        <FaFilter size={24} />
      </button>
      {openMenu && (
        <section className="fixed top-30 left-15 bg-gray-100 p-4 z-10">
          <p>Filtrar por</p>
          <ul>
            <li>
              <button>Aceites</button>
            </li>
            <li>
              <button>Camisas</button>
            </li>
            <li>
              <button>Pantalones</button>
            </li>
            <li>
              <button>Medias</button>
            </li>
            <li>
              <button>Camisas</button>
            </li>
            <li>
              <button>Pantalones</button>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
};

export default FilterProducts;
