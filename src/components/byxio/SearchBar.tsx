"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
}

const SearchBar = ({
  initialValue = "",
  placeholder = "Buscar productos...",
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const router = useRouter();
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    // Evitar navegación en el primer render
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (searchTerm.trim()) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      router.replace(`/almarabyxio/products?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, router, isInitialRender]);

  return (
    <div className="max-w-2xl mx-auto relative">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-piel-blanco w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={initialValue}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-full text-piel-blanco border-1 focus:outline-none focus:ring-2 focus:ring-piel-claro/30 text-lg "
        />
      </div>
    </div>
  );
};

export default SearchBar;
