"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const PaginationButtons = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `/almarabyxio/products?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    router.push(createPageUrl(page));
  };

  return (
    <nav className="flex items-center space-x-2 mt-4">
      {/* Botón anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed  bg-verde-oscuro text-white cursor-pointer"
      >
        Anterior
      </button>

      {/* Números */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border rounded-xl cursor-pointer ${
            page === currentPage ? "bg-verde-oscuro text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* Botón siguiente */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed bg-verde-oscuro text-white cursor-pointer"
      >
        Siguiente
      </button>
    </nav>
  );
};

export default PaginationButtons;
